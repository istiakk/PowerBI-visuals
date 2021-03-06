/*
 *  Power BI Visualizations
 *
 *  Copyright (c) Microsoft Corporation
 *  All rights reserved.
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the ""Software""), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */

module powerbi.visuals.samples {
    import SelectionManager = utility.SelectionManager;
    import ValueFormatter = powerbi.visuals.valueFormatter;
    import getAnimationDuration = AnimatorCommon.GetAnimationDuration;
    import IStringResourceProvider = jsCommon.IStringResourceProvider;
    import ClassAndSelector = jsCommon.CssConstants.ClassAndSelector;
    import PixelConverter = jsCommon.PixelConverter;

    type D3Element =
        D3.UpdateSelection |
        D3.Selection |
        D3.Selectors |
        D3.Transition.Transition;

    export interface TornadoChartSections {
        left: number;
        right?: number;
        isPercent: boolean;
    }

    export interface TornadoChartTextOptions {
        fontFamily?: string;
        fontSize?: number;
        sizeUnit?: string;
    }

    export interface TornadoChartConstructorOptions {
        svg?: D3.Selection;
        animator?: IGenericAnimator;
        margin?: IMargin;
        sections?: TornadoChartSections;
        columnPadding?: number;
    }

    export interface TornadoChartSeries {
        fill: string;
        name: string;
        values: any[];
        selectionId: SelectionId;
        categoryAxisEnd: number;
    }

    export interface TornadoChartCategory {
        value: string;
        selectionId: SelectionId;
    }

    export interface TornadoChartSettings {
        labelOutsideFillColor: string;
        categoriesFillColor: string;
        labelSettings: VisualDataLabelsSettings;
        formatter?: IValueFormatter;
        tooltipFormatter?: IValueFormatter;
        showLegend?: boolean;
        showCategories?: boolean;
        legendFontSize?: number;
        legendColor?: string;
    }

    export interface TornadoChartDataView {
        displayName: string;
        categories: TornadoChartCategory[];
        series: TornadoChartSeries[];
        settings: TornadoChartSettings;
        legend: LegendData;
    }

    interface TornadoChartPoint {
        x: number;
        y: number;
    }

    interface LabelData extends TornadoChartPoint {
        dx: number;
        dy: number;
        value: number | string;
        source: number | string;
        color: string;
        width: number;
    }

    interface ColumnData extends TornadoChartPoint {
        dx: number;
        dy: number;
        px: number;
        py: number;
        angle: number;
        height: number;
        width: number;
        label: LabelData;
        color: string;
        selectionId: SelectionId;
        tooltipData: TooltipDataItem[];
    }

    interface LineData {
        x1: number;
        y1: number;
        x2: number;
        y2: number;
    }

    interface TextData {
        text: string;
        options: TornadoChartTextOptions;
        height: number;
        width: number;
        textProperties: TextProperties;
    }

    class TornadoChartScrolling {
        public isScrollable: boolean;
        public scrollViewport: IViewport;

        private static ScrollBarWidth = 10;
        private static ScrollBarMinLength = 15;
        private isYScrollBarVisible: boolean;
        private brushGraphicsContextY: D3.Selection;
        private scrollYBrush: D3.Svg.Brush = d3.svg.brush();

        private getRoot: () => D3.Selection;
        private getViewport: () => IViewport;
        private getMargin: () => IMargin;

        private get root(): D3.Selection {
            return this.getRoot();
        }

        private get viewport(): IViewport {
            return this.getViewport();
        }

        private get margin(): IMargin {
            return this.getMargin();
        }

        constructor(getRoot: () => D3.Selection, getViewport: () => IViewport, getMargin: () => IMargin, isScrollable: boolean) {
            this.getRoot = getRoot;
            this.getViewport = getViewport;
            this.getMargin = getMargin;
            this.isScrollable = isScrollable;
        }

        public renderY(data: TornadoChartDataView, prefferedHeight: number, onScroll: () => {}): void {
            this.isYScrollBarVisible = prefferedHeight > this.viewport.height
                && this.viewport.height > 0
                && this.viewport.width > 0;

            this.brushGraphicsContextY = this.createOrRemoveScrollbar(this.isYScrollBarVisible, this.brushGraphicsContextY, 'y brush');
            this.updateScrollViewport();

            if (!this.isYScrollBarVisible) {
                onScroll.call(this, jQuery.extend(true, {}, data), 0, 1);
                return;
            }

            let scrollSpaceLength: number = this.viewport.height;
            let extentData: any = this.getExtentData(prefferedHeight, scrollSpaceLength);

            let onRender = () => {
                let scrollPosition = extentData.toScrollPosition(this.scrollYBrush.extent(), scrollSpaceLength);
                onScroll.call(this, jQuery.extend(true, {}, data), scrollPosition[0], scrollPosition[1]);
                this.setScrollBarSize(this.brushGraphicsContextY, extentData.value[1], true);
            };

            let scrollYScale: D3.Scale.OrdinalScale = d3.scale.ordinal().rangeBands([0, scrollSpaceLength]);
            this.scrollYBrush.y(scrollYScale).extent(extentData.value);

            this.renderScrollbar(
                this.scrollYBrush,
                this.brushGraphicsContextY,
                this.viewport.width,
                this.margin.top,
                onRender);

            onRender();
        }

        private updateScrollViewport() {
            this.scrollViewport = { height: this.viewport.height, width: this.viewport.width };

            if (this.isYScrollBarVisible && this.isScrollable) {
                this.scrollViewport.width -= TornadoChartScrolling.ScrollBarWidth;
            }
        }

        private createOrRemoveScrollbar(isVisible, brushGraphicsContext, brushClass) {
            if (isVisible && this.isScrollable) {
                return brushGraphicsContext || this.root.append("g").classed(brushClass, true);
            }

            return brushGraphicsContext ? void brushGraphicsContext.remove() : undefined;
        }

        private renderScrollbar(brush: D3.Svg.Brush,
            brushGraphicsContext: D3.Selection,
            brushX: number,
            brushY: number,
            onRender: () => void): void {
            brush.on("brush", () => window.requestAnimationFrame(() => onRender()));

            brushGraphicsContext.attr({
                "transform": visuals.SVGUtil.translate(brushX, brushY),
                "drag-resize-disabled": "true" /*disables resizing of the visual when dragging the scrollbar in edit mode*/
            });

            brushGraphicsContext.call(brush); /*call the brush function, causing it to create the rectangles   */
            /* Disabling the zooming feature */
            brushGraphicsContext.selectAll(".resize rect").remove();
            brushGraphicsContext.select(".background").remove();
            brushGraphicsContext.selectAll(".extent").style({
                "fill-opacity": 0.125,
                "cursor": "default",
            });
        }

        private setScrollBarSize(brushGraphicsContext: D3.Selection, minExtent: number, isVertical: boolean): void {
            brushGraphicsContext.selectAll("rect").attr(isVertical ? "width" : "height", TornadoChartScrolling.ScrollBarWidth);
            brushGraphicsContext.selectAll("rect").attr(isVertical ? "height" : "width", minExtent);
        }

        private getExtentData(svgLength: number, scrollSpaceLength: number): any {
            let value: number = scrollSpaceLength * scrollSpaceLength / svgLength;

            let scaleMultipler: number = TornadoChartScrolling.ScrollBarMinLength <= value
                ? 1
                : value / TornadoChartScrolling.ScrollBarMinLength;

            value = Math.max(value, TornadoChartScrolling.ScrollBarMinLength);

            let toScrollPosition = (extent: number[], scrollSpaceLength: number) => {
                let scrollSize: number = extent[1] - extent[0];
                let scrollPosition: number = extent[0] / (scrollSpaceLength - scrollSize);

                scrollSize *= scaleMultipler;

                let start: number = (scrollPosition * (scrollSpaceLength - scrollSize));
                let end: number = (start + scrollSize);

                return [start / scrollSpaceLength, end / scrollSpaceLength];
            };

            return { value: [0, value], toScrollPosition: toScrollPosition };
        }
    }

    export class TornadoChartWarning implements IVisualWarning {
        public get code(): string {
            return "TornadoChartWarning";
        }

        public getMessages(resourceProvider: IStringResourceProvider): IVisualErrorMessage {
            let message: string = "This visual requires two distinct values to be returned for the Legend field.",
                titleKey: string = "",
                detailKey: string = "",
                visualMessage: IVisualErrorMessage;

            visualMessage = {
                message: message,
                title: resourceProvider.get(titleKey),
                detail: resourceProvider.get(detailKey)
            };

            return visualMessage;
        }
    }

    export function getTornadoChartWarning(): IVisualWarning {
        return new TornadoChartWarning();
    }

    export class TornadoChart implements IVisual {
        private static ClassName: string = "tornado-chart";

        private static Properties: any = {
            general: {
                formatString: <DataViewObjectPropertyIdentifier>{
                    objectName: "general",
                    propertyName: "formatString"
                }
            },
            labels: {
                show: <DataViewObjectPropertyIdentifier>{
                    objectName: "labels",
                    propertyName: "show"
                },
                fontSize: <DataViewObjectPropertyIdentifier>{
                    objectName: "labels",
                    propertyName: "fontSize"
                },
                labelPrecision: <DataViewObjectPropertyIdentifier>{
                    objectName: "labels",
                    propertyName: "labelPrecision"
                },
                labelDisplayUnits: <DataViewObjectPropertyIdentifier>{
                    objectName: "labels",
                    propertyName: "labelDisplayUnits"
                },
                insideFill: <DataViewObjectPropertyIdentifier>{
                    objectName: "labels",
                    propertyName: "insideFill"
                },
                outsideFill: <DataViewObjectPropertyIdentifier>{
                    objectName: "labels",
                    propertyName: "outsideFill"
                }
            },
            dataPoint: {
                fill: <DataViewObjectPropertyIdentifier>{
                    objectName: "dataPoint",
                    propertyName: "fill"
                }
            },
            legend: {
                show: <DataViewObjectPropertyIdentifier>{
                    objectName: "legend",
                    propertyName: "show"
                },
                labelColor: <DataViewObjectPropertyIdentifier>{
                    objectName: "legend",
                    propertyName: "labelColor"
                },
                fontSize: <DataViewObjectPropertyIdentifier>{
                    objectName: "legend",
                    propertyName: "fontSize"
                },
            },
            categories: {
                show: <DataViewObjectPropertyIdentifier>{
                    objectName: "categories",
                    propertyName: "show"
                },
                fill: <DataViewObjectPropertyIdentifier>{
                    objectName: "categories",
                    propertyName: "fill"
                }
            }
        };

        private static Columns: ClassAndSelector = {
            "class": "columns",
            selector: ".columns"
        };

        private static Column: ClassAndSelector = {
            "class": "column",
            selector: ".column"
        };

        private static Axes: ClassAndSelector = {
            "class": "axes",
            selector: ".axes"
        };

        private static Axis: ClassAndSelector = {
            "class": "axis",
            selector: ".axis"
        };

        private static Labels: ClassAndSelector = {
            "class": "labels",
            selector: ".labels"
        };

        private static Label: ClassAndSelector = {
            "class": "label",
            selector: ".label"
        };

        private static LabelTitle: ClassAndSelector = {
            "class": "label-title",
            selector: ".label-title"
        };

        private static LabelText: ClassAndSelector = {
            "class": "label-text",
            selector: ".label-text"
        };

        private static Categories: ClassAndSelector = {
            "class": "categories",
            selector: ".categories"
        };

        private static Category: ClassAndSelector = {
            "class": "category",
            selector: ".category"
        };

        private static CategoryTitle: ClassAndSelector = {
            "class": "category-title",
            selector: ".category-title"
        };

        private static CategoryText: ClassAndSelector = {
            "class": "category-text",
            selector: ".category-text"
        };

        private static MaxSeries: number = 2;

        private static MinPrecision: number = 0;
        private static MaxPrecision: number = 17; // max number of decimals in float

        private static MinOpacity: number = 0;
        private static MinColumnOpacity: number = 0.2;
        private static MaxOpacity: number = 1;

        private static MaxSizeSections: number = 100;

        private static LabelPadding: number = 2.5;

        private static CategoryMinHeight: number = 25;

        private static DefaultFontSize: number = 9;

        private static DefaultLegendFontSize: number = 8;

        public static capabilities: VisualCapabilities = {
            dataRoles: [{
                name: "Category",
                kind: VisualDataRoleKind.Grouping,
                displayName: data.createDisplayNameGetter("Role_DisplayName_Group")
            }, {
                    name: "Series",
                    kind: VisualDataRoleKind.Grouping,
                    displayName: data.createDisplayNameGetter('Role_DisplayName_Legend')
                }, {
                    name: "Values",
                    kind: VisualDataRoleKind.Measure,
                    displayName: data.createDisplayNameGetter("Role_DisplayName_Values")
                }],
            dataViewMappings: [{
                conditions: [
                    { "Category": { max: 1 }, "Values": { min: 0, max: 1 }, "Series": { min: 0, max: 1 } },
                    { "Category": { max: 1 }, "Values": { min: 2, max: 2 }, "Series": { max: 0 } }
                ],
                categorical: {
                    categories: {
                        for: {
                            in: "Category"
                        }
                    },
                    values: {
                        group: {
                            by: "Series",
                            select: [{ for: { in: "Values" } }],
                            dataReductionAlgorithm: { top: {} }
                        }
                    }
                }
            }],
            objects: {
                general: {
                    displayName: data.createDisplayNameGetter("Visual_General"),
                    properties: {
                        formatString: {
                            type: {
                                formatting: {
                                    formatString: true
                                }
                            },
                        }
                    }
                },
                dataPoint: {
                    displayName: data.createDisplayNameGetter("Visual_DataPoint"),
                    properties: {
                        fill: {
                            displayName: data.createDisplayNameGetter('Visual_Fill'),
                            type: { fill: { solid: { color: true } } }
                        }
                    }
                },
                categoryAxis: {
                    displayName: 'X-Axis',
                    properties: {
                        end: {
                            displayName: 'End',
                            type: { numeric: true },
                            suppressFormatPainterCopy: true,
                        },
                    }
                },
                labels: {
                    displayName: data.createDisplayNameGetter("Visual_DataPointsLabels"),
                    properties: {
                        show: {
                            displayName: data.createDisplayNameGetter("Visual_Show"),
                            type: { bool: true }
                        },
                        labelPrecision: {
                            displayName: data.createDisplayNameGetter("Visual_Precision"),
                            type: { numeric: true }
                        },
                        fontSize: {
                            displayName: data.createDisplayNameGetter('Visual_TextSize'),
                            type: { formatting: { fontSize: true } }
                        },
                        labelDisplayUnits: {
                            displayName: data.createDisplayNameGetter('Visual_DisplayUnits'),
                            type: { formatting: { labelDisplayUnits: true } },
                        },
                        insideFill: {
                            displayName: "Inside fill",
                            type: { fill: { solid: { color: true } } }
                        },
                        outsideFill: {
                            displayName: "Outside fill",
                            type: { fill: { solid: { color: true } } }
                        }
                    }
                },
                legend: {
                    displayName: data.createDisplayNameGetter('Visual_Legend'),
                    properties: {
                        show: {
                            displayName: data.createDisplayNameGetter('Visual_Show'),
                            type: { bool: true }
                        },
                        position: {
                            displayName: data.createDisplayNameGetter('Visual_LegendPosition'),
                            description: data.createDisplayNameGetter('Visual_LegendPositionDescription'),
                            type: { enumeration: legendPosition.type }
                        },
                        showTitle: {
                            displayName: data.createDisplayNameGetter('Visual_LegendShowTitle'),
                            description: data.createDisplayNameGetter('Visual_LegendShowTitleDescription'),
                            type: { bool: true }
                        },
                        titleText: {
                            displayName: data.createDisplayNameGetter('Visual_LegendName'),
                            description: data.createDisplayNameGetter('Visual_LegendNameDescription'),
                            type: { text: true }
                        },
                        labelColor: {
                            displayName: data.createDisplayNameGetter('Visual_LegendTitleColor'),
                            type: { fill: { solid: { color: true } } }
                        },
                        fontSize: {
                            displayName: data.createDisplayNameGetter('Visual_TextSize'),
                            type: { formatting: { fontSize: true } }
                        },
                    }
                },
                categories: {
                    displayName: data.createDisplayNameGetter("Role_DisplayName_Group"),
                    properties: {
                        show: {
                            displayName: data.createDisplayNameGetter("Visual_Show"),
                            type: { bool: true }
                        },
                        fill: {
                            displayName: data.createDisplayNameGetter('Visual_Fill'),
                            type: { fill: { solid: { color: true } } }
                        }
                    }
                }
            }
        };

        private DefaultTornadoChartSettings: TornadoChartSettings = {
            labelOutsideFillColor: dataLabelUtils.defaultLabelColor,
            labelSettings: {
                show: true,
                precision: 2,
                fontSize: TornadoChart.DefaultFontSize,
                displayUnits: 0,
                labelColor: dataLabelUtils.defaultInsideLabelColor,
            },
            showCategories: true,
            showLegend: true,
            legendFontSize: TornadoChart.DefaultLegendFontSize,
            legendColor: LegendData.DefaultLegendLabelFillColor,
            categoriesFillColor: "#777"
        };

        private DefaultFillColors: string[] = [
            "purple", "teal"
        ];

        private columnPadding: number = 5;
        private leftLabelMargin: number = 4;
        private durationAnimations: number = 200;
        private InnerTextHeightDelta: number = 2;
        private textOptions: TornadoChartTextOptions = {};

        private sections: TornadoChartSections = {
            left: 75,
            right: 0,
            isPercent: false
        };

        private currentSections: TornadoChartSections = _.clone(this.sections);

        private margin: IMargin = {
            top: 10,
            right: 5,
            bottom: 10,
            left: 10
        };

        private element: JQuery;
        private root: D3.Selection;
        private svg: D3.Selection;
        private main: D3.Selection;
        private columns: D3.Selection;
        private axes: D3.Selection;
        private labels: D3.Selection;
        private categories: D3.Selection;

        private legendObjectProperties: DataViewObject;
        private legend: ILegend;

        private colors: IDataColorPalette;

        private viewport: IViewport;
        private dataView: DataView;
        private tornadoChartDataView: TornadoChartDataView;
        private labelHeight: number;

        private heightColumn: number = 0;
        private widthLeftSection: number = 0;
        private widthRightSection: number = 0;

        private animator: IGenericAnimator;

        private hostService: IVisualHostServices;

        private selectionManager: SelectionManager;

        private scrolling: TornadoChartScrolling;

        constructor(tornadoChartConstructorOptions?: TornadoChartConstructorOptions) {
            if (tornadoChartConstructorOptions) {
                this.svg = tornadoChartConstructorOptions.svg || this.svg;
                this.margin = tornadoChartConstructorOptions.margin || this.margin;
                this.sections = tornadoChartConstructorOptions.sections || this.sections;
                this.columnPadding = tornadoChartConstructorOptions.columnPadding || this.columnPadding;
                this.currentSections = _.clone(this.sections);

                if (tornadoChartConstructorOptions.animator) {
                    this.animator = tornadoChartConstructorOptions.animator;
                }
            }
        }

        public init(visualInitOptions: VisualInitOptions): void {
            let style: IVisualStyle = visualInitOptions.style,
                fontSize: string;

            this.hostService = visualInitOptions.host;
            this.selectionManager = new SelectionManager({ hostServices: this.hostService });

            this.element = visualInitOptions.element;

            this.colors = style.colorPalette.dataColors;

            let root: D3.Selection;
            if (this.svg)
                this.root = root = this.svg;
            else
                this.root = root = d3.select(this.element.get(0))
                    .append("svg");

            root
                .classed(TornadoChart.ClassName, true)
                .style('position', 'absolute');

            fontSize = root.style("font-size");

            this.textOptions.sizeUnit = fontSize.slice(fontSize.length - 2);
            this.textOptions.fontSize = Number(fontSize.slice(0, fontSize.length - 2));
            this.textOptions.fontFamily = root.style("font-family");

            this.scrolling = new TornadoChartScrolling(() => root, () => this.viewport, () => this.margin, true);
            this.main = root.append("g");

            this.columns = this.main
                .append("g")
                .classed(TornadoChart.Columns["class"], true);

            this.axes = this.main
                .append("g")
                .classed(TornadoChart.Axes["class"], true);

            this.labels = this.main
                .append("g")
                .classed(TornadoChart.Labels["class"], true);

            this.categories = this.main
                .append("g")
                .classed(TornadoChart.Categories["class"], true);

            this.legend = createLegend(this.element, false, null);
        }

        public update(visualUpdateOptions: VisualUpdateOptions): void {
            if (!visualUpdateOptions ||
                !visualUpdateOptions.dataViews ||
                !visualUpdateOptions.dataViews[0]) {
                return;
            }

            this.dataView = visualUpdateOptions.dataViews[0];

            this.durationAnimations = getAnimationDuration(
                this.animator,
                visualUpdateOptions.suppressAnimations);

            this.tornadoChartDataView = this.converter(this.dataView);

            this.viewport = {
                height: visualUpdateOptions.viewport.height,
                width: visualUpdateOptions.viewport.width
            };

            this.render();
        }

        private subtractMargin(viewport: IViewport): IViewport {
            return <IViewport>{
                height: viewport.height - this.margin.top - this.margin.bottom,
                width: viewport.width - this.margin.left - this.margin.right
            };
        }

        private updateElements(): void {
            let elementsTranslate: string = SVGUtil.translate(this.widthLeftSection, 0);

            this.root.attr({
                "height": this.viewport.height,
                "width": this.viewport.width
            });

            this.main.attr("transform", SVGUtil.translate(
                this.margin.left,
                this.margin.top
            ));

            this.columns
                .attr("transform", elementsTranslate);

            this.labels
                .attr("transform", elementsTranslate);

            this.axes
                .attr("transform", elementsTranslate);
        }

        private getValueByPercent(percent: number, maxValue: number, isPrecent: boolean = true): number {
            return isPrecent
                ? (percent * maxValue) / 100
                : percent;
        }

        public converter(dataView: DataView): TornadoChartDataView {
            if (!dataView ||
                !dataView.categorical ||
                !dataView.categorical.categories ||
                !dataView.categorical.categories[0] ||
                !dataView.categorical.categories[0].source ||
                !dataView.categorical.values ||
                !dataView.categorical.values[0]) {
                return null;
            }

            let categories: TornadoChartCategory[],
                values: DataViewValueColumns = dataView.categorical.values,
                series: TornadoChartSeries[],
                displayName: string,
                objects: DataViewObjects,
                settings: TornadoChartSettings;

            categories = this.parseCategories(dataView);
            displayName = dataView.categorical.categories[0].source.displayName;

            objects = this.getObjectsFromDataView(dataView);

            settings = this.parseSettings(dataView, objects, values[0].values[0]);

            this.labelHeight = TextMeasurementService.estimateSvgTextHeight({
                fontFamily: dataLabelUtils.StandardFontFamily,
                fontSize: PixelConverter.fromPoint(settings.labelSettings.fontSize),
            });

            series = this.parseSeries(values);

            if (series.length === 0) {
                categories = [];
            }

            return {
                displayName: displayName,
                categories: categories,
                series: series,
                settings: settings,
                legend: this.getLegendData(series)
            };
        }

        private parseSettings(dataView: DataView, objects: DataViewObjects, value: number): TornadoChartSettings {
            let valueFormatter: IValueFormatter,
                tooltipFormatter: IValueFormatter,
                precision: number,
                displayUnits: number;

            precision = this.getPrecision(objects);
            displayUnits = DataViewObjects.getValue(
                objects,
                TornadoChart.Properties.labels.labelDisplayUnits,
                this.DefaultTornadoChartSettings.labelSettings.displayUnits);

            valueFormatter = ValueFormatter.create({
                format: ValueFormatter.getFormatString(dataView.categorical.categories[0].source, TornadoChart.Properties.general.formatString),
                precision: precision,
                value: (displayUnits === 0) && (value != null) ? value : displayUnits,
            });

            tooltipFormatter = ValueFormatter.create({
                format: ValueFormatter.getFormatString(dataView.categorical.categories[0].source, TornadoChart.Properties.general.formatString),
                precision: precision,
                value: 0
            });

            this.parseLegendProperties(dataView);

            let labelSettings = this.DefaultTornadoChartSettings.labelSettings;

            return {
                labelOutsideFillColor: this.getColor(TornadoChart.Properties.labels.outsideFill, this.DefaultTornadoChartSettings.labelOutsideFillColor, objects),
                labelSettings: {
                    show: DataViewObjects.getValue(objects, TornadoChart.Properties.labels.show, labelSettings.show),
                    precision: precision,
                    fontSize: DataViewObjects.getValue(objects, TornadoChart.Properties.labels.fontSize, labelSettings.fontSize),
                    displayUnits: displayUnits,
                    labelColor: this.getColor(TornadoChart.Properties.labels.insideFill, labelSettings.labelColor, objects),
                },
                formatter: valueFormatter,
                showCategories: DataViewObjects.getValue(objects, TornadoChart.Properties.categories.show, this.DefaultTornadoChartSettings.showCategories),
                showLegend: DataViewObjects.getValue(objects, TornadoChart.Properties.legend.show, this.DefaultTornadoChartSettings.showLegend),
                legendFontSize: DataViewObjects.getValue(objects, TornadoChart.Properties.legend.fontSize, this.DefaultTornadoChartSettings.legendFontSize),
                legendColor: this.getColor(TornadoChart.Properties.legend.labelColor, this.DefaultTornadoChartSettings.legendColor, objects),
                categoriesFillColor: this.getColor(TornadoChart.Properties.categories.fill, this.DefaultTornadoChartSettings.categoriesFillColor, objects),
                tooltipFormatter: tooltipFormatter,
            };
        }

        private parseLegendProperties(dataView: DataView): void {
            if (!dataView || !dataView.metadata) {
                this.legendObjectProperties = {};

                return;
            }

            this.legendObjectProperties =
                DataViewObjects.getObject(dataView.metadata.objects, "legend", {});
        }

        private getColor(properties: any, defaultColor: string, objects: DataViewObjects): string {
            let colorHelper: ColorHelper;

            colorHelper = new ColorHelper(this.colors, properties, defaultColor);

            return colorHelper.getColorForMeasure(objects, "");
        }

        private getPrecision(objects: DataViewObjects): number {
            let precision: number = DataViewObjects.getValue(
                objects,
                TornadoChart.Properties.labels.labelPrecision,
                this.DefaultTornadoChartSettings.labelSettings.precision);

            if (precision <= TornadoChart.MinPrecision) {
                return TornadoChart.MinPrecision;
            }

            if (precision >= TornadoChart.MaxPrecision) {
                return TornadoChart.MaxPrecision;
            }

            return precision;
        }

        private getObjectsFromDataView(dataView: DataView): DataViewObjects {
            if (!dataView ||
                !dataView.metadata ||
                !dataView.metadata.columns ||
                !dataView.metadata.objects) {
                return null;
            }

            return dataView.metadata.objects;
        }

        private parseCategories(dataView: DataView): TornadoChartCategory[] {
            return dataView.categorical.categories[0].values.map((x, i) => <TornadoChartCategory>{
                value: x,
                selectionId: SelectionId.createWithId(dataView.categorical.categories[0].identity[i])
            });
        }

        private parseSeries(dataViewValueColumns: DataViewValueColumns): TornadoChartSeries[] {
            if (dataViewValueColumns.length > TornadoChart.MaxSeries) {
                this.hostService.setWarnings([getTornadoChartWarning()]);

                return [];
            }

            let isGrouped: boolean = !!dataViewValueColumns.source,
                grouped: DataViewValueColumnGroup[] = [];

            if (dataViewValueColumns.grouped) {
                grouped = dataViewValueColumns.grouped();
            }

            return dataViewValueColumns.map((dataViewValueColumn: DataViewValueColumn, index: number) => {
                let displayName: string = "",
                    color: string,
                    selectionId: SelectionId,
                    objects: DataViewObjects,
                    categoryAxisObject: DataViewObject | DataViewObjectWithId[];

                if (isGrouped && grouped[index]) {
                    selectionId = SelectionId.createWithIdAndMeasure(
                        dataViewValueColumn.identity,
                        dataViewValueColumn.source.queryName);

                    objects = grouped[index].objects;
                } else {
                    selectionId = SelectionId.createWithMeasure(dataViewValueColumn.source.queryName);
                    objects = dataViewValueColumn.source.objects;
                }
                categoryAxisObject = dataViewValueColumn.source && dataViewValueColumn.source.objects ? dataViewValueColumn.source.objects['categoryAxis'] : null;

                if (dataViewValueColumn.source.groupName) {
                    displayName = dataViewValueColumn.source.groupName;
                } else if (dataViewValueColumn.source.displayName) {
                    displayName = dataViewValueColumn.source.displayName;
                }

                color = this.getColor(
                    TornadoChart.Properties.dataPoint.fill,
                    this.DefaultFillColors[index],
                    objects);
                let categoryAxisEnd: number = categoryAxisObject ? categoryAxisObject['end'] : null;

                return <TornadoChartSeries>{
                    fill: color,
                    name: displayName,
                    values: dataViewValueColumn.values,
                    selectionId: selectionId,
                    categoryAxisEnd: categoryAxisEnd,
                };
            });
        }

        private getLegendData(series: TornadoChartSeries[]): LegendData {
            let legendDataPoints: LegendDataPoint[];

            legendDataPoints = series.map((item: TornadoChartSeries) => {
                return <LegendDataPoint>{
                    label: item.name,
                    color: item.fill,
                    icon: LegendIcon.Box,
                    selected: false,
                    identity: item.selectionId
                };
            });

            return {
                dataPoints: legendDataPoints
            };
        }

        private updateSections(): void {
            let dataView: TornadoChartDataView = this.tornadoChartDataView;
            if (!dataView ||
                !dataView.settings) {
                return;
            }

            let settings: TornadoChartSettings = dataView.settings;

            this.currentSections.left = settings.showCategories
                ? this.sections.left
                : 0;

            this.currentSections.right = this.currentSections.isPercent
                ? TornadoChart.MaxSizeSections - this.currentSections.left
                : this.scrolling.scrollViewport.width - this.currentSections.left;
        }

        private clearData(): void {
            this.columns.selectAll("*").remove();
            this.axes.selectAll("*").remove();
            this.labels.selectAll("*").remove();
            this.categories.selectAll("*").remove();
            this.legend.drawLegend({ dataPoints: [] }, this.viewport);
        }

        private render(): void {
            let tornadoChartDataView: TornadoChartDataView = this.tornadoChartDataView;
            if (!tornadoChartDataView ||
                !tornadoChartDataView.settings) {
                this.clearData();
                return;
            }

            this.renderLegend();

            this.updateViewport();

            let viewport: IViewport = this.subtractMargin(this.viewport);
            if (viewport.width <= 0 || viewport.height <= 0) {
                return;
            }

            this.widthLeftSection = this.getValueByPercent(
                this.currentSections.left,
                this.viewport.width,
                this.currentSections.isPercent);

            this.updateElements();
            this.viewport = viewport;

            this.scrolling.renderY(
                tornadoChartDataView,
                tornadoChartDataView.categories.length * TornadoChart.CategoryMinHeight,
                this.renderWithScrolling.bind(this));
        }

        private renderWithScrolling(tornadoChartDataView: TornadoChartDataView, scrollStart: number, scrollEnd: number) {
            let categoriesLength = tornadoChartDataView.categories.length;
            let startIndex: number = scrollStart * categoriesLength;
            let endIndex: number = scrollEnd * categoriesLength;

            let startIndexRound: number = Math.floor(startIndex);
            let endIndexRound: number = Math.floor(endIndex);

            let maxValues: number = Math.floor(this.scrolling.scrollViewport.height / TornadoChart.CategoryMinHeight);

            if (scrollEnd - scrollStart < 1 && maxValues < endIndexRound - startIndexRound) {
                if (startIndex - startIndexRound > endIndex - endIndexRound) {
                    startIndexRound++;
                }
                else {
                    endIndex--;
                }
            }

            tornadoChartDataView.categories = tornadoChartDataView.categories.slice(startIndexRound, endIndexRound);
            for (let item of tornadoChartDataView.series) {
                item.values = item.values.slice(startIndexRound, endIndexRound);
            }
            this.tornadoChartDataView = tornadoChartDataView;

            this.updateSections();
            this.widthRightSection = this.getValueByPercent(this.currentSections.right, this.viewport.width, this.currentSections.isPercent);
            this.computeHeightColumn();
            this.renderMiddleSection();
            this.renderAxes();
            this.renderCategories();
        }

        private updateViewport(): void {
            let legendMargins: IViewport = this.legend.getMargins(),
                legendPosition: LegendPosition;

            legendPosition = LegendPosition[<string>this.legendObjectProperties[legendProps.position]];

            switch (legendPosition) {
                case LegendPosition.Top:
                case LegendPosition.TopCenter:
                case LegendPosition.Bottom:
                case LegendPosition.BottomCenter: {
                    this.viewport.height -= legendMargins.height;

                    break;
                }
                case LegendPosition.Left:
                case LegendPosition.LeftCenter:
                case LegendPosition.Right:
                case LegendPosition.RightCenter: {
                    this.viewport.width -= legendMargins.width;

                    break;
                }
            }
        }

        private computeHeightColumn(): void {
            let length: number = this.tornadoChartDataView.categories.length;
            this.heightColumn = (this.scrolling.scrollViewport.height - ((length - 1) * this.columnPadding)) / length;
        }

        private renderMiddleSection(): void {
            let columnsData: ColumnData[] = this.generateColumnDataBySeries();
            let tornadoChartDataView: TornadoChartDataView = this.tornadoChartDataView;
            this.renderColumns(columnsData, tornadoChartDataView.series.length === 2);
            this.renderLabels(columnsData, tornadoChartDataView.settings);
        }

        private renderColumns(columnsData: ColumnData[], selectSecondSeries: boolean = false): void {
            let columnsSelection: D3.UpdateSelection,
                columnElements: D3.Selection = this.main
                    .select(TornadoChart.Columns.selector)
                    .selectAll(TornadoChart.Column.selector);

            columnsSelection = columnElements.data(columnsData);

            columnsSelection
                .enter()
                .append("svg:rect");

            columnsSelection
                .attr("x", (item: ColumnData) => item.x)
                .attr("y", (item: ColumnData) => item.y)
                .on("click", (item: ColumnData, index: number) => {
                    this.selectionManager
                        .select(item.selectionId, false)
                        .then(() => this.setSelection(columnsSelection, selectSecondSeries));

                    d3.event.stopPropagation();
                });
            this.setSelection(columnsSelection, selectSecondSeries);

            (columnElements[0] && columnElements[0].length === columnsData.length
                ? <D3.UpdateSelection>this.animation(columnsSelection)
                : columnsSelection)
                .attr("width", (item: ColumnData) => Math.max(item.width, 0))
                .attr("height", (item: ColumnData) => Math.max(item.height, 0))
                .style("fill", (item: ColumnData) => item.color)
                .attr("transform", (item: ColumnData) => SVGUtil.translateAndRotate(item.dx, item.dy, item.px, item.py, item.angle));

            columnsSelection.classed(TornadoChart.Column["class"], true);

            columnsSelection
                .exit()
                .remove();

            this.renderTooltip(columnsSelection);

            this.root.on("click", () => {
                let mousePosition: number[] = d3.mouse(this.root.node());
                let rect: ClientRect = this.root.node().getBoundingClientRect();
                let scrollWidth: TornadoChartPoint = {
                    x: this.viewport.height - this.scrolling.scrollViewport.height,
                    y: this.viewport.width - this.scrolling.scrollViewport.width
                };

                if ((!scrollWidth.y || (rect.width -
                    (this.viewport.width - this.scrolling.scrollViewport.width) - this.margin.right > mousePosition[0]))
                    && (!scrollWidth.x || (rect.height -
                        (this.viewport.height - this.scrolling.scrollViewport.height) - this.margin.bottom > mousePosition[1]))) {
                    this.selectionManager.clear();
                    this.setSelection(columnsSelection, selectSecondSeries);
                }
            });
        }

        private setSelection(columns: D3.UpdateSelection, selectSecondSeries: boolean = false): void {
            let selectionIds: SelectionId[] = this.selectionManager.getSelectionIds();

            if (!selectionIds.length) {
                this.setOpacity(columns, TornadoChart.MaxOpacity);
                return;
            }

            let selectedColumns: D3.UpdateSelection = columns.filter((x: ColumnData) => {
                return selectionIds.some((y: SelectionId) => y.getKey() === x.selectionId.getKey());
            });

            this.setOpacity(columns, TornadoChart.MinColumnOpacity);
            this.setOpacity(selectedColumns, TornadoChart.MaxOpacity);
        }

        private renderTooltip(selection: D3.UpdateSelection): void {
            TooltipManager.addTooltip(selection, (tooltipEvent: TooltipEvent) => {
                return (<ColumnData>tooltipEvent.data).tooltipData;
            });
        }

        private generateColumnDataBySeries(): ColumnData[] {
            let categories: TornadoChartCategory[] = this.tornadoChartDataView.categories,
                series: TornadoChartSeries[] = this.tornadoChartDataView.series,
                width: number,
                minValue: number,
                maxValue: number;

            width = this.widthRightSection;

            if (series && series.length === 0) {
                return [];
            }

            minValue = Math.min(d3.min(series[0].values), 0);
            maxValue = d3.max(series[0].values);

            if (series.length === TornadoChart.MaxSeries) {
                minValue = d3.min([minValue, d3.min(series[1].values)]);
                maxValue = d3.max([maxValue, d3.max(series[1].values)]);

                width = width / TornadoChart.MaxSeries;
            }

            return series.reduce((previousValue: ColumnData[], currentValue: TornadoChartSeries, index: number) => {
                let shiftToMiddle: boolean = index === 0 && series.length === TornadoChart.MaxSeries,
                    shiftToRight: boolean = index === 1,
                    seriesName: string = currentValue.name;

                return previousValue.concat(
                    this.generateColumnDataByValues(
                        currentValue,
                        minValue,
                        maxValue,
                        width,
                        shiftToRight,
                        shiftToMiddle,
                        categories,
                        seriesName));
            }, []);
        }

        private generateColumnDataByValues(
            tornadoChartSeries: TornadoChartSeries,
            minValue: number,
            maxValue: number,
            maxWidth: number,
            shiftToRight: boolean,
            shiftToMiddle: boolean,
            categories: TornadoChartCategory[],
            seriesName: string): ColumnData[] {
            return tornadoChartSeries.values.map((value: number, index: number) => {
                return this.generateColumnData(
                    value ? value : 0,
                    minValue,
                    maxValue,
                    maxWidth,
                    shiftToMiddle,
                    shiftToRight,
                    tornadoChartSeries.fill,
                    index,
                    categories[index],
                    seriesName,
                    tornadoChartSeries.categoryAxisEnd);
            });
        }

        private generateColumnData(
            value: number,
            minValue: number,
            maxValue: number,
            width: number,
            shiftToMiddle: boolean,
            shiftToRight: boolean,
            color: string,
            index: number,
            categoryValue: TornadoChartCategory,
            seriesName: string,
            categoryAxisEnd: number): ColumnData {
            let x: number = 0,
                y: number = 0,
                widthOfColumn: number,
                shift: number = 0,
                dy: number,
                dx: number,
                label: LabelData,
                angle: number = 0;
                
            // Limit maximum value with what the user choose
            maxValue = categoryAxisEnd ? Math.min(categoryAxisEnd, maxValue) : maxValue;
            widthOfColumn = this.getColumnWidth(value, minValue, maxValue, width);
            shift = width - widthOfColumn;

            dx = shift * Number(shiftToMiddle) + width * Number(shiftToRight);
            dy = (this.heightColumn + this.columnPadding) * index;

            label = this.getLabelData(
                value,
                x,
                y,
                dx,
                dy,
                widthOfColumn,
                shiftToMiddle);

            if (shiftToMiddle) {
                angle = 180;
            }

            return {
                x: x,
                y: y,
                dx: dx,
                dy: dy,
                px: widthOfColumn / 2,
                py: this.heightColumn / 2,
                angle: angle,
                width: widthOfColumn,
                height: this.heightColumn,
                label: label,
                color: color,
                selectionId: categoryValue.selectionId,
                tooltipData: this.getTooltipData(this.tornadoChartDataView.displayName, categoryValue.value, seriesName, this.tornadoChartDataView.settings.tooltipFormatter.format(value))
            };
        }

        private getColumnWidth(value: number, minValue: number, maxValue: number, width: number): number {
            if (minValue === maxValue) {
                return width;
            }
            let columnWidth = width * (value - minValue) / (maxValue - minValue);

            // In case the user specifies a custom category axis end we limit the
            // column width to the maximum available width
            return Math.min(width, columnWidth);
        }

        private getLabelData(
            value: number,
            xColumn: number,
            yColumn: number,
            dxColumn: number,
            dyColumn: number,
            columnWidth: number,
            isColumnPositionLeft: boolean): LabelData {
            let dx: number,
                valueAfterValueFormatter: string,
                textDataAfterValueFormatter: TextData,
                tornadoChartSettings: TornadoChartSettings = this.tornadoChartDataView.settings,
                labelSettings: VisualDataLabelsSettings = tornadoChartSettings.labelSettings,
                fontSize: number = labelSettings.fontSize,
                color: string = labelSettings.labelColor;

            let maxOutsideLabelWidth = isColumnPositionLeft
                ? dxColumn - this.leftLabelMargin
                : this.widthRightSection - (dxColumn + columnWidth + this.leftLabelMargin + this.margin.right);
            let maxLabelWidth = Math.max(maxOutsideLabelWidth, columnWidth - this.leftLabelMargin);
            let textProperties: TextProperties = {
                fontFamily: dataLabelUtils.StandardFontFamily,
                fontSize: PixelConverter.fromPoint(fontSize),
                text: tornadoChartSettings.formatter.format(value),
            };
            valueAfterValueFormatter = TextMeasurementService.getTailoredTextOrDefault(textProperties, maxLabelWidth);
            textDataAfterValueFormatter = this.getTextData(valueAfterValueFormatter, true, false, fontSize);

            if (columnWidth > textDataAfterValueFormatter.width + TornadoChart.LabelPadding) {
                dx = dxColumn + columnWidth / 2 - textDataAfterValueFormatter.width / 2;
            } else {
                if (isColumnPositionLeft) {
                    dx = dxColumn - this.leftLabelMargin - textDataAfterValueFormatter.width;
                } else {
                    dx = dxColumn + columnWidth + this.leftLabelMargin;
                }
                color = tornadoChartSettings.labelOutsideFillColor;
            }

            return {
                x: xColumn,
                y: yColumn,
                dx: dx,
                dy: dyColumn + this.heightColumn / 2 + this.labelHeight / 2 - this.InnerTextHeightDelta,
                source: value,
                value: valueAfterValueFormatter,
                color: color,
                width: textDataAfterValueFormatter.width
            };
        }

        private getTooltipData(displayName: string, categoryValue: string, seriesName, value: string): TooltipDataItem[] {
            return [{
                displayName: displayName,
                value: categoryValue
            }, {
                    displayName: seriesName,
                    value: value
                }];
        }

        private renderAxes(): void {
            let linesData: LineData[],
                axesSelection: D3.UpdateSelection,
                axesElements: D3.Selection = this.main
                    .select(TornadoChart.Axes.selector)
                    .selectAll(TornadoChart.Axis.selector);

            if (this.tornadoChartDataView.series.length !== TornadoChart.MaxSeries) {
                axesElements.remove();

                return;
            }

            linesData = this.generateAxesData();

            axesSelection = axesElements.data(linesData);

            axesSelection
                .enter()
                .append("svg:line")
                .classed(TornadoChart.Axis["class"], true);

            (<D3.UpdateSelection>this.animation(axesSelection))
                .attr("x1", (item: LineData) => item.x1)
                .attr("y1", (item: LineData) => item.y1)
                .attr("x2", (item: LineData) => item.x2)
                .attr("y2", (item: LineData) => item.y2);

            axesSelection
                .exit()
                .remove();
        }

        private generateAxesData(): LineData[] {
            let x: number,
                y1: number,
                y2: number;

            x = this.widthRightSection / 2;
            y1 = 0;
            y2 = this.scrolling.scrollViewport.height;

            return [{
                x1: x,
                y1: y1,
                x2: x,
                y2: y2
            }];
        }

        private renderLabels(columnsData: ColumnData[], settings: TornadoChartSettings): void {
            let labelEnterSelection: D3.Selection,
                labelSelection: D3.UpdateSelection,
                labelSelectionAnimation: D3.UpdateSelection,
                labelElements: D3.Selection = this.main
                    .select(TornadoChart.Labels.selector)
                    .selectAll(TornadoChart.Label.selector);

            labelSelection = labelElements.data(columnsData);

            labelEnterSelection = labelSelection
                .enter()
                .append("g");

            labelEnterSelection
                .append("svg:title")
                .classed(TornadoChart.LabelTitle["class"], true);

            labelEnterSelection
                .append("svg:text")
                .attr("dy", dataLabelUtils.DefaultDy)
                .classed(TornadoChart.LabelText["class"], true);

            labelSelection
                .attr("x", (item: ColumnData) => item.label.x)
                .attr("y", (item: ColumnData) => item.label.y)
                .attr("display", (item: ColumnData) => {
                    let leftBorder: number = 0,
                        rightBorder: number = this.currentSections.right,
                        x: number = item.label.x + item.label.dx;

                    if (leftBorder < x &&
                        rightBorder > x + item.label.width) {
                        return null;
                    } else {
                        return "none";
                    }
                })
                .attr("pointer-events", "none")
                .classed(TornadoChart.Label["class"], true);

            labelSelection
                .select(TornadoChart.LabelTitle.selector)
                .text((item: ColumnData) => item.label.source);

            labelSelectionAnimation = labelElements[0] && labelElements[0].length === columnsData.length
                ? (<D3.UpdateSelection>this.animation(labelSelection))
                : labelSelection;

            labelSelectionAnimation
                .attr("transform", (item: ColumnData) => SVGUtil.translate(item.label.dx, item.label.dy));

            (<D3.UpdateSelection>this.animation(labelSelection
                .select(TornadoChart.LabelText.selector)))
                .attr("fill", (item: ColumnData) => item.label.color)
                .attr("font-size", (item: ColumnData) => PixelConverter.fromPoint(settings.labelSettings.fontSize))
                .text((item: ColumnData) => item.label.value);

            if (!settings.labelSettings.show || this.labelHeight > this.heightColumn) {
                this.setOpacity(labelSelectionAnimation);
            } else {
                this.setOpacity(labelSelectionAnimation, TornadoChart.MaxOpacity);
            }

            labelSelection
                .exit()
                .remove();
        }

        private renderCategories(): void {
            let settings: TornadoChartSettings = this.tornadoChartDataView.settings,
                color: string = settings.categoriesFillColor,
                categoriesEnterSelection: D3.Selection,
                categoriesSelection: D3.UpdateSelection,
                categoryElements: D3.Selection = this.main
                    .select(TornadoChart.Categories.selector)
                    .selectAll(TornadoChart.Category.selector),
                self: TornadoChart = this;

            if (!settings.showCategories) {
                categoryElements.remove();

                return;
            }

            categoriesSelection = categoryElements.data(this.tornadoChartDataView.categories);

            categoriesEnterSelection = categoriesSelection
                .enter()
                .append("g");

            categoriesEnterSelection
                .append("svg:title")
                .classed(TornadoChart.CategoryTitle["class"], true);

            categoriesEnterSelection
                .append("svg:text")
                .classed(TornadoChart.CategoryText["class"], true);

            categoriesSelection
                .attr("x", 0)
                .attr("y", 0)
                .attr("transform", (item: string, index: number) => {
                    let shift: number = (this.heightColumn + this.columnPadding) * index + this.heightColumn / 2,
                        textData: TextData = this.getTextData(item, false, true);

                    shift = shift + textData.height / 2 - this.InnerTextHeightDelta;

                    return SVGUtil.translate(0, shift);
                })
                .classed(TornadoChart.Category["class"], true);

            categoriesSelection
                .select(TornadoChart.CategoryTitle.selector)
                .text((item: TornadoChartCategory) => item.value);

            categoriesSelection
                .select(TornadoChart.CategoryText.selector)
                .attr("fill", color)
                .text((item: TornadoChartCategory) => {
                    let textData: TextData = self.getTextData(item.value);

                    return TextMeasurementService.getTailoredTextOrDefault(textData.textProperties, self.widthLeftSection);
                });

            categoriesSelection
                .exit()
                .remove();
        }

        private renderLegend(): void {
            let legend = this.tornadoChartDataView.legend;
            if (!legend) {
                return;
            }
            let settings: TornadoChartSettings = this.tornadoChartDataView.settings;

            let legendData: LegendData = {
                title: legend.title,
                dataPoints: legend.dataPoints,
                fontSize: settings.legendFontSize,
                labelColor: settings.legendColor,
            };

            if (this.legendObjectProperties) {
                let position: string;

                LegendData.update(legendData, this.legendObjectProperties);

                position = <string>this.legendObjectProperties[legendProps.position];

                if (position) {
                    this.legend.changeOrientation(LegendPosition[position]);
                }
            }

            this.legend.drawLegend(legendData, this.viewport);
            Legend.positionChartArea(this.root, this.legend);
        }

        private getTextData(text: string, measureWidth: boolean = false, measureHeight: boolean = false, overrideFontSize?: number): TextData {
            let width: number = 0,
                height: number = 0,
                fontSize: string,
                textProperties: TextProperties;

            text = text || "";

            fontSize = overrideFontSize
                ? PixelConverter.fromPoint(overrideFontSize)
                : `${this.textOptions.fontSize}${this.textOptions.sizeUnit}`;

            textProperties = {
                text: text,
                fontFamily: this.textOptions.fontFamily,
                fontSize: fontSize
            };

            if (measureWidth) {
                width = TextMeasurementService.measureSvgTextWidth(textProperties);
            }

            if (measureHeight) {
                height = TextMeasurementService.estimateSvgTextHeight(textProperties);
            }

            return {
                text: text,
                options: this.textOptions,
                width: width,
                height: height,
                textProperties: textProperties
            };
        }

        public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstanceEnumeration {
            let enumeration = new ObjectEnumerationBuilder(),
                settings: TornadoChartSettings;

            if (!this.tornadoChartDataView ||
                !this.tornadoChartDataView.settings) {
                return [];
            }

            settings = this.tornadoChartDataView.settings;

            switch (options.objectName) {
                case "dataPoint": {
                    this.enumerateDataPoint(enumeration);
                    break;
                }
                case "categoryAxis": {
                    this.enumerateCategoryAxis(enumeration);
                    break;
                }
                case "labels": {
                    let labelSettings = settings.labelSettings;
                    let labels: VisualObjectInstance = {
                        objectName: "labels",
                        displayName: "labels",
                        selector: null,
                        properties: {
                            show: labelSettings.show,
                            fontSize: labelSettings.fontSize,
                            labelPrecision: labelSettings.precision,
                            labelDisplayUnits: labelSettings.displayUnits,
                            insideFill: labelSettings.labelColor,
                            outsideFill: settings.labelOutsideFillColor
                        }
                    };

                    enumeration.pushInstance(labels);
                    break;
                }
                case "legend": {
                    let showTitle: boolean = true,
                        titleText: string = "",
                        legend: VisualObjectInstance;

                    showTitle = DataViewObject.getValue(
                        this.legendObjectProperties,
                        legendProps.showTitle,
                        showTitle);

                    titleText = DataViewObject.getValue(
                        this.legendObjectProperties,
                        legendProps.titleText,
                        titleText);

                    legend = {
                        objectName: "legend",
                        displayName: "legend",
                        selector: null,
                        properties: {
                            show: settings.showLegend,
                            position: LegendPosition[this.legend.getOrientation()],
                            showTitle: showTitle,
                            titleText: titleText,
                            fontSize: settings.legendFontSize,
                            labelColor: settings.legendColor,
                        }
                    };

                    enumeration.pushInstance(legend);
                    break;
                }
                case "categories": {
                    let categories: VisualObjectInstance = {
                        objectName: "categories",
                        displayName: "categories",
                        selector: null,
                        properties: {
                            show: settings.showCategories,
                            fill: settings.categoriesFillColor
                        }
                    };

                    enumeration.pushInstance(categories);
                    break;
                }
            }

            return enumeration.complete();
        }

        private enumerateDataPoint(enumeration: ObjectEnumerationBuilder): void {
            if (!this.tornadoChartDataView ||
                !this.tornadoChartDataView.series) {
                return;
            }

            let series: TornadoChartSeries[] = this.tornadoChartDataView.series;

            for (let item of series) {
                enumeration.pushInstance({
                    objectName: "dataPoint",
                    displayName: item.name,
                    selector: ColorHelper.normalizeSelector(item.selectionId.getSelector(), false),
                    properties: {
                        fill: { solid: { color: item.fill } }
                    }
                });
            }
        }

        private enumerateCategoryAxis(enumeration: ObjectEnumerationBuilder): void {
            if (!this.tornadoChartDataView || !this.tornadoChartDataView.series)
                return;

            let series: TornadoChartSeries[] = this.tornadoChartDataView.series;

            for (let item of series) {
                enumeration.pushInstance({
                    objectName: "categoryAxis",
                    displayName: item.name,
                    selector: item.selectionId ? item.selectionId.getSelector() : null,
                    properties: {
                        end: item.categoryAxisEnd,
                    }
                });
            }
        }

        private setOpacity(element: D3Element, opacityValue: number = TornadoChart.MinOpacity, disableAnimation: boolean = false): D3Element {
            let elementAnimation: D3.Selection = disableAnimation
                ? <D3.Selection>element
                : <D3.Selection>this.animation(element);

            return elementAnimation.style(
                "fill-opacity",
                opacityValue);
        }

        private animation(element: D3Element): D3Element {
            if (!this.durationAnimations) {
                return element;
            }

            return (<D3.Selection>element)
                .transition()
                .duration(this.durationAnimations);
        }

        public destroy(): void {
            this.root = null;
        }
    }
}
