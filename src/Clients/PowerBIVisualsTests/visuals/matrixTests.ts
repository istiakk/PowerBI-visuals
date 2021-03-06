﻿/*
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

module powerbitests {
    import CompiledDataViewMapping = powerbi.data.CompiledDataViewMapping;
    import CompiledDataViewRoleForMappingWithReduction = powerbi.data.CompiledDataViewRoleForMappingWithReduction;
    import CompiledSubtotalType = powerbi.data.CompiledSubtotalType;
    import DataViewAnalysis = powerbi.DataViewAnalysis;
    import DataViewMatrix = powerbi.DataViewMatrix;
    import DataViewMatrixNode = powerbi.DataViewMatrixNode;
    import DataViewMetadataColumn = powerbi.DataViewMetadataColumn;
    import Matrix = powerbi.visuals.Matrix;
    import matrixCapabilities = powerbi.visuals.matrixCapabilities;
    import TablixControl = powerbi.visuals.controls.TablixControl;

    import TablixUtils = powerbi.visuals.controls.internal.TablixUtils;
    import MatrixVisualNode = powerbi.visuals.MatrixVisualNode;
    import MatrixHierarchyNavigator = powerbi.visuals.IMatrixHierarchyNavigator;
    import QueryProjectionCollection = powerbi.data.QueryProjectionCollection;
    import QueryProjectionsByRole = powerbi.data.QueryProjectionsByRole;
    import valueFormatter = powerbi.visuals.valueFormatter;
    import ValueType = powerbi.ValueType;
    import PrimitiveType = powerbi.PrimitiveType;
    import SortDirection = powerbi.SortDirection;

    powerbitests.mocks.setLocale();

    let dataTypeNumber = ValueType.fromPrimitiveTypeAndCategory(PrimitiveType.Double);
    let dataTypeString = ValueType.fromPrimitiveTypeAndCategory(PrimitiveType.Text);
    let dataTypeBoolean = ValueType.fromPrimitiveTypeAndCategory(PrimitiveType.Boolean);
    let dataTypeWebUrl = ValueType.fromPrimitiveTypeAndCategory(PrimitiveType.Text, "WebUrl");
    let dataTypeKpiStatus = ValueType.fromPrimitiveTypeAndCategory(PrimitiveType.Integer);

    let webPluginService = new powerbi.visuals.visualPluginFactory.MinervaVisualPluginService({});
    let dashboardPluginService = new powerbi.visuals.visualPluginFactory.DashboardPluginService({}, { tooltipsEnabled: true });

    let rowGroupSource1: DataViewMetadataColumn = { displayName: "RowGroup1", queryName: "RowGroup1", type: dataTypeString, index: 0 };
    let rowGroupSource2: DataViewMetadataColumn = { displayName: "RowGroup2", queryName: "RowGroup2", type: dataTypeString, index: 1 };
    let rowGroupSource3: DataViewMetadataColumn = { displayName: "RowGroup3", queryName: "RowGroup3", type: dataTypeString, index: 2 };
    let rowGroupSourceLeadingSpace: DataViewMetadataColumn = { displayName: "    Row    Group1", queryName: "RowGroup1", type: dataTypeString, index: 0 };
    let rowGroupSource3formatted: DataViewMetadataColumn = { displayName: "RowGroup3", queryName: "RowGroup3", type: dataTypeString, index: 2, objects: { general: { formatString: "0.0" } } };
    let rowGroupSource4: DataViewMetadataColumn = { displayName: "RowGroup4", queryName: "RowGroup4", type: dataTypeBoolean, index: 9 };
    let rowGroupSourceWebUrl: DataViewMetadataColumn = { displayName: "RowGroupWebUrl", queryName: "RowGroupWebUrl", type: dataTypeWebUrl, index: 0 };
    let rowGroupSourceNonAggregatable: DataViewMetadataColumn = { displayName: "RowGroup4", queryName: "RowGroup4", type: dataTypeBoolean, index: 9, discourageAggregationAcrossGroups:true };
    let columnGroupSource1: DataViewMetadataColumn = { displayName: "ColGroup1", queryName: "ColGroup1", type: dataTypeString, index: 3 };
    let columnGroupSource2: DataViewMetadataColumn = { displayName: "ColGroup2", queryName: "ColGroup2", type: dataTypeString, index: 4 };
    let columnGroupSource3: DataViewMetadataColumn = { displayName: "ColGroup3", queryName: "ColGroup3", type: dataTypeString, index: 5 };    
    let columnGroupSourceLeadingSpce: DataViewMetadataColumn = { displayName: "    Col    Group1", queryName: "ColGroup1", type: dataTypeString, index: 1 };
    let columnGroupSource3formatted: DataViewMetadataColumn = { displayName: "ColGroup3", queryName: "ColGroup3", type: dataTypeString, index: 5, objects: { general: { formatString: "0.00" } } };
    let columnGroupSource4: DataViewMetadataColumn = { displayName: "ColGroup4", queryName: "ColGroup4", type: dataTypeBoolean, index: 10 };
    let columnGroupSourceWebUrl: DataViewMetadataColumn = { displayName: "ColGroupWebUrl", queryName: "ColGroupWebUrl", type: dataTypeWebUrl, index: 0 };
    let columnGroupSourceKpiStatus: DataViewMetadataColumn = {
        displayName: "ColGroupKpiStatus",
        queryName: "Table1._ColGroupKpiStatus Status",
        type: dataTypeKpiStatus,
        roles: { Values: true },
        format: "g",
        kpi: {
            graphic: "Traffic Light - Single"
        },
        objects: {
            general: {
                formatString: "g",
            },
        },
    };
    let columnGroupSourceNonAggregatable: DataViewMetadataColumn = { displayName: "ColGroup4", queryName: "ColGroup4", type: dataTypeBoolean, index: 10, discourageAggregationAcrossGroups: true };
    let measureSource1: DataViewMetadataColumn = { displayName: "Measure1", queryName: "Measure1", type: dataTypeNumber, isMeasure: true, index: 6 };
    let measureSource2: DataViewMetadataColumn = { displayName: "Measure2", queryName: "Measure2", type: dataTypeNumber, isMeasure: true, index: 7 };
    let measureSource3: DataViewMetadataColumn = { displayName: "Measure3", queryName: "Measure3", type: dataTypeNumber, isMeasure: true, index: 8 };

    let measureSourceAscending: DataViewMetadataColumn = { displayName: "Measure1", queryName: "Measure1", type: dataTypeNumber, isMeasure: true, index: 9, objects: {}, sort: SortDirection.Ascending };
    let measureSourceDescending: DataViewMetadataColumn = { displayName: "Measure1", queryName: "Measure1", type: dataTypeNumber, isMeasure: true, index: 10, objects: {}, sort: SortDirection.Descending };

    // ------------
    // | Measure1 |
    // +----------|
    // |      100 |
    // ------------
    let matrixOneMeasure: DataViewMatrix = {
        rows: {
            root: {
                children: [{
                    level: 0,
                    values: {
                        0: { value: 100 }
                    }
                }]
            },
            levels: []
        },
        columns: {
            root: {
                children: [{ level: 0 }]
            },
            levels: [{
                sources: [measureSource1]
            }]
        },
        valueSources: [measureSource1]
    };

    let matrixOneMeasureSortAscending: DataViewMatrix = {
        rows: {
            root: {
                children: [{
                    level: 0,
                    values: {
                        0: { value: 100 }
                    }
                }]
            },
            levels: [{sources: [measureSourceAscending]}]
        },
        columns: {
            root: {
                children: [{ level: 0 }]
            },
            levels: [{
                sources: [measureSource1]
            }]
        },
        valueSources: [measureSource1]
    };

    let matrixOneMeasureSortDescending: DataViewMatrix = {
        rows: {
            root: {
                children: [{
                    level: 0,
                    values: {
                        0: { value: 100 }
                    }
                }]
            },
            levels: [{
                sources: [measureSourceDescending]
            }]
        },
        columns: {
            root: {
                children: [{ level: 0 }]
            },
            levels: [{
                sources: [measureSource1]
            }]
        },
        valueSources: [measureSource1]
    };
   
    let matrixOneMeasureDataView: powerbi.DataView = {
        metadata: { columns: [measureSource1] },
        matrix: matrixOneMeasure
    };

    let matrixOneMeasureDataViewSortAscending: powerbi.DataView = {
        metadata: { columns: [measureSourceAscending] },
        matrix: matrixOneMeasureSortAscending
    };

    let matrixOneMeasureDataViewSortDescending: powerbi.DataView = {
        metadata: { columns: [measureSourceDescending] },
        matrix: matrixOneMeasureSortDescending
    };

    // -----------------------
    // | Measure1 | Measure2 |
    // +----------------------
    // |      100 |      200 |
    // -----------------------
    let matrixTwoMeasures: DataViewMatrix = {
        rows: {
            root: {
                children: [{
                    level: 0,
                    values: {
                        0: { value: 100 },
                        1: { value: 200, valueSourceIndex: 1 }
                    }
                }]
            },
            levels: []
        },
        columns: {
            root: {
                children: [
                    { level: 0 },
                    { level: 0, levelSourceIndex: 1 }
                ]
            },
            levels: [{
                sources: [
                    measureSource1,
                    measureSource2
                ]
            }]
        },
        valueSources: [
            measureSource1,
            measureSource2
        ]
    };
    let matrixTwoMeasuresDataView: powerbi.DataView = {
        metadata: { columns: [measureSource1, measureSource2] },
        matrix: matrixTwoMeasures
    };

    // -----------
    // | Group A |
    // +---------|
    // |     100 |
    // -----------
    let matrixOneMeasureOneColumnGroupOneGroupInstance: DataViewMatrix = {
        rows: {
            root: {
                children: [{
                    level: 0,
                    values: {
                        0: { value: 100 }
                    }
                }]
            },
            levels: []
        },
        columns: {
            root: {
                children: [
                    {
                        level: 0,
                        value: "Group A"
                    }
                ]
            },
            levels: [{
                sources: [columnGroupSource1]
            }]
        },
        valueSources: [measureSource1]
    };
    let matrixOneMeasureOneColumnGroupOneGroupInstanceDataView: powerbi.DataView = {
        metadata: { columns: [columnGroupSource1, measureSource1] },
        matrix: matrixOneMeasureOneColumnGroupOneGroupInstance
    };
    
    // ---------------------------
    // | http://www.validurl.com |
    // +-------------------------|
    // |     100                 |
    // ---------------------------
    let matrixOneMeasureOneColumnGroupWithUrlOneGroupInstance: DataViewMatrix = {
        rows: {
            root: {
                children: [{
                    level: 0,
                    values: {
                        0: { value: 100 }
                    }
                }]
            },
            levels: []
        },
        columns: {
            root: {
                children: [
                    {
                        level: 0,
                        value: "http://www.validurl.com"
                    }
                ]
            },
            levels: [{
                sources: [columnGroupSourceWebUrl]
            }]
        },
        valueSources: [measureSource1]
    };
    let matrixOneMeasureOneColumnGroupWithUrlOneGroupInstanceDataView: powerbi.DataView = {
        metadata: { columns: [columnGroupSourceWebUrl, measureSource1] },
        matrix: matrixOneMeasureOneColumnGroupWithUrlOneGroupInstance
    };

    // ----------------------------------
    // | Measure1 | Measure2 | Measure3 |
    // +--------------------------------|
    // |      100 |      200 |      300 |
    // ----------------------------------
    let matrixThreeMeasures: DataViewMatrix = {
        rows: {
            root: {
                children: [{
                    level: 0,
                    values: {
                        0: { value: 100 },
                        1: { value: 200, valueSourceIndex: 1 },
                        2: { value: 300, valueSourceIndex: 2 }
                    }
                }]
            },
            levels: []
        },
        columns: {
            root: {
                children: [
                    { level: 0 },
                    { level: 0, levelSourceIndex: 1 },
                    { level: 0, levelSourceIndex: 2 }
                ]
            },
            levels: [{
                sources: [
                    measureSource1,
                    measureSource2,
                    measureSource3
                ]
            }]
        },
        valueSources: [
            measureSource1,
            measureSource2,
            measureSource3
        ]
    };
    let matrixThreeMeasuresDataView: powerbi.DataView = {
        metadata: { columns: [measureSource1, measureSource2, measureSource3] },
        matrix: matrixThreeMeasures
    };

    // ----------------------------------
    // |                        Group A |
    // |--------------------------------|
    // | Measure1 | Measure2 | Measure3 |
    // +--------------------------------|
    // |      100 |      200 |      300 |
    // ----------------------------------
    let matrixThreeMeasuresOneColumnGroupOneGroupInstance: DataViewMatrix = {
        rows: {
            root: {
                children: [{
                    level: 0,
                    values: {
                        0: { value: 100 },
                        1: { value: 200, valueSourceIndex: 1 },
                        2: { value: 300, valueSourceIndex: 2 }
                    }
                }]
            },
            levels: []
        },
        columns: {
            root: {
                children: [
                    {
                        level: 0,
                        value: "Group A",
                        children: [
                            { level: 1 },
                            { level: 1, levelSourceIndex: 1 },
                            { level: 1, levelSourceIndex: 2 }
                        ]
                    }
                ]
            },
            levels: [
                {
                    sources: [
                        columnGroupSource1
                    ]
                },
                {
                    sources: [
                        measureSource1,
                        measureSource2,
                        measureSource3
                    ]
                }
            ]
        },
        valueSources: [
            measureSource1,
            measureSource2,
            measureSource3
        ]
    };
    let matrixThreeMeasuresOneColumnGroupOneGroupInstanceDataView: powerbi.DataView = {
        metadata: { columns: [columnGroupSource1, measureSource1, measureSource2, measureSource3] },
        matrix: matrixThreeMeasuresOneColumnGroupOneGroupInstance
    };

    // ----------------------------------------------------------------------------
    // |     RowGroup1 | RowGroup2 |   RowGroup3 | Measure1 | Measure2 | Measure3 |
    // |-----------------------------------------+--------------------------------|
    // | North America |    Canada |     Ontario |     1000 |     1001 |     1002 |
    // |               |           |----------------------------------------------|
    // |               |           |      Quebec |     1010 |     1011 |     1012 |
    // |               |----------------------------------------------------------|
    // |               |       USA |  Washington |     1100 |     1101 |     1102 |
    // |               |           |----------------------------------------------|
    // |               |           |      Oregon |     1110 |     1111 |     1112 |
    // |--------------------------------------------------------------------------|
    // | South America |    Brazil |    Amazonas |     2000 |     2001 |     2002 |
    // |               |           |----------------------------------------------|
    // |               |           | Mato Grosso |     2010 |     2011 |     2012 |
    // |               |----------------------------------------------------------|
    // |               |     Chile |       Arica |     2100 |     2101 |     2102 |
    // |               |           |----------------------------------------------|
    // |               |           |  Parinacota |     2110 |     2111 |     2112 |
    // ----------------------------------------------------------------------------
    let matrixThreeMeasuresThreeRowGroups: DataViewMatrix = {
        rows: {
            root: {
                children: [
                    {
                        level: 0,
                        value: "North America",
                        children: [
                            {
                                level: 1,
                                value: "Canada",
                                children: [
                                    {
                                        level: 2,
                                        value: "Ontario",
                                        values: {
                                            0: { value: 1000 },
                                            1: { value: 1001, valueSourceIndex: 1 },
                                            2: { value: 1002, valueSourceIndex: 2 }
                                        }
                                    },
                                    {
                                        level: 2,
                                        value: "Quebec",
                                        values: {
                                            0: { value: 1010 },
                                            1: { value: 1011, valueSourceIndex: 1 },
                                            2: { value: 1012, valueSourceIndex: 2 }
                                        }
                                    }
                                ]
                            },
                            {
                                level: 1,
                                value: "USA",
                                children: [
                                    {
                                        level: 2,
                                        value: "Washington",
                                        values: {
                                            0: { value: 1100 },
                                            1: { value: 1101, valueSourceIndex: 1 },
                                            2: { value: 1102, valueSourceIndex: 2 }
                                        }
                                    },
                                    {
                                        level: 2,
                                        value: "Oregon",
                                        values: {
                                            0: { value: 1110 },
                                            1: { value: 1111, valueSourceIndex: 1 },
                                            2: { value: 1112, valueSourceIndex: 2 }
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        level: 0,
                        value: "South America",
                        children: [
                            {
                                level: 1,
                                value: "Brazil",
                                children: [
                                    {
                                        level: 2,
                                        value: "Amazonas",
                                        values: {
                                            0: { value: 2000 },
                                            1: { value: 2001, valueSourceIndex: 1 },
                                            2: { value: 2002, valueSourceIndex: 2 }
                                        }
                                    },
                                    {
                                        level: 2,
                                        value: "Mato Grosso",
                                        values: {
                                            0: { value: 2010 },
                                            1: { value: 2011, valueSourceIndex: 1 },
                                            2: { value: 2012, valueSourceIndex: 2 }
                                        }
                                    }
                                ]
                            },
                            {
                                level: 1,
                                value: "Chile",
                                children: [
                                    {
                                        level: 2,
                                        value: "Arica",
                                        values: {
                                            0: { value: 2100 },
                                            1: { value: 2101, valueSourceIndex: 1 },
                                            2: { value: 2102, valueSourceIndex: 2 }
                                        }
                                    },
                                    {
                                        level: 2,
                                        value: "Parinacota",
                                        values: {
                                            0: { value: 2110 },
                                            1: { value: 2111, valueSourceIndex: 1 },
                                            2: { value: 2112, valueSourceIndex: 2 }
                                        }
                                    }
                                ]
                            }
                        ]
                    }

                ]
            },
            levels: [
                { sources: [rowGroupSource1] },
                { sources: [rowGroupSource2] },
                { sources: [rowGroupSource3] }
            ]
        },
        columns: {
            root: {
                children: [
                    { level: 0 },
                    { level: 0, levelSourceIndex: 1 },
                    { level: 0, levelSourceIndex: 2 }
                ]
            },
            levels: [{
                sources: [
                    measureSource1,
                    measureSource2,
                    measureSource3
                ]
            }]
        },
        valueSources: [
            measureSource1,
            measureSource2,
            measureSource3
        ]
    };
    let matrixThreeMeasuresThreeRowGroupsDataView: powerbi.DataView = {
        metadata: { columns: [rowGroupSource1, rowGroupSource2, rowGroupSource3], segment: {} },
        matrix: matrixThreeMeasuresThreeRowGroups
    };
    let matrixThreeMeasuresThreeRowGroupsDataViewIncreasedFontSize: powerbi.DataView = {
        metadata: {
            columns: [rowGroupSource1, rowGroupSource2, rowGroupSource3],
            segment: {},
            objects: {
                general: {
                    rowSubtotals: true,
                    columnSubtotals: true,
                    textSize: 25,
                }
            },
        },
        matrix: matrixThreeMeasuresThreeRowGroups
    };

    // ------------------------
    // | RowGroup1 | Measure1 |
    // |-----------+----------|
    // |   Group 1 |      100 |
    // ------------------------
    let matrixOneMeasureOneRowGroupOneGroupInstance: DataViewMatrix = {
        rows: {
            root: {
                children: [{
                    level: 0,
                    value: "Group 1",
                    values: { 0: { value: 100 } }
                }]
            },
            levels: [{ sources: [rowGroupSource1] }]
        },
        columns: {
            root: {
                children: [{ level: 0 }]
            },
            levels: [{ sources: [measureSource1] }]
        },
        valueSources: [measureSource1]
    };
    let matrixOneMeasureOneRowGroupOneGroupInstanceDataView: powerbi.DataView = {
        metadata: { columns: [rowGroupSource1, measureSource1] },
        matrix: matrixOneMeasureOneRowGroupOneGroupInstance
    };

    // ------------------------
    // | RowGroup1 | Measure1 |
    // |-----------+----------|
    // |   Group 1 |      100 |
    // |-----------+----------|
    // |   Group 2 |      200 |
    // ------------------------
    let matrixOneMeasureOneRowGroupTwoGroupInstances: DataViewMatrix = {
        rows: {
            root: {
                children: [{
                    level: 0,
                    value: "Group 1",
                    values: { 0: { value: 100 } }
                }, {
                        level: 0,
                        value: "Group 2",
                        values: { 0: { value: 200 } }
                    }]
            },
            levels: [{ sources: [rowGroupSource1] }]
        },
        columns: {
            root: {
                children: [{ level: 0 }]
            },
            levels: [{ sources: [measureSource1] }]
        },
        valueSources: [measureSource1]
    };
    let matrixOneMeasureOneRowGroupTwoGroupInstancesDataView: powerbi.DataView = {
        metadata: { columns: [rowGroupSource1, measureSource1] },
        matrix: matrixOneMeasureOneRowGroupTwoGroupInstances
    };

    // ----------------------------------------
    // | RowGroup1                 | Measure1 |
    // |---------------------------+----------|
    // |   http://www.validurl.com |      100 |
    // ----------------------------------------
    let matrixOneMeasureOneRowGroupUrlOneGroupInstance: DataViewMatrix = {
        rows: {
            root: {
                children: [{
                    level: 0,
                    value: "http://www.validurl.com",
                    values: { 0: { value: 100 } }
                }]
            },
            levels: [{ sources: [rowGroupSourceWebUrl] }]
        },
        columns: {
            root: {
                children: [{ level: 0 }]
            },
            levels: [{ sources: [measureSource1] }]
        },
        valueSources: [measureSource1]
    };
    let matrixOneMeasureOneRowGroupUrlOneGroupInstanceDataView: powerbi.DataView = {
        metadata: { columns: [], segment: {} },
        matrix: matrixOneMeasureOneRowGroupUrlOneGroupInstance
    };

    // ------------------------------------------
    // | RowGroup1    |          kpiStatus      |
    // |----------------------------------------|
    // |   1          |  kpiTrafficLightSingle2 |
    // ------------------------------------------
    let matrixOneMeasureOneRowGroupKpiStatusOneGroupInstance: DataViewMatrix = {
        rows: {
            root: {
                children: [{
                    level: 0,
                    value: "1",
                    values: { 0: { value: "1" } }
                }]
            },
            levels: [{ sources: [rowGroupSource1] }]
        },
        columns: {
            root: {
                children: [{ level: 0 }]
            },
            levels: [{ sources: [columnGroupSourceKpiStatus] }]
        },
        valueSources: [columnGroupSourceKpiStatus]
    };
    let matrixOneMeasureOneRowGroupKpiStatusOneGroupInstanceDataView: powerbi.DataView = {
        metadata: { columns: [], segment: {} },
        matrix: matrixOneMeasureOneRowGroupKpiStatusOneGroupInstance
    };

    // ----------------------
    // | RowGroup1 |  Group |
    // |-----------+--------|
    // |     Group |        |
    // ----------------------
    let matrixOneRowGroupOneColumnGroupOneGroupInstance: DataViewMatrix = {
        rows: {
            root: {
                children: [{
                    level: 0,
                    value: 10
                }]
            },
            levels: [{ sources: [rowGroupSource1] }]
        },
        columns: {
            root: {
                children: [{
                    level: 0,
                    value: 10
                }]
            },
            levels: [{ sources: [columnGroupSource1] }]
        },
        valueSources: []
    };
    let matrixOneRowGroupOneColumnGroupOneGroupInstanceDataView: powerbi.DataView = {
        metadata: { columns: [rowGroupSource1, columnGroupSource1] },
        matrix: matrixOneRowGroupOneColumnGroupOneGroupInstance
    };

    // ------------------------------------
    // |     Col    Group1 |      G    C1 |
    // |     Row    Group1 |      G    C2 |
    // |-------------------+--------------|
    // |         GR        |              |
    // ------------------------------------
    let matrixOneRowGroupTwoColumnGroupsOneGroupInstanceLeadingSpace: DataViewMatrix = {
        rows: {
            root: {
                children: [{
                    level: 0,
                    value: "    GR    "
                }]
            },
            levels: [{ sources: [rowGroupSourceLeadingSpace] }]
        },
        columns: {
            root: {
                children: [{
                    level: 0,
                    value: "    G    C1",
                    children: [{
                        level: 1,
                        value: "    G    C2"
                    }]
                }]
            },
            levels: [{ sources: [columnGroupSourceLeadingSpce] }, { sources: [columnGroupSource2] }]
        },
        valueSources: []
    };
    let matrixOneRowGroupTwoColumnGroupsOneGroupInstanceLeadingSpaceDataView: powerbi.DataView = {
        metadata: { columns: [rowGroupSourceLeadingSpace, columnGroupSourceLeadingSpce, columnGroupSource2] },
        matrix: matrixOneRowGroupTwoColumnGroupsOneGroupInstanceLeadingSpace
    };

    // -------------------------------------
    // | RowGroup1 | RowGroup2 | RowGroup3 |
    // |-----------------------------------+
    // |    Africa |   Algeria |      2008 |
    // -------------------------------------
    let matrixThreeRowGroupsOneGroupInstance: DataViewMatrix = {
        rows: {
            root: {
                children: [
                    {
                        level: 0,
                        value: "Africa",
                        children: [
                            {
                                level: 1,
                                value: "Algeria",
                                children: [
                                    {
                                        level: 2,
                                        value: 2008,
                                        identity: mocks.dataViewScopeIdentity("rowGroup3")
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            levels: [
                { sources: [rowGroupSource1] },
                { sources: [rowGroupSource2] },
                { sources: [rowGroupSource3] }
            ]
        },
        columns: {
            root: {
                children: []
            },
            levels: []
        },
        valueSources: []
    };
    let matrixThreeRowGroupsOneGroupInstanceDataView: powerbi.DataView = {
        metadata: { columns: [rowGroupSource1, rowGroupSource2, rowGroupSource3] },
        matrix: matrixThreeRowGroupsOneGroupInstance
    };

    // -------------------------
    // | RowGroup1 | RowGroup2 |
    // |-----------------------+
    // |    Africa |           |
    // |           |-----------|
    // |           |    Angola |
    // |-----------|-----------|
    // |      Asia |     China |
    // |           |-----------|
    // |           |           |
    // |-----------|-----------|
    // |           |           |
    // -------------------------
    let matrixTwoRowGroupsWithNullValues: DataViewMatrix = {
        rows: {
            root: {
                children: [
                    {
                        level: 0,
                        value: "Africa",
                        children: [
                            {
                                level: 1
                            },
                            {
                                level: 1,
                                value: "Angola"
                            }
                        ]
                    },
                    {
                        level: 0,
                        value: "Asia",
                        children: [
                            {
                                level: 1,
                                value: "China"
                            },
                            {
                                level: 1
                            }
                        ]
                    },
                    {
                        level: 0,
                        children: [
                            {
                                level: 1
                            }
                        ]
                    }
                ]
            },
            levels: [
                { sources: [rowGroupSource1] },
                { sources: [rowGroupSource2] }
            ]
        },
        columns: {
            root: {
                children: []
            },
            levels: []
        },
        valueSources: []
    };

    // -------------------------------------
    // | RowGroup1 | RowGroup2 | RowGroup3 |
    // |-----------------------------------+
    // |    Africa |   Algeria |      2008 |
    // |           |           |-----------|
    // |           |           |      2012 |
    // |           |-----------------------|
    // |           |    Angola |      2008 |
    // |           |           |-----------|
    // |           |           |      2012 |
    // |-----------|-----------|-----------|
    // |      Asia |     China |      2008 |
    // |           |           |-----------|
    // |           |           |      2012 |
    // |           |-----------|-----------|
    // |           |     India |      2008 |
    // |           |           |-----------|
    // |           |           |      2012 |
    // -------------------------------------
    let matrixThreeRowGroups: DataViewMatrix = {
        rows: {
            root: {
                children: [
                    {
                        level: 0,
                        value: "Africa",
                        children: [
                            {
                                level: 1,
                                value: "Algeria",
                                children: [
                                    {
                                        level: 2,
                                        value: 2008
                                    },
                                    {
                                        level: 2,
                                        value: 2012
                                    }
                                ]
                            },
                            {
                                level: 1,
                                value: "Angola",
                                children: [
                                    {
                                        level: 2,
                                        value: 2008
                                    },
                                    {
                                        level: 2,
                                        value: 2012
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        level: 0,
                        value: "Asia",
                        children: [
                            {
                                level: 1,
                                value: "China",
                                children: [
                                    {
                                        level: 2,
                                        value: 2008
                                    },
                                    {
                                        level: 2,
                                        value: 2012
                                    }
                                ]
                            },
                            {
                                level: 1,
                                value: "India",
                                children: [
                                    {
                                        level: 2,
                                        value: 2008
                                    },
                                    {
                                        level: 2,
                                        value: 2012
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            levels: [
                { sources: [rowGroupSource1] },
                { sources: [rowGroupSource2] },
                { sources: [rowGroupSource3] }
            ]
        },
        columns: {
            root: {
                children: []
            },
            levels: []
        },
        valueSources: []
    };

    // ---------------------------------------------------------
    // |                    Africa |                      Asia |
    // |---------------------------|---------------------------|
    // |     Algeria |      Angola |       China |       India |
    // |-------------|-------------|-------------|-------------|
    // | 2008 | 2012 | 2008 | 2012 | 2008 | 2012 | 2008 | 2012 |
    // +--------------------------------------------------------
    let matrixThreeColumnGroups: DataViewMatrix = {
        rows: {
            root: {
                children: []
            },
            levels: []
        },
        columns: {
            root: {
                children: [
                    {
                        level: 0,
                        value: "Africa",
                        children: [
                            {
                                level: 1,
                                value: "Algeria",
                                children: [
                                    {
                                        level: 2,
                                        value: 2008
                                    },
                                    {
                                        level: 2,
                                        value: 2012
                                    }
                                ]
                            },
                            {
                                level: 1,
                                value: "Angola",
                                children: [
                                    {
                                        level: 2,
                                        value: 2008
                                    },
                                    {
                                        level: 2,
                                        value: 2012
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        level: 0,
                        value: "Asia",
                        children: [
                            {
                                level: 1,
                                value: "China",
                                children: [
                                    {
                                        level: 2,
                                        value: 2008
                                    },
                                    {
                                        level: 2,
                                        value: 2012
                                    }
                                ]
                            },
                            {
                                level: 1,
                                value: "India",
                                children: [
                                    {
                                        level: 2,
                                        value: 2008
                                    },
                                    {
                                        level: 2,
                                        value: 2012
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            levels: [
                { sources: [rowGroupSource1] },
                { sources: [rowGroupSource2] },
                { sources: [rowGroupSource3] }
            ]
        },
        valueSources: []
    };
    let matrixThreeColumnGroupsDataView: powerbi.DataView = {
        metadata: {
            columns:
            [
                rowGroupSource1,
                rowGroupSource2,
                rowGroupSource3
            ]
        },
        matrix: matrixThreeColumnGroups
    };

    // --------------------------------------------
    // |         Africa |           Asia |        |
    // |----------------|----------------|--------|
    // |       | Angola | China |        |        |
    // +-------------------------------------------
    let matrixTwoColumnGroupsWithNullValues = {
        rows: {
            root: {
                children: []
            },
            levels: []
        },
        columns: {
            root: {
                children: [
                    {
                        level: 0,
                        value: "Africa",
                        children: [
                            {
                                level: 1,
                                identity: jasmine.any(Object)
                            },
                            {
                                level: 1,
                                value: "Angola",
                                identity: jasmine.any(Object)
                            }
                        ]
                    },
                    {
                        level: 0,
                        value: "Asia",
                        children: [
                            {
                                level: 1,
                                value: "China",
                                identity: jasmine.any(Object)
                            },
                            {
                                level: 1,
                                identity: jasmine.any(Object)
                            }
                        ]
                    },
                    {
                        level: 0,
                        children: [
                            {
                                level: 1,
                                identity: jasmine.any(Object)
                            }
                        ]
                    }
                ]
            },
            levels: [
                { sources: [columnGroupSource1] },
                { sources: [columnGroupSource2] }
            ]
        },
        valueSources: []
    };

    // -----------------------------
    // | RowGroup1 | United States |
    // |-----------+---------------|
    // |      2002 |               |
    // -----------------------------
    let matrixOneRowGroupOneColumnGroupOneInstance: DataViewMatrix = {
        rows: {
            root: {
                children: [
                    {
                        level: 0,
                        value: 2002
                    }
                ]
            },
            levels: [
                {
                    sources: [rowGroupSource1]
                }
            ]
        },
        columns: {
            root: {
                children: [
                    {
                        level: 0,
                        value: "United States"
                    }
                ]
            },
            levels: [
                {
                    sources: [columnGroupSource1]
                }
            ]
        },
        valueSources: []
    };

    // -----------------------------------------
    // |           |           | ColGroup1 | B |
    // |-----------|-----------|-----------|---|
    // |           |           | ColGroup2 | b |
    // |-----------|-----------|-----------|---|
    // | RowGroup1 | RowGroup2 | RowGroup3 | 2 |
    // |-----------------------------------+---|
    // |         A |         a |         1 |   |
    // -----------------------------------------
    let matrixThreeRowGroupsThreeColumnGroupsOneInstance: DataViewMatrix = {
        rows: {
            root: {
                children: [
                    {
                        level: 0,
                        value: "A",
                        children: [
                            {
                                level: 1,
                                value: "a",
                                children: [
                                    {
                                        level: 2,
                                        value: 1
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            levels: [
                { sources: [rowGroupSource1] },
                { sources: [rowGroupSource2] },
                { sources: [rowGroupSource3] }
            ]
        },
        columns: {
            root: {
                children: [
                    {
                        level: 0,
                        value: "B",
                        children: [
                            {
                                level: 1,
                                value: "b",
                                children: [
                                    {
                                        level: 2,
                                        value: 2
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            levels: [
                { sources: [columnGroupSource1] },
                { sources: [columnGroupSource2] },
                { sources: [columnGroupSource3] }
            ]
        },
        valueSources: []
    };

    // -------------------------------------------------
    // |           |           | ColGroup1 |         C |
    // |-----------|-----------|-----------|-----------|
    // |           |           | ColGroup2 |     c | d |
    // |-----------|-----------|-----------|-----------|
    // | RowGroup1 | RowGroup2 | RowGroup3 | 4 | 5 | 6 |
    // |-----------------------------------+-----------|
    // |         A |         a |         1 |   |   |   |
    // |           |           |-----------|---|---|---|
    // |           |           |         2 |   |   |   |
    // |           |-----------|-----------|---|---|---|
    // |           |         b |         3 |   |   |   |
    // -------------------------------------------------
    let matrixThreeRowGroupsThreeColumnGroups: DataViewMatrix = {
        rows: {
            root: {
                children: [
                    {
                        level: 0,
                        value: "A",
                        children: [
                            {
                                level: 1,
                                value: "a",
                                children: [
                                    {
                                        level: 2,
                                        value: 1
                                    },
                                    {
                                        level: 2,
                                        value: 2
                                    }
                                ]
                            },
                            {
                                level: 1,
                                value: "b",
                                children: [
                                    {
                                        level: 2,
                                        value: 3
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            levels: [
                { sources: [rowGroupSource1] },
                { sources: [rowGroupSource2] },
                { sources: [rowGroupSource3formatted] }
            ]
        },
        columns: {
            root: {
                children: [
                    {
                        level: 0,
                        value: "C",
                        children: [
                            {
                                level: 1,
                                value: "c",
                                children: [
                                    {
                                        level: 2,
                                        value: 4
                                    },
                                    {
                                        level: 2,
                                        value: 5
                                    }
                                ]
                            },
                            {
                                level: 1,
                                value: "d",
                                children: [
                                    {
                                        level: 2,
                                        value: 6
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            levels: [
                { sources: [columnGroupSource1] },
                { sources: [columnGroupSource2] },
                { sources: [columnGroupSource3formatted] }
            ]
        },
        valueSources: []
    };

    // ---------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // |               |     ColGroup1 |                                                            1992 |                                                            1996 |
    // |---------------|---------------|-----------------------------------------------------------------|-----------------------------------------------------------------|
    // |               |     ColGroup2 |              Bronze |                Gold |              Silver |              Bronze |                Gold |              Silver |
    // |---------------|---------------|---------------------|---------------------|---------------------|---------------------|---------------------|---------------------|
    // |     RowGroup1 |     RowGroup2 | Measure1 | Measure2 | Measure1 | Measure2 | Measure1 | Measure2 | Measure1 | Measure2 | Measure1 | Measure2 | Measure1 | Measure2 |
    // |-------------------------------+-----------------------------------------------------------------------------------------------------------------------------------|
    // |          Asia |   South Korea |        0 |        1 |        2 |        3 |        4 |        5 |        6 |        7 |        8 |        9 |       10 |       11 |
    // |               |---------------|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|
    // |               |  Unified Team |       12 |       13 |       14 |       15 |       16 |       17 |       18 |       19 |       20 |       21 |       22 |          |
    // |---------------|---------------|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|
    // |        Europe |        France |       24 |       25 |       26 |       27 |       28 |       29 |       30 |       31 |       32 |       33 |       34 |       35 |
    // |               |---------------|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|
    // |               |       Germany |       36 |       37 |       38 |       39 |       40 |       41 |       42 |       43 |       44 |       45 |       46 |       47 |
    // |---------------|---------------|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|
    // | North America | United States |       48 |       49 |       50 |       51 |       52 |       53 |       54 |       55 |       56 |       57 |       58 |       59 |
    // |---------------|---------------|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|
    // |       Oceania |     Australia |       60 |       61 |       62 |       63 |       64 |       65 |       66 |       67 |       68 |       69 |       70 |       71 |
    // ---------------------------------------------------------------------------------------------------------------------------------------------------------------------
    let matrixTwoRowGroupsTwoColumnGroupsTwoMeasures: DataViewMatrix = {
        rows: {
            root: {
                children: [
                    {
                        level: 0,
                        value: "Asia",
                        children: [
                            {
                                level: 1,
                                value: "South Korea",
                                values: {
                                    0: { value: 0 }, 1: { value: 1, valueSourceIndex: 1 },
                                    2: { value: 2 }, 3: { value: 3, valueSourceIndex: 1 },
                                    4: { value: 4 }, 5: { value: 5, valueSourceIndex: 1 },
                                    6: { value: 6 }, 7: { value: 7, valueSourceIndex: 1 },
                                    8: { value: 8 }, 9: { value: 9, valueSourceIndex: 1 },
                                    10: { value: 10 }, 11: { value: 11, valueSourceIndex: 1 }
                                }
                            },
                            {
                                level: 1,
                                value: "Unified Team",
                                values: {
                                    0: { value: 12 }, 1: { value: 13, valueSourceIndex: 1 },
                                    2: { value: 14 }, 3: { value: 15, valueSourceIndex: 1 },
                                    4: { value: 16 }, 5: { value: 17, valueSourceIndex: 1 },
                                    6: { value: 18 }, 7: { value: 19, valueSourceIndex: 1 },
                                    8: { value: 20 }, 9: { value: 21, valueSourceIndex: 1 },
                                    10: { value: 22 }, 11: { value: null, valueSourceIndex: 1 }
                                }
                            }
                        ]
                    },
                    {
                        level: 0,
                        value: "Europe",
                        children: [
                            {
                                level: 1,
                                value: "France",
                                values: {
                                    0: { value: 24 }, 1: { value: 25, valueSourceIndex: 1 },
                                    2: { value: 26 }, 3: { value: 27, valueSourceIndex: 1 },
                                    4: { value: 28 }, 5: { value: 29, valueSourceIndex: 1 },
                                    6: { value: 30 }, 7: { value: 31, valueSourceIndex: 1 },
                                    8: { value: 32 }, 9: { value: 33, valueSourceIndex: 1 },
                                    10: { value: 34 }, 11: { value: 35, valueSourceIndex: 1 }
                                }
                            },
                            {
                                level: 1,
                                value: "Germany",
                                values: {
                                    0: { value: 36 }, 1: { value: 37, valueSourceIndex: 1 },
                                    2: { value: 38 }, 3: { value: 39, valueSourceIndex: 1 },
                                    4: { value: 40 }, 5: { value: 41, valueSourceIndex: 1 },
                                    6: { value: 42 }, 7: { value: 43, valueSourceIndex: 1 },
                                    8: { value: 44 }, 9: { value: 45, valueSourceIndex: 1 },
                                    10: { value: 46 }, 11: { value: 47, valueSourceIndex: 1 }
                                }
                            }
                        ]
                    },
                    {
                        level: 0,
                        value: "North America",
                        children: [
                            {
                                level: 1,
                                value: "United States",
                                values: {
                                    0: { value: 48 }, 1: { value: 49, valueSourceIndex: 1 },
                                    2: { value: 50 }, 3: { value: 51, valueSourceIndex: 1 },
                                    4: { value: 52 }, 5: { value: 53, valueSourceIndex: 1 },
                                    6: { value: 54 }, 7: { value: 55, valueSourceIndex: 1 },
                                    8: { value: 56 }, 9: { value: 57, valueSourceIndex: 1 },
                                    10: { value: 58 }, 11: { value: 59, valueSourceIndex: 1 }
                                }
                            }
                        ]
                    },
                    {
                        level: 0,
                        value: "Oceania",
                        children: [
                            {
                                level: 1,
                                value: "Australia",
                                values: {
                                    0: { value: 60 }, 1: { value: 61, valueSourceIndex: 1 },
                                    2: { value: 62 }, 3: { value: 63, valueSourceIndex: 1 },
                                    4: { value: 64 }, 5: { value: 65, valueSourceIndex: 1 },
                                    6: { value: 66 }, 7: { value: 67, valueSourceIndex: 1 },
                                    8: { value: 68 }, 9: { value: 69, valueSourceIndex: 1 },
                                    10: { value: 70 }, 11: { value: 71, valueSourceIndex: 1 }
                                }
                            }
                        ]
                    }
                ]
            },
            levels: [
                { sources: [rowGroupSource1] },
                { sources: [rowGroupSource2] }
            ]
        },
        columns: {
            root: {
                children: [
                    {
                        level: 0,
                        value: 1992,
                        children: [
                            {
                                level: 1,
                                name: "Bronze",
                                children: [
                                    {
                                        level: 2
                                    },
                                    {
                                        level: 2,
                                        levelSourceIndex: 1
                                    }
                                ]
                            },
                            {
                                level: 1,
                                value: "Gold",
                                children: [
                                    {
                                        level: 2
                                    },
                                    {
                                        level: 2,
                                        levelSourceIndex: 1
                                    }
                                ]
                            },
                            {
                                level: 1,
                                value: "Silver",
                                children: [
                                    {
                                        level: 2
                                    },
                                    {
                                        level: 2,
                                        levelSourceIndex: 1
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        level: 0,
                        value: 1996,
                        children: [
                            {
                                level: 1,
                                value: "Bronze",
                                children: [
                                    {
                                        level: 2
                                    },
                                    {
                                        level: 2,
                                        levelSourceIndex: 1
                                    }
                                ]
                            },
                            {
                                level: 1,
                                value: "Gold",
                                children: [
                                    {
                                        level: 2
                                    },
                                    {
                                        level: 2,
                                        levelSourceIndex: 1
                                    }
                                ]
                            },
                            {
                                level: 1,
                                value: "Silver",
                                children: [
                                    {
                                        level: 2
                                    },
                                    {
                                        level: 2,
                                        levelSourceIndex: 1
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            levels: [
                { sources: [columnGroupSource1] },
                { sources: [columnGroupSource2] },
                {
                    sources: [
                        measureSource1,
                        measureSource2
                    ]
                }
            ]
        },
        valueSources: [
            measureSource1,
            measureSource2
        ]
    };
    let matrixTwoRowGroupsTwoColumnGroupsTwoMeasuresDataView: powerbi.DataView = {
        metadata: {
            columns:
            [
                rowGroupSource1,
                rowGroupSource2,
                columnGroupSource1,
                columnGroupSource2,
                measureSource1,
                measureSource2
            ]
        },
        matrix: matrixTwoRowGroupsTwoColumnGroupsTwoMeasures
    };

    // --------------------------------------------------------------------------------------------------------------
    // |               |     ColGroup1 |                           1992 |                           1996 |    Total |
    // |---------------|---------------|--------------------------------|--------------------------------|          |
    // |     RowGroup1 |     RowGroup2 |   Silver |     Gold |    Total |   Silver |     Gold |    Total |          |
    // |---------------|---------------|----------|----------|----------|----------|----------|----------|----------|
    // |          Asia |   South Korea |        1 |        2 |        3 |        4 |        5 |        9 |       12 |
    // |               |---------------|----------|----------|----------|----------|----------|----------|----------|
    // |               |  Unified Team |       11 |       12 |       23 |       14 |       15 |       29 |       52 |
    // |               |---------------|----------|----------|----------|----------|----------|----------|----------|
    // |               |         Total |       12 |       14 |       26 |       18 |       20 |       38 |       64 |
    // |---------------|---------------|----------|----------|----------|----------|----------|----------|----------|
    // |        Europe |        France |       21 |       22 |       43 |       24 |       25 |       49 |       92 |
    // |               |---------------|----------|----------|----------|----------|----------|----------|----------|
    // |               |       Germany |       31 |       32 |       63 |       34 |       35 |       69 |      132 |
    // |               |---------------|----------|----------|----------|----------|----------|----------|----------|
    // |               |         Total |       52 |       54 |      106 |       58 |       60 |      118 |      224 |
    // |---------------|---------------|----------|----------|----------|----------|----------|----------|----------|
    // | North America | United States |       41 |       42 |       83 |       44 |       45 |       89 |      172 |
    // |               |---------------|----------|----------|----------|----------|----------|----------|----------|
    // |               |         Total |       41 |       42 |       83 |       44 |       45 |       89 |      172 |
    // |---------------|---------------|----------|----------|----------|----------|----------|----------|----------|
    // |       Oceania |     Australia |       51 |       52 |      103 |       54 |       55 |      109 |      212 |
    // |               |---------------|----------|----------|----------|----------|----------|----------|----------|
    // |               |         Total |       51 |       52 |      103 |       54 |       55 |      109 |      212 |
    // |-------------------------------|----------|----------|----------|----------|----------|----------|----------|
    // |         Total                 |      156 |      162 |      318 |      174 |      180 |      354 |      672 |
    // --------------------------------------------------------------------------------------------------------------
    let matrixTwoRowGroupsTwoColumnGroupsOneMeasureAndTotals: DataViewMatrix = {
        rows: {
            root: {
                children: [
                    {
                        level: 0,
                        value: "Asia",
                        children: [
                            {
                                level: 1,
                                value: "South Korea",
                                values: {
                                    0: { value: 1 }, 1: { value: 2 }, 2: { value: 3 }, 3: { value: 4 }, 4: { value: 5 }, 5: { value: 9 }, 6: { value: 12 }
                                }
                            },
                            {
                                level: 1,
                                value: "Unified Team",
                                values: {
                                    0: { value: 11 }, 1: { value: 12 }, 2: { value: 23 }, 3: { value: 14 }, 4: { value: 15 }, 5: { value: 29 }, 6: { value: 52 }
                                }
                            },
                            <DataViewMatrixNode>{
                                level: 1,
                                isSubtotal: true,
                                values: {
                                    0: { value: 12 }, 1: { value: 14 }, 2: { value: 26 }, 3: { value: 18 }, 4: { value: 20 }, 5: { value: 38 }, 6: { value: 64 }
                                }
                            }
                        ]
                    },
                    {
                        level: 0,
                        value: "Europe",
                        children: [
                            {
                                level: 1,
                                value: "France",
                                values: {
                                    0: { value: 21 }, 1: { value: 22 }, 2: { value: 43 }, 3: { value: 24 }, 4: { value: 25 }, 5: { value: 49 }, 6: { value: 92 }
                                }
                            },
                            {
                                level: 1,
                                value: "Germany",
                                values: {
                                    0: { value: 31 }, 1: { value: 32 }, 2: { value: 63 }, 3: { value: 34 }, 4: { value: 35 }, 5: { value: 69 }, 6: { value: 132 }
                                }
                            },
                            <DataViewMatrixNode>{
                                level: 1,
                                isSubtotal: true,
                                values: {
                                    0: { value: 52 }, 1: { value: 54 }, 2: { value: 106 }, 3: { value: 58 }, 4: { value: 60 }, 5: { value: 118 }, 6: { value: 224 }
                                }
                            }
                        ]
                    },
                    {
                        level: 0,
                        value: "North America",
                        children: [
                            {
                                level: 1,
                                value: "United States",
                                values: {
                                    0: { value: 41 }, 1: { value: 42 }, 2: { value: 83 }, 3: { value: 44 }, 4: { value: 45 }, 5: { value: 89 }, 6: { value: 172 }
                                }
                            },
                            <DataViewMatrixNode>{
                                level: 1,
                                isSubtotal: true,
                                values: {
                                    0: { value: 41 }, 1: { value: 42 }, 2: { value: 83 }, 3: { value: 44 }, 4: { value: 45 }, 5: { value: 89 }, 6: { value: 172 }
                                }
                            }
                        ]
                    },
                    {
                        level: 0,
                        value: "Oceania",
                        children: [
                            {
                                level: 1,
                                value: "Australia",
                                values: {
                                    0: { value: 51 }, 1: { value: 52 }, 2: { value: 103 }, 3: { value: 54 }, 4: { value: 55 }, 5: { value: 109 }, 6: { value: 212 }
                                }
                            },
                            <DataViewMatrixNode>{
                                level: 1,
                                isSubtotal: true,
                                values: {
                                    0: { value: 51 }, 1: { value: 52 }, 2: { value: 103 }, 3: { value: 54 }, 4: { value: 55 }, 5: { value: 109 }, 6: { value: 212 }
                                }
                            }
                        ]
                    },
                    <DataViewMatrixNode>{
                        level: 0,
                        isSubtotal: true,
                        values: {
                            0: { value: 156 }, 1: { value: 162 }, 2: { value: 318 }, 3: { value: 174 }, 4: { value: 180 }, 5: { value: 354 }, 6: { value: 672 }
                        }
                    }
                ]
            },
            levels: [
                { sources: [rowGroupSource1] },
                { sources: [rowGroupSource2] }
            ]
        },
        columns: {
            root: {
                children: [
                    {
                        level: 0,
                        value: 1992,
                        children: [
                            {
                                level: 1,
                                value: "Silver"
                            },
                            {
                                level: 1,
                                value: "Gold"
                            },
                            <DataViewMatrixNode>{
                                level: 1,
                                isSubtotal: true
                            }
                        ]
                    },
                    {
                        level: 0,
                        value: 1996,
                        children: [
                            {
                                level: 1,
                                value: "Silver"
                            },
                            {
                                level: 1,
                                value: "Gold"
                            },
                            <DataViewMatrixNode>{
                                level: 1,
                                isSubtotal: true
                            }
                        ]
                    },
                    <DataViewMatrixNode>{
                        level: 0,
                        isSubtotal: true
                    }
                ]
            },
            levels: [
                { sources: [columnGroupSource1] },
                { sources: [columnGroupSource2] }
            ]
        },
        valueSources: [measureSource1]
    };
    let matrixTwoRowGroupsTwoColumnGroupsOneMeasureAndTotalsDataView: powerbi.DataView = {
        metadata: {
            columns:
            [
                rowGroupSource1,
                rowGroupSource2,
                columnGroupSource1,
                columnGroupSource2,
                measureSource1
            ]
        },
        matrix: matrixTwoRowGroupsTwoColumnGroupsOneMeasureAndTotals
    };

    // -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // |               |     ColGroup1 |                                                            1992 |                                                            1996 |               Total |
    // |---------------|---------------|-----------------------------------------------------------------|-----------------------------------------------------------------|                     |
    // |               |     ColGroup2 |              Silver |                Gold |               Total |              Silver |                Gold |               Total |                     |
    // |---------------|---------------|---------------------|---------------------|---------------------|---------------------|---------------------|---------------------|---------------------|
    // |     RowGroup1 |     RowGroup2 | Measure1 | Measure2 | Measure1 | Measure2 | Measure1 | Measure2 | Measure1 | Measure2 | Measure1 | Measure2 | Measure1 | Measure2 | Measure1 | Measure2 |
    // |-------------------------------+-----------------------------------------------------------------------------------------------------------------------------------|----------|----------|
    // |          Asia |   South Korea |        0 |        1 |        2 |        3 |        2 |        4 |        6 |        7 |        8 |        9 |       14 |       16 |       16 |       20 |
    // |               |---------------|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|
    // |               |  Unified Team |       12 |       13 |       14 |       15 |       26 |       28 |       18 |       19 |       20 |       21 |       38 |       40 |       64 |       68 |
    // |               |---------------|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|
    // |               |         Total |       12 |       14 |       16 |       18 |       28 |       32 |       24 |       26 |       28 |       30 |       52 |       56 |       80 |       88 |
    // |---------------|---------------|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|
    // |        Europe |        France |       24 |       25 |       26 |       27 |       50 |       52 |       30 |       31 |       32 |       33 |       62 |       64 |      112 |      116 |
    // |               |---------------|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|
    // |               |       Germany |       36 |       37 |       38 |       39 |       74 |       76 |       42 |       43 |       44 |       45 |       86 |       88 |      160 |      164 |
    // |               |---------------|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|
    // |               |         Total |       60 |       62 |       64 |       66 |      124 |      128 |       72 |       74 |       76 |       78 |      148 |      152 |      272 |      280 |
    // |---------------|---------------|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|
    // | North America | United States |       48 |       49 |       50 |       51 |       98 |      100 |       54 |       55 |       56 |       57 |      110 |      112 |      208 |      212 |
    // |               |---------------|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|
    // |               |         Total |       48 |       49 |       50 |       51 |       98 |      100 |       54 |       55 |       56 |       57 |      110 |      112 |      208 |      212 |
    // |---------------|---------------|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|
    // |       Oceania |     Australia |       60 |       61 |       62 |       63 |      122 |      124 |       66 |       67 |       68 |       69 |      134 |      136 |      256 |      260 |
    // |               |---------------|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|
    // |               |         Total |       60 |       61 |       62 |       63 |      122 |      124 |       66 |       67 |       68 |       69 |      134 |      136 |      256 |      260 |
    // |-------------------------------|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|
    // |         Total                 |      180 |      186 |      192 |      198 |      372 |      384 |      216 |      222 |      228 |      234 |      444 |      456 |      816 |      840 |
    // ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
    let matrixTwoRowGroupsTwoColumnGroupsTwoMeasuresAndTotals: DataViewMatrix = {
        rows: {
            root: {
                children: [
                    {
                        level: 0,
                        value: "Asia",
                        children: [
                            {
                                level: 1,
                                value: "South Korea",
                                values: {
                                    0: { value: 0 }, 1: { value: 1, valueSourceIndex: 1 },
                                    2: { value: 2 }, 3: { value: 3, valueSourceIndex: 1 },
                                    4: { value: 2 }, 5: { value: 4, valueSourceIndex: 1 },
                                    6: { value: 6 }, 7: { value: 7, valueSourceIndex: 1 },
                                    8: { value: 8 }, 9: { value: 9, valueSourceIndex: 1 },
                                    10: { value: 14 }, 11: { value: 16, valueSourceIndex: 1 },
                                    12: { value: 16 }, 13: { value: 20, valueSourceIndex: 1 }
                                }
                            },
                            {
                                level: 1,
                                value: "Unified Team",
                                values: {
                                    0: { value: 12 }, 1: { value: 13, valueSourceIndex: 1 },
                                    2: { value: 14 }, 3: { value: 15, valueSourceIndex: 1 },
                                    4: { value: 26 }, 5: { value: 28, valueSourceIndex: 1 },
                                    6: { value: 18 }, 7: { value: 19, valueSourceIndex: 1 },
                                    8: { value: 20 }, 9: { value: 21, valueSourceIndex: 1 },
                                    10: { value: 38 }, 11: { value: 40, valueSourceIndex: 1 },
                                    12: { value: 64 }, 13: { value: 68, valueSourceIndex: 1 }
                                }
                            },
                            <DataViewMatrixNode>{
                                level: 1,
                                isSubtotal: true,
                                values: {
                                    0: { value: 12 }, 1: { value: 14, valueSourceIndex: 1 },
                                    2: { value: 16 }, 3: { value: 18, valueSourceIndex: 1 },
                                    4: { value: 28 }, 5: { value: 32, valueSourceIndex: 1 },
                                    6: { value: 24 }, 7: { value: 26, valueSourceIndex: 1 },
                                    8: { value: 28 }, 9: { value: 30, valueSourceIndex: 1 },
                                    10: { value: 52 }, 11: { value: 56, valueSourceIndex: 1 },
                                    12: { value: 80 }, 13: { value: 88, valueSourceIndex: 1 }
                                }
                            }
                        ]
                    },
                    {
                        level: 0,
                        value: "Europe",
                        children: [
                            {
                                level: 1,
                                value: "France",
                                values: {
                                    0: { value: 24 }, 1: { value: 25, valueSourceIndex: 1 },
                                    2: { value: 26 }, 3: { value: 27, valueSourceIndex: 1 },
                                    4: { value: 50 }, 5: { value: 52, valueSourceIndex: 1 },
                                    6: { value: 30 }, 7: { value: 31, valueSourceIndex: 1 },
                                    8: { value: 32 }, 9: { value: 33, valueSourceIndex: 1 },
                                    10: { value: 62 }, 11: { value: 64, valueSourceIndex: 1 },
                                    12: { value: 112 }, 13: { value: 116, valueSourceIndex: 1 }
                                }
                            },
                            {
                                level: 1,
                                value: "Germany",
                                values: {
                                    0: { value: 36 }, 1: { value: 37, valueSourceIndex: 1 },
                                    2: { value: 38 }, 3: { value: 39, valueSourceIndex: 1 },
                                    4: { value: 74 }, 5: { value: 74, valueSourceIndex: 1 },
                                    6: { value: 42 }, 7: { value: 43, valueSourceIndex: 1 },
                                    8: { value: 44 }, 9: { value: 45, valueSourceIndex: 1 },
                                    10: { value: 86 }, 11: { value: 88, valueSourceIndex: 1 },
                                    12: { value: 160 }, 13: { value: 164, valueSourceIndex: 1 }
                                }
                            },
                            <DataViewMatrixNode>{
                                level: 1,
                                isSubtotal: true,
                                values: {
                                    0: { value: 60 }, 1: { value: 62, valueSourceIndex: 1 },
                                    2: { value: 64 }, 3: { value: 66, valueSourceIndex: 1 },
                                    4: { value: 124 }, 5: { value: 128, valueSourceIndex: 1 },
                                    6: { value: 72 }, 7: { value: 74, valueSourceIndex: 1 },
                                    8: { value: 76 }, 9: { value: 78, valueSourceIndex: 1 },
                                    10: { value: 148 }, 11: { value: 152, valueSourceIndex: 1 },
                                    12: { value: 272 }, 13: { value: 280, valueSourceIndex: 1 }
                                }
                            }
                        ]
                    },
                    {
                        level: 0,
                        value: "North America",
                        children: [
                            {
                                level: 1,
                                value: "United States",
                                values: {
                                    0: { value: 48 }, 1: { value: 49, valueSourceIndex: 1 },
                                    2: { value: 50 }, 3: { value: 51, valueSourceIndex: 1 },
                                    4: { value: 98 }, 5: { value: 100, valueSourceIndex: 1 },
                                    6: { value: 54 }, 7: { value: 55, valueSourceIndex: 1 },
                                    8: { value: 56 }, 9: { value: 57, valueSourceIndex: 1 },
                                    10: { value: 110 }, 11: { value: 112, valueSourceIndex: 1 },
                                    12: { value: 208 }, 13: { value: 212, valueSourceIndex: 1 }
                                }
                            },
                            <DataViewMatrixNode>{
                                level: 1,
                                isSubtotal: true,
                                values: {
                                    0: { value: 48 }, 1: { value: 49, valueSourceIndex: 1 },
                                    2: { value: 50 }, 3: { value: 51, valueSourceIndex: 1 },
                                    4: { value: 98 }, 5: { value: 100, valueSourceIndex: 1 },
                                    6: { value: 54 }, 7: { value: 55, valueSourceIndex: 1 },
                                    8: { value: 56 }, 9: { value: 57, valueSourceIndex: 1 },
                                    10: { value: 110 }, 11: { value: 112, valueSourceIndex: 1 },
                                    12: { value: 208 }, 13: { value: 212, valueSourceIndex: 1 }
                                }
                            }
                        ]
                    },
                    {
                        level: 0,
                        value: "Oceania",
                        children: [
                            {
                                level: 1,
                                value: "Australia",
                                values: {
                                    0: { value: 60 }, 1: { value: 61, valueSourceIndex: 1 },
                                    2: { value: 62 }, 3: { value: 63, valueSourceIndex: 1 },
                                    4: { value: 122 }, 5: { value: 124, valueSourceIndex: 1 },
                                    6: { value: 66 }, 7: { value: 67, valueSourceIndex: 1 },
                                    8: { value: 68 }, 9: { value: 69, valueSourceIndex: 1 },
                                    10: { value: 134 }, 11: { value: 136, valueSourceIndex: 1 },
                                    12: { value: 256 }, 13: { value: 260, valueSourceIndex: 1 }
                                }
                            },
                            <DataViewMatrixNode>{
                                level: 1,
                                isSubtotal: true,
                                values: {
                                    0: { value: 60 }, 1: { value: 61, valueSourceIndex: 1 },
                                    2: { value: 62 }, 3: { value: 63, valueSourceIndex: 1 },
                                    4: { value: 122 }, 5: { value: 124, valueSourceIndex: 1 },
                                    6: { value: 66 }, 7: { value: 67, valueSourceIndex: 1 },
                                    8: { value: 68 }, 9: { value: 69, valueSourceIndex: 1 },
                                    10: { value: 134 }, 11: { value: 136, valueSourceIndex: 1 },
                                    12: { value: 256 }, 13: { value: 260, valueSourceIndex: 1 }
                                }
                            }
                        ]
                    },
                    <DataViewMatrixNode>{
                        level: 0,
                        isSubtotal: true,
                        values: {
                            0: { value: 180 }, 1: { value: 186, valueSourceIndex: 1 },
                            2: { value: 192 }, 3: { value: 198, valueSourceIndex: 1 },
                            4: { value: 372 }, 5: { value: 384, valueSourceIndex: 1 },
                            6: { value: 216 }, 7: { value: 222, valueSourceIndex: 1 },
                            8: { value: 228 }, 9: { value: 234, valueSourceIndex: 1 },
                            10: { value: 444 }, 11: { value: 456, valueSourceIndex: 1 },
                            12: { value: 816 }, 13: { value: 840, valueSourceIndex: 1 }
                        }
                    }
                ]
            },
            levels: [
                { sources: [rowGroupSource1] },
                { sources: [rowGroupSource2] }
            ]
        },
        columns: {
            root: {
                children: [
                    {
                        level: 0,
                        value: 1992,
                        children: [
                            {
                                level: 1,
                                value: "Silver",
                                children: [
                                    {
                                        level: 2
                                    },
                                    {
                                        level: 2,
                                        levelSourceIndex: 1
                                    }
                                ]
                            },
                            {
                                level: 1,
                                value: "Gold",
                                children: [
                                    {
                                        level: 2
                                    },
                                    {
                                        level: 2,
                                        levelSourceIndex: 1
                                    }
                                ]
                            },
                            <DataViewMatrixNode>{
                                level: 1,
                                isSubtotal: true,
                                children: [
                                    {
                                        level: 2,
                                        isSubtotal: true
                                    },
                                    {
                                        level: 2,
                                        levelSourceIndex: 1,
                                        isSubtotal: true
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        level: 0,
                        value: 1996,
                        children: [
                            {
                                level: 1,
                                value: "Silver",
                                children: [
                                    {
                                        level: 2
                                    },
                                    {
                                        level: 2,
                                        levelSourceIndex: 1
                                    }
                                ]
                            },
                            {
                                level: 1,
                                value: "Gold",
                                children: [
                                    {
                                        level: 2
                                    },
                                    {
                                        level: 2,
                                        levelSourceIndex: 1
                                    }
                                ]
                            },
                            <DataViewMatrixNode>{
                                level: 1,
                                isSubtotal: true,
                                children: [
                                    {
                                        level: 2,
                                        isSubtotal: true
                                    },
                                    {
                                        level: 2,
                                        levelSourceIndex: 1,
                                        isSubtotal: true
                                    }
                                ]
                            }
                        ]
                    },
                    <DataViewMatrixNode>{
                        level: 0,
                        isSubtotal: true,
                        children: [
                            {
                                level: 2,
                                isSubtotal: true
                            },
                            {
                                level: 2,
                                levelSourceIndex: 1,
                                isSubtotal: true
                            }
                        ]
                    }
                ]
            },
            levels: [
                { sources: [columnGroupSource1] },
                { sources: [columnGroupSource2] },
                { sources: [measureSource1, measureSource2] }
            ]
        },
        valueSources: [
            measureSource1,
            measureSource2
        ]
    };
    let matrixTwoRowGroupsTwoColumnGroupsTwoMeasuresAndTotalsDataView: powerbi.DataView = {
        metadata: {
            columns:
            [
                rowGroupSource1,
                rowGroupSource2,
                columnGroupSource1,
                columnGroupSource2,
                measureSource1,
                measureSource2
            ]
        },
        matrix: matrixTwoRowGroupsTwoColumnGroupsTwoMeasuresAndTotals
    };

    // ----------------------------
    // | RowGroup4 | true | false |
    // |-----------+--------------|
    // |      true |    1 |     2 |
    // |-----------|------|-------|
    // |     false |    3 |     4 |
    // |-----------|------|-------|
    // |           |    5 |     6 |
    // ----------------------------
    let matrixRowGroupColumnGroupWithBooleanAndNullOneMeasure: DataViewMatrix = {
        rows: {
            root: {
                children: [
                    {
                        level: 0,
                        value: true,
                        values: {
                            0: { value: 1 },
                            1: { value: 2 }
                        }
                    },
                    {
                        level: 0,
                        value: false,
                        values: {
                            0: { value: 3 },
                            1: { value: 4 }
                        }
                    },
                    {
                        level: 0,
                        values: {
                            0: { value: 5 },
                            1: { value: 6 }
                        }
                    }
                ]
            },
            levels: [{ sources: [rowGroupSource4] }]
        },
        columns: {
            root: {
                children: [
                    {
                        level: 0,
                        value: true
                    },
                    {
                        level: 0,
                        value: false
                    }
                ]
            },
            levels: [{ sources: [columnGroupSource4] }]
        },
        valueSources: [measureSource1]
    };

    // ------------------------------------
    // | RowGroup4 | true | false | Total |
    // |-----------+----------------------|
    // |      true |    1 |     2 |   3   |
    // |-----------|------|-------|-------|
    // |     false |    3 |     4 |   7   |
    // |-----------|------|-------|-------|
    // |           |    5 |     6 |   11  |
    // |-----------|------|-------|-------|
    // |    Total  |    9 |    12 |   21  |
    // |----------------------------------|
    let matrixRowGroupColumnGroupWithBooleanAndNullOneMeasureBothTotals: DataViewMatrix = {
        rows: {
            root: {
                children: [
                    {
                        level: 0,
                        value: true,
                        values: {
                            0: { value: 1 },
                            1: { value: 2 },
                            2: { value: 3 }
                        }
                    },
                    {
                        level: 0,
                        value: false,
                        values: {
                            0: { value: 3 },
                            1: { value: 4 },
                            2: { value: 7 }
                        }
                    },
                    {
                        level: 0,
                        values: {
                            0: { value: 5 },
                            1: { value: 6 },
                            2: { value: 11 }
                        }
                    },
                    {
                        level: 0,
                        isSubtotal: true,
                        values: {
                            0: { value: 5 },
                            1: { value: 6 },
                            2: { value: 21 }
                        }
                    }
                ]
            },
            levels: [{ sources: [rowGroupSource4] }]
        },
        columns: {
            root: {
                children: [
                    {
                        level: 0,
                        value: true
                    },
                    {
                        level: 0,
                        value: false
                    },
                    {
                        level: 0,
                        isSubtotal: true
                    }
                ]
            },
            levels: [{ sources: [columnGroupSource4] }]
        },
        valueSources: [measureSource1]
    };

    let matrixWithBigValues: DataViewMatrix = {
        rows: {
            root: {
                children: [
                    {
                        level: 0,
                        value: 'First header value to test in matrix, First header value to test in matrix',
                        values: {
                            0: { value: 5334543535 },
                            1: { value: 8634246535 },
                            2: { value: 6554438435 }
                        }
                    },
                    {
                        level: 0,
                        value: 'Second header value to test in matrix, Second header value to test in matrix',
                        values: {
                            0: { value: 8563425435 },
                            1: { value: 3455438435 },
                            2: { value: 7613454435 }
                        }
                    },
                    {
                        level: 0,
                        values: {
                            0: { value: 7654554435 },
                            1: { value: 1963425435 },
                            2: { value: 75414535435 }
                        }
                    },
                    {
                        level: 0,
                        isSubtotal: true,
                        values: {
                            0: { value: 6434246535 },
                            1: { value: 4422465435 },
                            2: { value: 4245543745 }
                        }
                    }
                ]
            },
            levels: [{ sources: [rowGroupSource4] }]
        },
        columns: {
            root: {
                children: [
                    {
                        level: 0,
                        value: true
                    },
                    {
                        level: 0,
                        value: false
                    },
                    {
                        level: 0,
                        isSubtotal: true
                    }
                ]
            },
            levels: [{ sources: [columnGroupSource4] }]
        },
        valueSources: [measureSource1]
    };

    function getMatrixColumnWidthDataView(matrix, objects): any {
        return {
            metadata: {
                columns:
                [
                    rowGroupSource1,
                    rowGroupSource2,
                    columnGroupSource1,
                    columnGroupSource2,
                    measureSource1,
                    measureSource2
                ],
                objects: objects
            },
            matrix: matrix
        };
    }

    function getMatrixColumnWidthDataView2(columns, matrix, objects): any {
        return {
            metadata: {
                columns: columns,
                objects: objects
            },
            matrix: matrix
        };
    }

    describe("Matrix", () => {

        it("Matrix registered capabilities", () => {
            expect(powerbi.visuals.visualPluginFactory.create().getPlugin("matrix").capabilities).toBe(matrixCapabilities);
        });

        it("Capabilities should include dataViewMappings", () => expect(matrixCapabilities.dataViewMappings).toBeDefined());

        it("Capabilities should include dataRoles", () => expect(matrixCapabilities.dataRoles).toBeDefined());

        it("Capabilities should allow measure only matrices", () => {
            let allowedProjections1: QueryProjectionsByRole =
                {
                    'Values': new QueryProjectionCollection([{ queryRef: "0" }])
                };
            let allowedProjections2: QueryProjectionsByRole =
                {
                    'Values': new QueryProjectionCollection([
                        { queryRef: "0" },
                        { queryRef: "1" },
                        { queryRef: "2" }
                    ])
                };

            let dataViewMappings = matrixCapabilities.dataViewMappings;
            let expectedDataViewMappings = _.cloneDeep(dataViewMappings);
            expectedDataViewMappings[0].conditions = [expectedDataViewMappings[0].conditions[0]];
            expect(DataViewAnalysis.chooseDataViewMappings(allowedProjections1, dataViewMappings, {}).supportedMappings).toEqual(expectedDataViewMappings);
            expect(DataViewAnalysis.chooseDataViewMappings(allowedProjections2, dataViewMappings, {}).supportedMappings).toEqual(expectedDataViewMappings);
        });

        it("Capabilities should allow matrices with row groups only", () => {
            let allowedProjections1: QueryProjectionsByRole =
                {
                    'Rows': new QueryProjectionCollection([{ queryRef: "0" }])
                };
            let allowedProjections2: QueryProjectionsByRole =
                {
                    'Rows': new QueryProjectionCollection([
                        { queryRef: "2" },
                        { queryRef: "0" },
                        { queryRef: "1" }
                    ])
                };

            let dataViewMappings = matrixCapabilities.dataViewMappings;
            let expectedDataViewMappings = _.cloneDeep(dataViewMappings);
            // with one item in the rows, it satisfies  { 'Rows': { min: 1 }, 'Columns': { min: 0 }, 'Values': { min: 0 } },
            expectedDataViewMappings[0].conditions = [expectedDataViewMappings[0].conditions[1]];

            expect(DataViewAnalysis.chooseDataViewMappings(allowedProjections1, dataViewMappings, {}).supportedMappings).toEqual(expectedDataViewMappings);
            expect(DataViewAnalysis.chooseDataViewMappings(allowedProjections2, dataViewMappings, {}).supportedMappings).toEqual(expectedDataViewMappings);
        });

        it("Capabilities should allow matrices with row groups and arbitrary number of measures", () => {
            let allowedProjections1: QueryProjectionsByRole =
                {
                    'Rows': new QueryProjectionCollection([{ queryRef: "0" }]),
                    'Values': new QueryProjectionCollection([
                        { queryRef: "1" },
                        { queryRef: "2" },
                        { queryRef: "3" }
                    ])
                };
            let allowedProjections2: QueryProjectionsByRole =
                {
                    'Rows': new QueryProjectionCollection([
                        { queryRef: "3" },
                        { queryRef: "2" },
                        { queryRef: "1" }
                    ]),
                    'Values': new QueryProjectionCollection([
                        { queryRef: "0" }
                    ])
                };
            let allowedProjections3: QueryProjectionsByRole =
                {
                    'Rows': new QueryProjectionCollection([
                        { queryRef: "1" },
                        { queryRef: "0" }
                    ]),
                    'Values': new QueryProjectionCollection([
                        { queryRef: "2" },
                        { queryRef: "3" }
                    ])
                };
            let allowedProjections4: QueryProjectionsByRole =
                {
                    'Rows': new QueryProjectionCollection([
                        { queryRef: "0" }
                    ]),
                    'Values': new QueryProjectionCollection([
                        { queryRef: "1" }
                    ])
                };

            let dataViewMappings = matrixCapabilities.dataViewMappings;
            let expectedDataViewMappings = _.cloneDeep(dataViewMappings);
            expectedDataViewMappings[0].conditions = [expectedDataViewMappings[0].conditions[1]];

            expect(DataViewAnalysis.chooseDataViewMappings(allowedProjections1, dataViewMappings, {}).supportedMappings).toEqual(expectedDataViewMappings);
            expect(DataViewAnalysis.chooseDataViewMappings(allowedProjections2, dataViewMappings, {}).supportedMappings).toEqual(expectedDataViewMappings);
            expect(DataViewAnalysis.chooseDataViewMappings(allowedProjections3, dataViewMappings, {}).supportedMappings).toEqual(expectedDataViewMappings);
            expect(DataViewAnalysis.chooseDataViewMappings(allowedProjections4, dataViewMappings, {}).supportedMappings).toEqual(expectedDataViewMappings);
        });

        it("Capabilities should allow matrices with column groups only", () => {
            let allowedProjections1: QueryProjectionsByRole =
                {
                    'Columns': new QueryProjectionCollection([{ queryRef: "0" }])
                };
            let allowedProjections2: QueryProjectionsByRole =
                {
                    'Columns': new QueryProjectionCollection([
                        { queryRef: "2" },
                        { queryRef: "0" },
                        { queryRef: "1" }
                    ])
                };

            var dataViewMappings = matrixCapabilities.dataViewMappings;
            let expectedDataViewMappings = _.cloneDeep(dataViewMappings);
            expectedDataViewMappings[0].conditions = [expectedDataViewMappings[0].conditions[2]];

            expect(DataViewAnalysis.chooseDataViewMappings(allowedProjections1, dataViewMappings, {}).supportedMappings).toEqual(expectedDataViewMappings);
            expect(DataViewAnalysis.chooseDataViewMappings(allowedProjections2, dataViewMappings, {}).supportedMappings).toEqual(expectedDataViewMappings);
        });

        it("Capabilities should allow matrices with column groups and measures", () => {
            let allowedProjections1: QueryProjectionsByRole =
                {
                    'Columns': new QueryProjectionCollection([{ queryRef: "1" }]),
                    'Values': new QueryProjectionCollection([
                        { queryRef: "2" },
                        { queryRef: "3" },
                        { queryRef: "0" }
                    ])
                };
            let allowedProjections2: QueryProjectionsByRole =
                {
                    'Columns': new QueryProjectionCollection([
                        { queryRef: "0" },
                        { queryRef: "2" },
                        { queryRef: "1" }
                    ]),
                    'Values': new QueryProjectionCollection([
                        { queryRef: "3" }
                    ])
                };
            let allowedProjections3: QueryProjectionsByRole =
                {
                    'Columns': new QueryProjectionCollection([
                        { queryRef: "3" },
                        { queryRef: "2" }
                    ]),
                    'Values': new QueryProjectionCollection([
                        { queryRef: "0" },
                        { queryRef: "1" }
                    ])
                };
            let allowedProjections4: QueryProjectionsByRole =
                {
                    'Columns': new QueryProjectionCollection([
                        { queryRef: "1" }
                    ]),
                    'Values': new QueryProjectionCollection([
                        { queryRef: "0" }
                    ])
                };

            var dataViewMappings = matrixCapabilities.dataViewMappings;
            let expectedDataViewMappings = _.cloneDeep(dataViewMappings);
            expectedDataViewMappings[0].conditions = [expectedDataViewMappings[0].conditions[2]];

            expect(DataViewAnalysis.chooseDataViewMappings(allowedProjections1, dataViewMappings, {}).supportedMappings).toEqual(expectedDataViewMappings);
            expect(DataViewAnalysis.chooseDataViewMappings(allowedProjections2, dataViewMappings, {}).supportedMappings).toEqual(expectedDataViewMappings);
            expect(DataViewAnalysis.chooseDataViewMappings(allowedProjections3, dataViewMappings, {}).supportedMappings).toEqual(expectedDataViewMappings);
            expect(DataViewAnalysis.chooseDataViewMappings(allowedProjections4, dataViewMappings, {}).supportedMappings).toEqual(expectedDataViewMappings);
        });

        it("Capabilities should allow matrices with row groups and arbitrary number of column groups and measures", () => {
            let allowedProjections1: QueryProjectionsByRole =
                {
                    'Rows': new QueryProjectionCollection([
                        { queryRef: "0" }
                    ]),
                    'Columns': new QueryProjectionCollection([
                        { queryRef: "1" }
                    ]),
                    'Values': new QueryProjectionCollection([
                        { queryRef: "2" }
                    ])
                };
            let allowedProjections2: QueryProjectionsByRole =
                {
                    'Rows': new QueryProjectionCollection([
                        { queryRef: "0" },
                        { queryRef: "1" }
                    ]),
                    'Columns': new QueryProjectionCollection([
                        { queryRef: "2" },
                        { queryRef: "3" }
                    ]),
                    'Values': new QueryProjectionCollection([
                        { queryRef: "4" }
                    ])
                };
            let allowedProjections3: QueryProjectionsByRole =
                {
                    'Rows': new QueryProjectionCollection([
                        { queryRef: "0" },
                        { queryRef: "1" }
                    ]),
                    'Columns': new QueryProjectionCollection([
                        { queryRef: "2" }
                    ]),
                    'Values': new QueryProjectionCollection([
                        { queryRef: "3" },
                        { queryRef: "4" }
                    ])
                };
            let allowedProjections4: QueryProjectionsByRole =
                {
                    'Rows': new QueryProjectionCollection([
                        { queryRef: "0" }
                    ]),
                    'Columns': new QueryProjectionCollection([
                        { queryRef: "1" },
                        { queryRef: "2" }
                    ]),
                    'Values': new QueryProjectionCollection([
                        { queryRef: "3" },
                        { queryRef: "4" }
                    ])
                };

            var dataViewMappings = matrixCapabilities.dataViewMappings;
            let expectedDataViewMapping = _.cloneDeep(dataViewMappings);
            expectedDataViewMapping[0].conditions.splice(0, 1);

            expect(DataViewAnalysis.chooseDataViewMappings(allowedProjections1, dataViewMappings, {}).supportedMappings).toEqual(expectedDataViewMapping);
            expect(DataViewAnalysis.chooseDataViewMappings(allowedProjections2, dataViewMappings, {}).supportedMappings).toEqual(expectedDataViewMapping);
            expect(DataViewAnalysis.chooseDataViewMappings(allowedProjections3, dataViewMappings, {}).supportedMappings).toEqual(expectedDataViewMapping);
            expect(DataViewAnalysis.chooseDataViewMappings(allowedProjections4, dataViewMappings, {}).supportedMappings).toEqual(expectedDataViewMapping);
        });

        it("Capabilities should suppressDefaultTitle", () => {
            expect(matrixCapabilities.suppressDefaultTitle).toBe(true);
        });

        it("FormatString property should match calculated", () => {
            expect(powerbi.data.DataViewObjectDescriptors.findFormatString(matrixCapabilities.objects)).toEqual(TablixUtils.TablixFormatStringProp);
        });

        it("CustomizeQuery picks up enabled row subtotals", () => {
            let objects: powerbi.DataViewObjects = {
                general: {
                    rowSubtotals: true,
                    columnSubtotals: false,
                    autoSizeColumnWidth: true,
                    textSize: 8,
                }
            };
            let dataViewMapping = createCompiledDataViewMapping(objects);

            Matrix.customizeQuery({
                dataViewMappings: [dataViewMapping]
            });

            expect((<CompiledDataViewRoleForMappingWithReduction>dataViewMapping.matrix.rows).for.in.subtotalType).toEqual(CompiledSubtotalType.After);
            expect(dataViewMapping.matrix.columns.for.in.subtotalType).toEqual(CompiledSubtotalType.None);
        });

        it("CustomizeQuery picks up enabled column subtotals", () => {
            let objects: powerbi.DataViewObjects = {
                general: {
                    rowSubtotals: false,
                    columnSubtotals: true,
                    autoSizeColumnWidth: true,
                    textSize: 8,
                }
            };
            let dataViewMapping = createCompiledDataViewMapping(objects);

            Matrix.customizeQuery({
                dataViewMappings: [dataViewMapping]
            });

            expect((<CompiledDataViewRoleForMappingWithReduction>dataViewMapping.matrix.rows).for.in.subtotalType).toEqual(CompiledSubtotalType.None);
            expect(dataViewMapping.matrix.columns.for.in.subtotalType).toEqual(CompiledSubtotalType.After);
        });

        it("CustomizeQuery picks up enabled row and column subtotals", () => {
            let objects: powerbi.DataViewObjects = {
                general: {
                    rowSubtotals: true,
                    columnSubtotals: true,
                    autoSizeColumnWidth: true,
                    textSize: 8,
                }
            };
            let dataViewMapping = createCompiledDataViewMapping(objects);

            Matrix.customizeQuery({
                dataViewMappings: [dataViewMapping]
            });

            expect((<CompiledDataViewRoleForMappingWithReduction>dataViewMapping.matrix.rows).for.in.subtotalType).toEqual(CompiledSubtotalType.After);
            expect(dataViewMapping.matrix.columns.for.in.subtotalType).toEqual(CompiledSubtotalType.After);
        });

        it("CustomizeQuery handles missing settings", () => {
            let dataViewMapping = createCompiledDataViewMapping();

            Matrix.customizeQuery({
                dataViewMappings: [dataViewMapping]
            });

            // Totals default to Enabled (After)
            expect((<CompiledDataViewRoleForMappingWithReduction>dataViewMapping.matrix.rows).for.in.subtotalType).toEqual(CompiledSubtotalType.After);
            expect(dataViewMapping.matrix.columns.for.in.subtotalType).toEqual(CompiledSubtotalType.After);
        });

        it("CustomizeQuery handles missing subtotal settings", () => {
            let objects: powerbi.DataViewObjects = {
                general: {
                    rowSubtotals: undefined,
                    columnSubtotals: undefined,
                    autoSizeColumnWidth: true,
                    textSize: 8,
                }
            };
            let dataViewMapping = createCompiledDataViewMapping(objects);

            Matrix.customizeQuery({
                dataViewMappings: [dataViewMapping]
            });

            // Totals default to Enabled (After)
            expect((<CompiledDataViewRoleForMappingWithReduction>dataViewMapping.matrix.rows).for.in.subtotalType).toEqual(CompiledSubtotalType.After);
            expect(dataViewMapping.matrix.columns.for.in.subtotalType).toEqual(CompiledSubtotalType.After);
        });

        it("CustomizeQuery modifies DataReduction if there are Columns", () => {
            let objects: powerbi.DataViewObjects = {
                general: {
                    rowSubtotals: true,
                    columnSubtotals: true,
                    autoSizeColumnWidth: true,
                    textSize: 8,
                }
            };
            let dataViewMapping = createCompiledDataViewMapping(objects, true);

            Matrix.customizeQuery({
                dataViewMappings: [dataViewMapping]
            });

            expect((<CompiledDataViewRoleForMappingWithReduction>dataViewMapping.matrix.rows).dataReductionAlgorithm).toExist();
            expect((<CompiledDataViewRoleForMappingWithReduction>dataViewMapping.matrix.rows).dataReductionAlgorithm.window).toExist();
            expect((<CompiledDataViewRoleForMappingWithReduction>dataViewMapping.matrix.rows).dataReductionAlgorithm.window.count).toExist();
            expect((<CompiledDataViewRoleForMappingWithReduction>dataViewMapping.matrix.rows).dataReductionAlgorithm.window.count).toEqual(100);
        });

        it("CustomizeQuery doesn't modify DataReduction if there are no Columns", () => {
            let objects: powerbi.DataViewObjects = {
                general: {
                    rowSubtotals: true,
                    columnSubtotals: true,
                    autoSizeColumnWidth: true,
                    textSize: 8,
                }
            };
            let dataViewMapping = createCompiledDataViewMapping(objects, false);

            Matrix.customizeQuery({
                dataViewMappings: [dataViewMapping]
            });

            expect((<CompiledDataViewRoleForMappingWithReduction>dataViewMapping.matrix.rows).dataReductionAlgorithm).toExist();
            expect((<CompiledDataViewRoleForMappingWithReduction>dataViewMapping.matrix.rows).dataReductionAlgorithm.window).toExist();
            expect((<CompiledDataViewRoleForMappingWithReduction>dataViewMapping.matrix.rows).dataReductionAlgorithm.window.count).toExist();
            expect((<CompiledDataViewRoleForMappingWithReduction>dataViewMapping.matrix.rows).dataReductionAlgorithm.window.count).toEqual(500);
        });

        function createCompiledDataViewMapping(objects?: powerbi.DataViewObjects, includeColumns: boolean = false): CompiledDataViewMapping {
            let columnItems: powerbi.data.CompiledDataViewRoleItem[] = [];

            if (includeColumns) {
                columnItems.push({ queryName: 'table.field' });
            }

            return {
                metadata: {
                    objects: objects
                },
                matrix: {
                    rows: {
                        for: {
                            in: { role: "Rows", items: [] }
                        },
                        dataReductionAlgorithm: {
                            window: {
                                count: 500
                            }
                        }
                    },
                    columns: {
                        for: {
                            in: { role: "Columns", items: columnItems }
                        }
                    }
                }
            };
        }
    });

    describe("Tablix control tests", () => {

        it("touch disabled", () => {

            let layoutKind = powerbi.visuals.controls.TablixLayoutKind.Canvas;
            let matrix = matrixOneMeasure;
            let navigator = powerbi.visuals.createMatrixHierarchyNavigator(matrix, valueFormatter.formatValueColumn);
            let binder = new powerbi.visuals.MatrixBinder(navigator, { layoutKind: layoutKind });
            let layoutManager = powerbi.visuals.controls.internal.CanvasTablixLayoutManager.createLayoutManager(binder, undefined);
            let parent = document.createElement("div");
            let tablixControl = new TablixControl(navigator, layoutManager, binder, parent, { interactive: true, enableTouchSupport: false });

            expect(tablixControl["_touchManager"]).toBeUndefined();
        });
    });

    describe("Matrix hierarchy navigator tests", () => {

        describe("getDepth", () => {

            it("returns the correct depth for an empty hierarchy", () => {
                let matrix = _.cloneDeep(matrixThreeRowGroupsOneGroupInstance);
                matrix.columns.root = {};
                matrix.rows.root = {};
                let navigator = powerbi.visuals.createMatrixHierarchyNavigator(matrix, valueFormatter.formatValueColumn);

                expect(navigator.getRowHierarchyDepth()).toBe(3);
                expect(navigator.getColumnHierarchyDepth()).toBe(1);
            });

            it("returns the correct depth for a measure only hierarchy", () => {
                let matrix = _.cloneDeep(matrixOneMeasure);
                matrix.columns.root = {};
                matrix.rows.root = {};
                let navigator = powerbi.visuals.createMatrixHierarchyNavigator(matrix, valueFormatter.formatValueColumn);

                expect(navigator.getRowHierarchyDepth()).toBe(1);
                expect(navigator.getColumnHierarchyDepth()).toBe(1);

            });

            it("returns the correct depth for group only hierarchy", () => {
                let matrix = matrixThreeMeasuresThreeRowGroups;
                let navigator = powerbi.visuals.createMatrixHierarchyNavigator(matrix, valueFormatter.formatValueColumn);

                expect(navigator.getRowHierarchyDepth()).toBe(3);
                expect(navigator.getColumnHierarchyDepth()).toBe(1);
            });

            it("returns the correct depth for group and measure hierarchy", () => {
                let matrix = matrixTwoRowGroupsTwoColumnGroupsTwoMeasures;
                let navigator = powerbi.visuals.createMatrixHierarchyNavigator(matrix, valueFormatter.formatValueColumn);
                
                expect(navigator.getRowHierarchyDepth()).toBe(2);
                expect(navigator.getColumnHierarchyDepth()).toBe(3);
            });
        });

        describe("getLeafCount", () => {

            it("returns the right leaf count for a placeholder hierarchy", () => {
                let matrix = matrixOneMeasure;
                let rowHierarchy = matrix.rows.root.children;
                let navigator = powerbi.visuals.createMatrixHierarchyNavigator(matrix, valueFormatter.formatValueColumn);

                expect(navigator.getLeafCount(rowHierarchy)).toBe(1);
            });

            it("returns the right leaf count for an empty hierarchy", () => {
                let matrix = matrixThreeRowGroupsOneGroupInstance;
                let columnHierarchy = matrix.columns.root.children;
                let navigator = powerbi.visuals.createMatrixHierarchyNavigator(matrix, valueFormatter.formatValueColumn);

                expect(navigator.getLeafCount(columnHierarchy)).toBe(0);
            });

            it("returns the right leaf count for a one level deep hierarchy", () => {
                let matrix = matrixOneMeasureOneRowGroupOneGroupInstance;
                let rowHierarchy = matrix.rows.root.children;
                let navigator = powerbi.visuals.createMatrixHierarchyNavigator(matrix, valueFormatter.formatValueColumn);

                expect(navigator.getLeafCount(rowHierarchy)).toBe(1);
            });

            it("returns the right leaf count for a three level deep hierarchy", () => {
                let matrix = matrixTwoRowGroupsTwoColumnGroupsTwoMeasures;
                let columnHierarchy = matrix.columns.root.children;
                let navigator = powerbi.visuals.createMatrixHierarchyNavigator(matrix, valueFormatter.formatValueColumn);

                expect(navigator.getLeafCount(columnHierarchy)).toBe(12);
            });
        });

        describe("getLeafAt", () => {

            it("returns the correct leaf from a placeholder hierarchy", () => {
                let matrix = matrixOneMeasureOneColumnGroupOneGroupInstance;
                let rowHierarchy = matrix.rows.root.children;
                let rowHierarchyItem = rowHierarchy[0];
                let navigator = powerbi.visuals.createMatrixHierarchyNavigator(matrix, valueFormatter.formatValueColumn);

                expect(navigator.getLeafAt(rowHierarchy, 0)).toBe(rowHierarchyItem);
            });

            it("returns the correct leaf from a one level deep hierarchy", () => {
                let matrix = matrixOneMeasureOneColumnGroupOneGroupInstance;
                let columnHierarchy = matrix.columns.root.children;
                let columnHierarchyItem = columnHierarchy[0];
                let navigator = powerbi.visuals.createMatrixHierarchyNavigator(matrix, valueFormatter.formatValueColumn);

                expect(navigator.getLeafAt(columnHierarchy, 0)).toBe(columnHierarchyItem);
            });

            it("returns the correct leaf from a three level deep hierarchy", () => {
                let matrix = matrixThreeMeasuresThreeRowGroups;
                let rowHierarchy = matrix.rows.root.children;
                let rowHierarchyItem = rowHierarchy[1].children[1].children[1];
                let navigator = powerbi.visuals.createMatrixHierarchyNavigator(matrix, valueFormatter.formatValueColumn);

                expect(navigator.getLeafAt(rowHierarchy, 7)).toBe(rowHierarchyItem);
            });
        });

        describe("getParent", () => {

            it("returns null for outermost node in a one level deep hierarchy", () => {
                let matrix = matrixOneMeasureOneRowGroupOneGroupInstance;
                let node = matrix.columns.root.children[0];
                let navigator = powerbi.visuals.createMatrixHierarchyNavigator(matrix, valueFormatter.formatValueColumn);

                expect(navigator.getParent(node)).toBeNull();
            });

            it("returns null for outermost node in a three level deep hierarchy", () => {
                let matrix = matrixThreeRowGroupsThreeColumnGroupsOneInstance;
                let node = matrix.rows.root.children[0];
                let navigator = powerbi.visuals.createMatrixHierarchyNavigator(matrix, valueFormatter.formatValueColumn);

                expect(navigator.getParent(node)).toBeNull();
            });

            it("returns the correct parent for an innermost node in a three level deep hierarchy", () => {
                let matrix = matrixTwoRowGroupsTwoColumnGroupsTwoMeasures;
                let parentNode = matrix.columns.root.children[1].children[1];
                let node = parentNode.children[1];
                let navigator = powerbi.visuals.createMatrixHierarchyNavigator(matrix, valueFormatter.formatValueColumn);

                expect(navigator.getParent(node)).toBe(parentNode);
            });

            it("returns the correct parent for a non-innermost node in a three level deep hierarchy", () => {
                let matrix = matrixTwoRowGroupsTwoColumnGroupsTwoMeasures;
                let parentNode = matrix.columns.root.children[0];
                let node = parentNode.children[1];
                let navigator = powerbi.visuals.createMatrixHierarchyNavigator(matrix, valueFormatter.formatValueColumn);

                expect(navigator.getParent(node)).toBe(parentNode);
            });
        });

        describe("getIndex", () => {

            it("returns the correct index for outermost nodes", () => {
                let matrix = matrixTwoRowGroupsTwoColumnGroupsTwoMeasures;
                let rowHierarchy = matrix.rows.root.children;
                let navigator = powerbi.visuals.createMatrixHierarchyNavigator(matrix, valueFormatter.formatValueColumn);

                expect(navigator.getIndex(rowHierarchy[0])).toBe(0);
                expect(navigator.getIndex(rowHierarchy[1])).toBe(1);
                expect(navigator.getIndex(rowHierarchy[2])).toBe(2);
                expect(navigator.getIndex(rowHierarchy[3])).toBe(3);
            });

            it("returns the correct index for innermost nodes", () => {
                let matrix = matrixThreeRowGroups;
                let rowHierarchy = matrix.rows.root.children;
                let rowHierarchyItem0 = rowHierarchy[0].children[0].children[0];
                let rowHierarchyItem1 = rowHierarchy[0].children[0].children[1];
                let rowHierarchyItemAgain0 = rowHierarchy[1].children[1].children[0];
                let rowHierarchyItemAgain1 = rowHierarchy[1].children[1].children[1];
                let navigator = powerbi.visuals.createMatrixHierarchyNavigator(matrix, valueFormatter.formatValueColumn);

                expect(navigator.getIndex(rowHierarchyItem0)).toBe(0);
                expect(navigator.getIndex(rowHierarchyItem1)).toBe(1);
                expect(navigator.getIndex(rowHierarchyItemAgain0)).toBe(0);
                expect(navigator.getIndex(rowHierarchyItemAgain1)).toBe(1);
            });

            it("returns the correct index for non-innermost nodes", () => {
                let matrix = matrixThreeRowGroups;
                let rowHierarchy = matrix.rows.root.children;
                let rowHierarchyItem0 = rowHierarchy[0].children[0];
                let rowHierarchyItem1 = rowHierarchy[0].children[1];
                let rowHierarchyItemAgain0 = rowHierarchy[1].children[0];
                let rowHierarchyItemAgain1 = rowHierarchy[1].children[1];
                let navigator = powerbi.visuals.createMatrixHierarchyNavigator(matrix, valueFormatter.formatValueColumn);

                expect(navigator.getIndex(rowHierarchyItem0)).toBe(0);
                expect(navigator.getIndex(rowHierarchyItem1)).toBe(1);
                expect(navigator.getIndex(rowHierarchyItemAgain0)).toBe(0);
                expect(navigator.getIndex(rowHierarchyItemAgain1)).toBe(1);
            });
        });

        describe("isLeaf", () => {

            it("returns true for nodes in a one level deep placeholder hierarchy", () => {
                let matrix = matrixThreeMeasures;
                let rowHierarchy = matrix.rows.root.children;
                let navigator = powerbi.visuals.createMatrixHierarchyNavigator(matrix, valueFormatter.formatValueColumn);

                expect(navigator.isLeaf(rowHierarchy[0])).toBeTruthy();
            });

            it("returns true for nodes in a one level deep hierarchy", () => {
                let matrix = matrixOneMeasureOneRowGroupOneGroupInstance;
                let rowHierarchy = matrix.rows.root.children;
                let navigator = powerbi.visuals.createMatrixHierarchyNavigator(matrix, valueFormatter.formatValueColumn);

                expect(navigator.isLeaf(rowHierarchy[0])).toBeTruthy();
            });

            it("returns true for innermost nodes in a three level deep hierarchy", () => {
                let matrix = matrixTwoRowGroupsTwoColumnGroupsTwoMeasures;
                let columnHierarchy = matrix.columns.root.children;
                let columnHierarchyItem = columnHierarchy[1].children[2].children[0];
                let navigator = powerbi.visuals.createMatrixHierarchyNavigator(matrix, valueFormatter.formatValueColumn);

                expect(navigator.isLeaf(columnHierarchyItem)).toBeTruthy();
            });

            it("returns false for outermost nodes in a three level deep hierarchy", () => {
                let matrix = matrixTwoRowGroupsTwoColumnGroupsTwoMeasures;
                let columnHierarchy = matrix.columns.root.children;
                let navigator = powerbi.visuals.createMatrixHierarchyNavigator(matrix, valueFormatter.formatValueColumn);

                expect(navigator.isLeaf(columnHierarchy[0])).toBeFalsy();
            });

            it("returns false for non-innermost nodes in a three level deep hierarchy", () => {
                let matrix = matrixTwoRowGroupsTwoColumnGroupsTwoMeasures;
                let columnHierarchy = matrix.columns.root.children;
                let columnHierarchyItem = columnHierarchy[0].children[1];
                let navigator = powerbi.visuals.createMatrixHierarchyNavigator(matrix, valueFormatter.formatValueColumn);

                expect(navigator.isLeaf(columnHierarchyItem)).toBeFalsy();
            });
        });

        describe("isRowHierarchyLeaf", () => {    
            // TODO
        });

        describe("isColumnHierarchyLeaf", () => {
            // TODO
        });

        describe("isLastItem", () => {

            it("returns true if the last item is the only item in the collection", () => {
                let matrix = matrixOneRowGroupOneColumnGroupOneInstance;
                let items = matrix.rows.root.children;
                let navigator = powerbi.visuals.createMatrixHierarchyNavigator(matrix, valueFormatter.formatValueColumn);

                expect(navigator.isLastItem(items[0], items)).toBeTruthy();
            });

            it("returns true if the last item is the last item in its parents collection, but not on the level", () => {
                let matrix = matrixThreeMeasuresThreeRowGroups;
                let items = matrix.rows.root.children[0].children;
                let navigator = powerbi.visuals.createMatrixHierarchyNavigator(matrix, valueFormatter.formatValueColumn);

                expect(navigator.isLastItem(items[1], items)).toBeTruthy();
            });

            it("returns false if the item is not the last item in its parents collection", () => {
                let matrix = matrixThreeMeasuresThreeRowGroups;
                let items = matrix.rows.root.children[1].children[1].children;
                let navigator = powerbi.visuals.createMatrixHierarchyNavigator(matrix, valueFormatter.formatValueColumn);

                expect(navigator.isLastItem(items[0], items)).toBeFalsy();
            });
        });

        describe("getChildren", () => {

            it("returns undefined for leaf node", () => {
                let matrix = matrixOneMeasureOneColumnGroupOneGroupInstance;
                let node = matrix.columns.root.children[0];
                let navigator = powerbi.visuals.createMatrixHierarchyNavigator(matrix, valueFormatter.formatValueColumn);

                expect(navigator.getChildren(node)).toBeUndefined();
            });

            it("returns the correct collection of children", () => {
                let matrix = matrixThreeMeasuresThreeRowGroups;
                let node = matrix.rows.root.children[0];
                let navigator = powerbi.visuals.createMatrixHierarchyNavigator(matrix, valueFormatter.formatValueColumn);

                expect(navigator.getChildren(node)).toBe(node.children);
            });
        });

        describe("getCount", () => {

            it("returns zero if there are no children", () => {
                let matrix = matrixThreeRowGroupsOneGroupInstance;
                let columnHierarchy = matrix.columns.root.children;
                let navigator = powerbi.visuals.createMatrixHierarchyNavigator(matrix, valueFormatter.formatValueColumn);

                expect(navigator.getCount(columnHierarchy)).toBe(0);
            });

            it("returns the length of the children array", () => {
                let matrix = matrixThreeMeasuresThreeRowGroups;
                let columnHierarchy = matrix.columns.root.children;
                let navigator = powerbi.visuals.createMatrixHierarchyNavigator(matrix, valueFormatter.formatValueColumn);

                expect(navigator.getCount(columnHierarchy)).toBe(3);
            });
        });

        describe("getAt", () => {

            it("returns undefined if index is out of bounds", () => {
                let matrix = matrixThreeRowGroupsOneGroupInstance;
                let columnHierarchy = matrix.columns.root.children;
                let navigator = powerbi.visuals.createMatrixHierarchyNavigator(matrix, valueFormatter.formatValueColumn);

                expect(navigator.getAt(columnHierarchy, 0)).toBeUndefined();
            });

            it("returns the right node from the hierarchy", () => {
                let matrix = matrixThreeRowGroups;
                let rowHierarchy = matrix.rows.root.children;
                let navigator = powerbi.visuals.createMatrixHierarchyNavigator(matrix, valueFormatter.formatValueColumn);

                expect(navigator.getAt(rowHierarchy, 1)).toBe(rowHierarchy[1]);
            });

            it("returns the right node from the children collection", () => {
                let matrix = matrixThreeRowGroups;
                let children = matrix.rows.root.children[0].children;
                let navigator = powerbi.visuals.createMatrixHierarchyNavigator(matrix, valueFormatter.formatValueColumn);

                expect(navigator.getAt(children, 1)).toBe(children[1]);
            });
        });

        describe("getLevel", () => {

            it("returns undefined for root node", () => {
                let matrix = matrixThreeRowGroupsThreeColumnGroupsOneInstance;
                let rootNode = matrix.columns.root;
                let navigator = powerbi.visuals.createMatrixHierarchyNavigator(matrix, valueFormatter.formatValueColumn);

                expect(navigator.getLevel(rootNode)).toBeUndefined();
            });

            it("returns zero for outermost nodes", () => {
                let matrix = matrixThreeRowGroupsThreeColumnGroupsOneInstance;
                let node = matrix.rows.root.children[0];
                let navigator = powerbi.visuals.createMatrixHierarchyNavigator(matrix, valueFormatter.formatValueColumn);

                expect(navigator.getLevel(node)).toBe(0);
            });

            it("returns one for nodes on the second level", () => {
                let matrix = matrixTwoRowGroupsTwoColumnGroupsTwoMeasures;
                let nodes = matrix.rows.root.children[1].children;
                let navigator = powerbi.visuals.createMatrixHierarchyNavigator(matrix, valueFormatter.formatValueColumn);

                expect(navigator.getLevel(nodes[0])).toBe(1);
                expect(navigator.getLevel(nodes[1])).toBe(1);
            });
        });

        describe("getIntersection", () => {

            it("returns values in the intersection", () => {
                let matrix = matrixThreeMeasuresThreeRowGroups;
                let rowHierarchy = matrix.rows.root.children;
                let columnHierarchy = matrix.columns.root.children;
                let level2RowItems: MatrixVisualNode[] = [
                    rowHierarchy[0].children[0],
                    rowHierarchy[0].children[1],
                    rowHierarchy[1].children[0],
                    rowHierarchy[1].children[1]
                ];
                let level3RowItems: MatrixVisualNode[] = [
                    level2RowItems[0].children[0],
                    level2RowItems[0].children[1],
                    level2RowItems[1].children[0],
                    level2RowItems[1].children[1],
                    level2RowItems[2].children[0],
                    level2RowItems[2].children[1],
                    level2RowItems[3].children[0],
                    level2RowItems[3].children[1]
                ];
                let level1ColumnItems: MatrixVisualNode[] = [
                    columnHierarchy[0],
                    columnHierarchy[1],
                    columnHierarchy[2]
                ];

                let expectedValues: string[][] = [
                    ["1,000.00", "1,001.00", "1,002.00"],
                    ["1,010.00", "1,011.00", "1,012.00"],
                    ["1,100.00", "1,101.00", "1,102.00"],
                    ["1,110.00", "1,111.00", "1,112.00"],
                    ["2,000.00", "2,001.00", "2,002.00"],
                    ["2,010.00", "2,011.00", "2,012.00"],
                    ["2,100.00", "2,101.00", "2,102.00"],
                    ["2,110.00", "2,111.00", "2,112.00"]
                ];

                let navigator = powerbi.visuals.createMatrixHierarchyNavigator(matrix, valueFormatter.formatValueColumn);
                validateIntersections(navigator, level3RowItems, level1ColumnItems, expectedValues);
            });

            it("returns empty string if there are no measures", () => {
                let matrix = matrixThreeRowGroupsThreeColumnGroups;
                let rowHierarchy = matrix.rows.root.children;
                let rowLeaves = rowHierarchy[0].children[0].children.concat(rowHierarchy[0].children[1].children);
                let columnHierarchy = matrix.columns.root.children;
                let columnLeaves = columnHierarchy[0].children[0].children.concat(columnHierarchy[0].children[1]);

                let expectedValues: string[][] = [
                    ["", "", ""],
                    ["", "", ""],
                    ["", "", ""]
                ];

                let navigator = powerbi.visuals.createMatrixHierarchyNavigator(matrix, valueFormatter.formatValueColumn);
                validateIntersections(navigator, rowLeaves, columnLeaves, expectedValues);
            });

            function validateIntersections(navigator: MatrixHierarchyNavigator, rowLeaves: MatrixVisualNode[], columnLeaves: MatrixVisualNode[], expectedValues: string[][]): void {
                let result: string[][] = [];

                for (let i = 0, ilen = rowLeaves.length; i < ilen; i++) {
                    result[i] = [];
                    for (let j = 0, jlen = columnLeaves.length; j < jlen; j++)
                        result[i][j] = navigator.getIntersection(rowLeaves[i], columnLeaves[j]).textContent || '';
                }

                expect(result).toEqual(expectedValues);
            }
        });

        describe("getCorer", () => {

            it("returns empty value for the upper left cell of a 3x3 corner", () => {
                let matrix = matrixThreeRowGroupsThreeColumnGroups;
                let navigator = powerbi.visuals.createMatrixHierarchyNavigator(matrix, valueFormatter.formatValueColumn);

                expect(navigator.getCorner(0, 0).metadata).toBeNull();
                expect(navigator.getCorner(0, 0).isColumnHeaderLeaf).toBeFalsy();
            });

            it("returns row header for the lower left cell of a 3x3 corner", () => {
                let matrix = matrixThreeRowGroupsThreeColumnGroups;
                let navigator = powerbi.visuals.createMatrixHierarchyNavigator(matrix, valueFormatter.formatValueColumn);

                expect(navigator.getCorner(0, 2).metadata.displayName).toBe("RowGroup1");
                expect(navigator.getCorner(0, 2).isColumnHeaderLeaf).toBeTruthy();
            });

            it("returns column header for the upper right cell of a 3x3 corner", () => {
                let matrix = matrixThreeRowGroupsThreeColumnGroups;
                let navigator = powerbi.visuals.createMatrixHierarchyNavigator(matrix, valueFormatter.formatValueColumn);

                expect(navigator.getCorner(2, 0).metadata.displayName).toBe("ColGroup1");
                expect(navigator.getCorner(2, 0).isColumnHeaderLeaf).toBeFalsy();
            });

            it("returns row header for the lower right cell of a 3x3 corner", () => {
                let matrix = matrixThreeRowGroupsThreeColumnGroups;
                let navigator = powerbi.visuals.createMatrixHierarchyNavigator(matrix, valueFormatter.formatValueColumn);

                expect(navigator.getCorner(2, 2).metadata.displayName).toBe("RowGroup3");
                expect(navigator.getCorner(2, 2).isColumnHeaderLeaf).toBeTruthy();
            });
        });

        describe("headerItemEquals", () => {

            it("returns true if the two items are the same", () => {
                let matrix = matrixOneRowGroupOneColumnGroupOneGroupInstance;
                let rowNode = matrix.rows.root.children[0];
                let columnNode = matrix.columns.root.children[0];
                let navigator = powerbi.visuals.createMatrixHierarchyNavigator(matrix, valueFormatter.formatValueColumn);

                expect(navigator.headerItemEquals(rowNode, rowNode)).toBeTruthy();
                expect(navigator.headerItemEquals(columnNode, columnNode)).toBeTruthy();
            });

            it("returns false if the two items are not same even if they have the same content", () => {
                let matrix = matrixOneRowGroupOneColumnGroupOneGroupInstance;
                let rowNode = matrix.rows.root.children[0];
                let columnNode = matrix.columns.root.children[0];
                let navigator = powerbi.visuals.createMatrixHierarchyNavigator(matrix, valueFormatter.formatValueColumn);

                expect(navigator.headerItemEquals(rowNode, columnNode)).toBeFalsy();
                expect(navigator.headerItemEquals(columnNode, rowNode)).toBeFalsy();
            });
        });

        describe("bodyCellItemEquals", () => {

            it("returns true if the two items are the same", () => {
                let dataView = matrixTwoMeasuresDataView;
                let navigator = powerbi.visuals.createMatrixHierarchyNavigator(dataView.matrix, valueFormatter.formatValueColumn);
                let cell1 = navigator.getIntersection(dataView.matrix.rows.root.children[0], dataView.matrix.columns.root.children[0]);
                expect(cell1).toBeDefined();
                let cell2 = navigator.getIntersection(dataView.matrix.rows.root.children[0], dataView.matrix.columns.root.children[0]);
                expect(cell2).toBeDefined();

                expect(navigator.bodyCellItemEquals(cell1, cell2)).toBeTruthy();
            });

            it("returns false if the two items are not same", () => {
                let dataView = matrixTwoMeasuresDataView;
                let navigator = powerbi.visuals.createMatrixHierarchyNavigator(dataView.matrix, valueFormatter.formatValueColumn);
                let cell1 = navigator.getIntersection(dataView.matrix.rows.root.children[0], dataView.matrix.columns.root.children[0]);
                expect(cell1).toBeDefined();
                let cell2 = navigator.getIntersection(dataView.matrix.rows.root.children[0], dataView.matrix.columns.root.children[1]);
                expect(cell2).toBeDefined();

                expect(navigator.bodyCellItemEquals(cell1, cell2)).toBeFalsy();
            });
        });
    });

    describe("Matrix logic", () => {
        let v: powerbi.IVisual;

        beforeEach(() => {
            v = powerbi.visuals.visualPluginFactory.create().getPlugin("matrix").create();
            let element = powerbitests.helpers.testDom("500", "500");
            element["visible"] = () => { return true; };
            v.init({
                element: element,
                host: mocks.createVisualHostServices(),
                style: powerbi.visuals.visualStyles.create(),
                viewport: {
                    height: 500,
                    width: 500
                },
                animation: { transitionImmediate: true }
            });
        });

        it("loadMoreData calls control refresh", () => {    
            //Passing a Dataview with Create Operation to ensure previousDataView is not null when performing Append Operation
            v.onDataChanged({
                dataViews: [matrixOneMeasureDataView],
                operationKind: powerbi.VisualDataChangeOperationKind.Create
            });

            let nav: any = v["hierarchyNavigator"];
            let control = v["tablixControl"];
            let navSpy = spyOn(nav, "update");
            let controlSpy = spyOn(control, "refresh");

            v.onDataChanged({
                dataViews: [matrixOneMeasureDataView],
                operationKind: powerbi.VisualDataChangeOperationKind.Append
            });

            expect(navSpy).toHaveBeenCalled();
            expect(controlSpy).toHaveBeenCalled();
        });

        it("loadMore would refresh the tablix model", (done) => {
            v.onDataChanged({
                dataViews: [matrixOneMeasureOneRowGroupOneGroupInstanceDataView],
                operationKind: powerbi.VisualDataChangeOperationKind.Create
            });

            v.onDataChanged({
                dataViews: [matrixOneMeasureOneRowGroupTwoGroupInstancesDataView],
                operationKind: powerbi.VisualDataChangeOperationKind.Append
            });

            //Checking it's rendering 2 rows
            setTimeout(() => {
                expect($('.bi-matrix-body-cell').length).toBe(matrixOneMeasureOneRowGroupTwoGroupInstancesDataView.matrix.rows.root.children.length);
                done();
            }, DefaultWaitForRender);
        });

        it("needsMoreData waitingForData", () => {
            let matrix = matrixThreeRowGroups;

            v.onDataChanged({
                dataViews: [{
                    metadata: { columns: [rowGroupSource1, rowGroupSource2, rowGroupSource3], segment: {} },
                    matrix: matrix
                }]
            });

            v["waitingForData"] = true;
            let matrixVisual: Matrix = <Matrix>v;
            let lastLeaf = matrix.rows.root.children[1].children[1].children[1];
            let result = matrixVisual.needsMoreData(lastLeaf);

            expect(result).toBe(false);
        });

        it("needsMoreData notLeaf", () => {

            let matrix = matrixThreeRowGroups;

            v.onDataChanged({
                dataViews: [{
                    metadata: { columns: [rowGroupSource1, rowGroupSource2, rowGroupSource3], segment: {} },
                    matrix: matrix
                }]
            });

            let matrixVisual: Matrix = <Matrix>v;
            let item = matrix.rows.root.children[1].children[1];
            let result = matrixVisual.needsMoreData(item);

            expect(result).toBe(false);
        });

        it("needsMoreData segmentComplete", () => {

            let matrix = matrixThreeRowGroups;

            v.onDataChanged({
                dataViews: [{
                    metadata: { columns: [rowGroupSource1, rowGroupSource2, rowGroupSource3] },
                    matrix: matrix
                }]
            });

            let matrixVisual: Matrix = <Matrix>v;
            let lastLeaf = matrix.rows.root.children[1].children[1].children[1];
            let result = matrixVisual.needsMoreData(lastLeaf);

            expect(result).toBe(false);
        });

        it("needsMoreData belowThreshold", () => {

            let matrix = matrixTwoRowGroupsTwoColumnGroupsTwoMeasures;

            v.onDataChanged({
                dataViews: [matrixTwoRowGroupsTwoColumnGroupsTwoMeasuresDataView]
            });

            let matrixVisual: Matrix = <Matrix>v;
            let leaf = matrix.rows.root.children[0].children[0];
            let result = matrixVisual.needsMoreData(leaf);

            expect(result).toBe(false);
        });

        it("needsMoreData aboveThreshold", () => {

            v.onDataChanged({
                dataViews: [matrixThreeMeasuresThreeRowGroupsDataView]
            });

            let matrixVisual: Matrix = <Matrix>v;
            let leaf = matrixThreeMeasuresThreeRowGroups.rows.root.children[1].children[1].children[1];
            let result = matrixVisual.needsMoreData(leaf);

            expect(result).toBe(true);
        });

        it("bindRowHeader callback", () => {
            let callBackCalled = false;
            let binderOptions = {
                onBindRowHeader: () => { callBackCalled = true; },
                layoutKind: powerbi.visuals.controls.TablixLayoutKind.Canvas
            };

            let binder = new powerbi.visuals.MatrixBinder(null, binderOptions);
            binder.bindRowHeader({}, {
                type: null, item: null, colSpan: 0, rowSpan: 0, textAlign: "",
                extension: { contentHost: { textContent: null }, setContainerStyle: () => { } }
            });

            expect(callBackCalled).toBe(true);
        });

        it("unbindColumnHeader multimeasure not sortable", () => {
            let binderOptions = {
                onBindRowHeader: () => { },
                onColumnHeaderClick: () => { },
                layoutKind: powerbi.visuals.controls.TablixLayoutKind.Canvas
            };
            let hierarchyNavigator = powerbi.visuals.createMatrixHierarchyNavigator(matrixTwoRowGroupsTwoColumnGroupsTwoMeasures, powerbi.visuals.valueFormatter.formatValueColumn);
            let binder = new powerbi.visuals.MatrixBinder(hierarchyNavigator, binderOptions);
            let unregisterCalled: boolean = false;
            binder.unbindColumnHeader({ isSubtotal: true }, {
                type: null, item: null, colSpan: 0, rowSpan: 0, textAlign: "",
                extension: {
                    contentHost: { textContent: null },
                    setContainerStyle: () => { },
                    clearTextAndTooltip: () => { },
                    clearContainerStyle: () => { },
                    unregisterClickHandler: () => { unregisterCalled = true; }
                }
            });

            expect(unregisterCalled).toBe(false);
        });

        it("enumerateObjectInstances general both totals off", () => {
            let matrix = matrixRowGroupColumnGroupWithBooleanAndNullOneMeasure;
            v.onDataChanged({
                dataViews: [{
                    metadata: {
                        columns:
                        [
                            rowGroupSource4,
                            columnGroupSource4,
                            measureSource1
                        ],
                        objects: {
                            general: {
                                rowSubtotals: false,
                                columnSubtotals: false,
                                autoSizeColumnWidth: true,
                            }
                        }
                    },
                    matrix: matrix
                }]
            });

            let objects = v.enumerateObjectInstances({ objectName: "general" });
            expect(objects).toEqual({
                instances: [{
                    selector: null,
                    objectName: "general",
                    properties: {
                        autoSizeColumnWidth: true,
                        textSize: 8,
                        rowSubtotals: false,
                        columnSubtotals: false,
                        //TODO: add after featureswitch
                        //outlineColor: "#E8E8E8",
                        // outlineWeight: 2
                    }
                }]
            });
        });

        it("enumerateObjectInstances general both totals on", () => {
            let matrix = matrixRowGroupColumnGroupWithBooleanAndNullOneMeasureBothTotals;
            v.onDataChanged({
                dataViews: [{
                    metadata: {
                        columns:
                        [
                            rowGroupSource4,
                            columnGroupSource4,
                            measureSource1
                        ],
                        objects: {
                            general: {
                                autoSizeColumnWidth: true,
                                textSize: 8,
                                rowSubtotals: true,
                                columnSubtotals: true,
                                //TODO: add after featureswitch
                                //outlineColor: "#E8E8E8",
                                // outlineWeight: 2
                            }
                        }
                    },
                    matrix: matrix
                }]
            });

            let objects = v.enumerateObjectInstances({ objectName: "general" });
            expect(objects).toEqual({
                instances: [{
                    selector: null,
                    objectName: "general",
                    properties: {
                        autoSizeColumnWidth: true,
                        textSize: 8,
                        rowSubtotals: true,
                        columnSubtotals: true,
                        //TODO: add after featureswitch
                        //outlineColor: "#E8E8E8",
                        // outlineWeight: 2
                    }
                }]
            });
        });

        it("enumerateObjectInstances general both totals on but suppressed by no aggregation", () => {
            let matrix = _.cloneDeep(matrixRowGroupColumnGroupWithBooleanAndNullOneMeasureBothTotals);
            matrix.columns.levels[0].sources[0] = columnGroupSourceNonAggregatable;
            matrix.rows.levels[0].sources[0] = rowGroupSourceNonAggregatable;

            let objects: powerbi.DataViewObjects = {
                general: {
                    autoSizeColumnWidth: true,
                    textSize: 8,
                    rowSubtotals: true,
                    columnSubtotals: true,
                    //TODO: add after featureswitch
                    //outlineColor: "#E8E8E8",
                    // outlineWeight: 2
                }
            };
            v.onDataChanged({
                dataViews: [{
                    metadata: {
                        columns:
                        [
                            rowGroupSource4,
                            columnGroupSource4,
                            measureSource1
                        ],
                        objects: objects
                    },
                    matrix: matrix
                }]
            });

            let result = v.enumerateObjectInstances({ objectName: "general" });
            expect(result).toEqual({
                instances: [{
                    selector: null,
                    objectName: "general",
                    properties: {
                        autoSizeColumnWidth: true,
                        textSize: 8,
                        //TODO: add after featureswitch
                        //outlineColor: "#E8E8E8",
                        // outlineWeight: 2
                    }
                }]
            });
        });

        it("enumerateObjectInstances - non-aggregatable field is NOT the last row field", () => {
            let matrix = _.cloneDeep(matrixTwoRowGroupsTwoColumnGroupsTwoMeasuresAndTotals);
            matrix.rows.levels[0].sources[0].discourageAggregationAcrossGroups = true;

            let objects: powerbi.DataViewObjects = {
                general: {
                    autoSizeColumnWidth: true,
                    textSize: 8,
                    rowSubtotals: true,
                    columnSubtotals: true,
                    //TODO: add after featureswitch
                    //outlineColor: "#E8E8E8",
                    // outlineWeight: 2
                }
            };
            let dataView = getMatrixColumnWidthDataView(matrix, objects);
            v.onDataChanged({ dataViews: [dataView] });

            let result = v.enumerateObjectInstances({ objectName: "general" });
            expect(result).toEqual({
                instances: [{
                    selector: null,
                    objectName: "general",
                    properties: {
                        autoSizeColumnWidth: true,
                        textSize: 8,
                        rowSubtotals: true,
                        columnSubtotals: true,
                        //TODO: add after featureswitch
                        //outlineColor: "#E8E8E8",
                        // outlineWeight: 2
                    }
                }]
            });
        });

        it("enumerateObjectInstances - non-aggregatable field is NOT the last column field", () => {
            let matrix = _.cloneDeep(matrixTwoRowGroupsTwoColumnGroupsTwoMeasuresAndTotals);
            matrix.columns.levels[0].sources[0].discourageAggregationAcrossGroups = true;

            let objects: powerbi.DataViewObjects = {
                general: {
                    autoSizeColumnWidth: true,
                    textSize: 8,
                    rowSubtotals: true,
                    columnSubtotals: true,
                    //TODO: add after featureswitch
                    //outlineColor: "#E8E8E8",
                    // outlineWeight: 2
                }
            };
            let dataView = getMatrixColumnWidthDataView(matrix, objects);
            v.onDataChanged({ dataViews: [dataView] });

            let result = v.enumerateObjectInstances({ objectName: "general" });
            expect(result).toEqual({
                instances: [{
                    selector: null,
                    objectName: "general",
                    properties: {
                        autoSizeColumnWidth: true,
                        textSize: 8,
                        rowSubtotals: true,
                        columnSubtotals: true,
                        //TODO: add after featureswitch
                        //outlineColor: "#E8E8E8",
                        // outlineWeight: 2
                    }
                }]
            });
            matrix.columns.levels[0].sources[0].discourageAggregationAcrossGroups = false;
        });

        it("enumerateObjectInstances - non-aggregatable field is the last row field", () => {
            let matrix = _.cloneDeep(matrixTwoRowGroupsTwoColumnGroupsTwoMeasuresAndTotals);
            matrix.rows.levels[1].sources[0].discourageAggregationAcrossGroups = true;

            let objects: powerbi.DataViewObjects = {
                general: {
                    autoSizeColumnWidth: true,
                    textSize: 8,
                    rowSubtotals: true,
                    columnSubtotals: true,
                    //TODO: add after featureswitch
                    //outlineColor: "#E8E8E8",
                    // outlineWeight: 2
                }
            };
            let dataView = getMatrixColumnWidthDataView(matrix, objects);
            v.onDataChanged({ dataViews: [dataView] });

            let result = v.enumerateObjectInstances({ objectName: "general" });
            expect(result).toEqual({
                instances: [{
                    selector: null,
                    objectName: "general",
                    properties: {
                        autoSizeColumnWidth: true,
                        textSize: 8,
                        columnSubtotals: true,
                        //TODO: add after featureswitch
                        //outlineColor: "#E8E8E8",
                        // outlineWeight: 2
                    }
                }]
            });
        });

        it("enumerateObjectInstances - non-aggregatable field is the last column field", () => {
            let matrix = _.cloneDeep(matrixTwoRowGroupsTwoColumnGroupsTwoMeasuresAndTotals);
            matrix.columns.levels[2].sources[0].discourageAggregationAcrossGroups = true;

            let objects: powerbi.DataViewObjects = {
                general: {
                    autoSizeColumnWidth: true,
                    textSize: 8,
                    rowSubtotals: true,
                    columnSubtotals: true,
                    //TODO: add after featureswitch
                    //outlineColor: "#E8E8E8",
                    // outlineWeight: 2
                }
            };
            let dataView = getMatrixColumnWidthDataView(matrix, objects);
            v.onDataChanged({ dataViews: [dataView] });

            let result = v.enumerateObjectInstances({ objectName: "general" });
            expect(result).toEqual({
                instances: [{
                    selector: null,
                    objectName: "general",
                    properties: {
                        autoSizeColumnWidth: true,
                        textSize: 8,
                        rowSubtotals: true,
                        //TODO: add after featureswitch
                        //outlineColor: "#E8E8E8",
                        // outlineWeight: 2
                    }
                }]
            });
            matrix.columns.levels[0].sources[0].discourageAggregationAcrossGroups = false;
        });

        it("enumerateObjectInstances general no objects", () => {
            let matrix = matrixRowGroupColumnGroupWithBooleanAndNullOneMeasure;
            v.onDataChanged({
                dataViews: [{
                    metadata: {
                        columns:
                        [
                            rowGroupSource4,
                            columnGroupSource4,
                            measureSource1
                        ]
                    },
                    matrix: matrix
                }]
            });

            let objects = v.enumerateObjectInstances({ objectName: "general" });
            expect(objects).toEqual({
                instances: [{
                    selector: null,
                    objectName: "general",
                    properties: {
                        autoSizeColumnWidth: true,
                        textSize: 8,
                        rowSubtotals: true,
                        columnSubtotals: true,
                        //TODO: add after featureswitch
                        //outlineColor: "#E8E8E8",
                        // outlineWeight: 2
                    }
                }]
            });
        });

        it("enumerateObjectInstances general no properties", () => {
            let matrix = matrixRowGroupColumnGroupWithBooleanAndNullOneMeasureBothTotals;
            v.onDataChanged({
                dataViews: [{
                    metadata: {
                        columns:
                        [
                            rowGroupSource4,
                            columnGroupSource4,
                            measureSource1
                        ],
                        objects: {
                            general: {
                            }
                        }
                    },
                    matrix: matrix
                }]
            });

            let objects = v.enumerateObjectInstances({ objectName: "general" });
            expect(objects).toEqual({
                instances: [{
                    selector: null,
                    objectName: "general",
                    properties: {
                        autoSizeColumnWidth: true,
                        textSize: 8,
                        rowSubtotals: true,
                        columnSubtotals: true,
                        //TODO: add after featureswitch
                        //outlineColor: "#E8E8E8",
                        // outlineWeight: 2
                    }
                }]
            });

            it("RefreshControl invisible parent", () => {
                let control = { refresh() { } };
                let controlSpy = spyOn(control, "refresh");
                v["shouldAllowHeaderResize"] = () => { return true; };
                v["hierarchyNavigator"] = { update() { } };
                v["tablixControl"] = control;
                v["element"]["visible"] = () => { return false; };

                v.onResizing({ width: 100, height: 100 });

                expect(controlSpy).not.toHaveBeenCalled();
            });

            it("RefreshControl invisible parent but dashboard layout", () => {
                let control = { refresh() { } };
                let controlSpy = spyOn(control, "refresh");
                v["shouldAllowHeaderResize"] = () => { return true; };
                v["hierarchyNavigator"] = { update() { } };
                v["tablixControl"] = control;
                v["element"]["visible"] = () => { return false; };
                v["isInteractive"] = false;

                v.onResizing({ width: 100, height: 100 });

                expect(controlSpy).toHaveBeenCalled();
            });

            it("ShouldClearControl noSort", (done) => {
                v.onDataChanged({ dataViews: [matrixOneMeasureDataView] });
                let refreshSpy = spyOn(v, "refreshControl").and.callFake(() => { });

                v.onDataChanged({ dataViews: [matrixOneMeasureDataView] });

                setTimeout(() => {
                    expect(refreshSpy).toHaveBeenCalledWith(false);
                    done();
                }, DefaultWaitForRender);
            });

            it("ShouldClearControl sort", (done) => {
                v.onDataChanged({ dataViews: [matrixOneMeasureDataView] });
                let refreshSpy = spyOn(v, "refreshControl").and.callFake(() => { });
                v["waitingForSort"] = true;
                v.onDataChanged({ dataViews: [matrixOneMeasureDataView] });

                setTimeout(() => {
                    expect(refreshSpy).toHaveBeenCalledWith(true);
                    done();
                }, DefaultWaitForRender);
            });
        });

        it("suppressNotification not set after loading table with ColumnAutoSizeProperty off", (done) => {
            let dataViewObjects: powerbi.DataViewObjects = {
                general: {
                    totals: true,
                    autoSizeColumnWidth: false,
                    textSize: 8,
                }
            };

            let rowGroupSource1WithWidth = powerbi.Prototype.inheritSingle(rowGroupSource1);
            rowGroupSource1WithWidth.objects = { general: { columnWidth: 100 } };

            let measureSource1WithWidth = powerbi.Prototype.inheritSingle(measureSource1);
            measureSource1WithWidth.objects = { general: { columnWidth: 200 } };

            let dataView = getMatrixColumnWidthDataView2(
                [rowGroupSource1WithWidth, measureSource1WithWidth],
                matrixOneMeasureOneRowGroupTwoGroupInstances,
                dataViewObjects);

            v.onDataChanged({ dataViews: [dataView] });
            setTimeout(() => {
                let matrixVisual = <Matrix>v;
                let colWidthManager = matrixVisual.getColumnWidthManager();
                let persistedColWidths = colWidthManager.getTablixColumnWidthsObject();

                expect(colWidthManager.suppressOnDataChangedNotification).toBe(false);
                expect(persistedColWidths.length).toBe(2);
                expect(persistedColWidths[0].queryName).toBe('RowGroup1');
                expect(persistedColWidths[0].width).toBe(100);
                expect(persistedColWidths[1].queryName).toBe('Measure1');
                expect(persistedColWidths[1].width).toBe(200);
                done();
            }, DefaultWaitForRender);
        });

        it("enumerateObjectInstances general autoSizeColumnWidth off", () => {
            let matrix = matrixTwoRowGroupsTwoColumnGroupsTwoMeasuresAndTotals;
            let objects = {
                general: {
                    autoSizeColumnWidth: false,
                    textSize: 8,
                    rowSubtotals: true,
                    columnSubtotals: true,
                    //TODO: add after featureswitch
                    //outlineColor: "#E8E8E8",
                    // outlineWeight: 2
                }
            };
            let dataView = getMatrixColumnWidthDataView(matrix, objects);
            v.onDataChanged({ dataViews: [dataView] });
            expect(v.enumerateObjectInstances({ objectName: "general" })).toEqual({
                instances: [{
                    selector: null,
                    objectName: "general",
                    properties: {
                        autoSizeColumnWidth: false,
                        textSize: 8,
                        rowSubtotals: true,
                        columnSubtotals: true,
                        //TODO: add after featureswitch
                        //outlineColor: "#E8E8E8",
                        // outlineWeight: 2
                    }
                }]
            });
        });

        it("enumerateObjectInstances general autoSizeColumnWidth on", () => {
            let matrix = matrixTwoRowGroupsTwoColumnGroupsTwoMeasuresAndTotals;
            let objects = {
                general: {
                    rowSubtotals: true,
                    columnSubtotals: true,
                    autoSizeColumnWidth: true
                }
            };
            let dataView = getMatrixColumnWidthDataView(matrix, objects);
            v.onDataChanged({ dataViews: [dataView] });

            expect(v.enumerateObjectInstances({ objectName: "general" })).toEqual({
                instances: [{
                    selector: null,
                    objectName: "general",
                    properties: {
                        autoSizeColumnWidth: true,
                        textSize: 8,
                        rowSubtotals: true,
                        columnSubtotals: true,
                        //TODO: add after featureswitch
                        //outlineColor: "#E8E8E8",
                        // outlineWeight: 2
                    }
                }]
            });
        });

        it("ColumnWidthChangedCallback ColumnAutoSizeProperty on", (done) => {
            let matrix = matrixTwoRowGroupsTwoColumnGroupsTwoMeasuresAndTotals;
            v["isInteractive"] = true;
            let objects = {
                general: {
                    rowSubtotals: true,
                    columnSubtotals: true,
                    autoSizeColumnWidth: true
                }
            };
            let dataView = getMatrixColumnWidthDataView(matrix, objects);
            v.onDataChanged({ dataViews: [dataView] });
            setTimeout(() => {
                let matrixVisual = <Matrix>v;
                matrixVisual.columnWidthChanged(2, 45);
                let colWidthManager = matrixVisual.getColumnWidthManager();
                let persistedColWidths = colWidthManager.getTablixColumnWidthsObject();
                expect(persistedColWidths.length).toBe(1);
                expect(persistedColWidths[0].queryName).toBe('Measure1');
                expect(persistedColWidths[0].width).toBe(45);
                done();
            }, DefaultWaitForRender);
        });

        it("ColumnWidthChangedCallback ColumnAutoSizeProperty off", (done) => {
            let matrix = matrixTwoRowGroupsTwoColumnGroupsTwoMeasuresAndTotals;
            let objects = {
                general: {
                    rowSubtotals: true,
                    columnSubtotals: true,
                    autoSizeColumnWidth: false
                }
            };

            let dataView = getMatrixColumnWidthDataView(matrix, objects);
            v.onDataChanged({ dataViews: [dataView] });
            setTimeout(() => {
                let matrixVisual = <Matrix>v;
                let colWidthManager = matrixVisual.getColumnWidthManager();
                spyOn(colWidthManager, "shouldAutoSizeColumnWidth").and.callFake(() => { return false; });
                spyOn(colWidthManager, "dataViewUpdated").and.callFake(() => { return true; });
                let widthsToPersist: number[] = [70, 75, 50, 60, 50, 60, 50, 60, 50, 60, 50, 60, 50, 60, 50, 60];
                colWidthManager.persistAllColumnWidths(widthsToPersist);
                let persistedColWidths = colWidthManager.getTablixColumnWidthsObject();
                expect(persistedColWidths.length).toBe(16);
                done();
            }, DefaultWaitForRender);
        });

        it("ColumnWidthChangedCallback ColumnAutoSizeProperty off then resize", (done) => {
            let matrix = matrixTwoRowGroupsTwoColumnGroupsTwoMeasuresAndTotals;
            let objects = {
                general: {
                    rowSubtotals: true,
                    columnSubtotals: true,
                    autoSizeColumnWidth: false
                }
            };
            let dataView = getMatrixColumnWidthDataView(matrix, objects);
            v["isInteractive"] = true;
            v.onDataChanged({ dataViews: [dataView] });
            setTimeout(() => {
                let matrixVisual = <Matrix>v;
                let colWidthManager = matrixVisual.getColumnWidthManager();
                
                // Resize
                colWidthManager.columnWidthChanged(2, 45);
                expect(colWidthManager.suppressOnDataChangedNotification).toBe(false);
                let persistedColWidths = colWidthManager.getTablixColumnWidthsObject();
                expect(persistedColWidths.length).toBe(1);
                expect(persistedColWidths[0].queryName).toBe('Measure1');
                expect(persistedColWidths[0].width).toBe(45);
                done();
            }, DefaultWaitForRender);
        });
    });

    describe("Matrix DOM validation", () => {
        let v: powerbi.IVisual,
            element: JQuery,
            EmptyHeaderCell = "\xa0",
            ContainerClassName = 'bi-tablix',
            NoMarginClass = "bi-tablix-cellNoMarginStyle",
            HeaderClass = "bi-tablix-header",
            ColumnHeaderLeafClass = "bi-tablix-column-header-leaf",
            RowHeaderLeafClass = "bi-tablix-row-header-leaf",
            RowHeaderTopLevelStaticLeafClass = "bi-tablix-row-header-toplevel-static-leaf",
            RowHeaderStaticLeafClass = "bi-tablix-row-header-static-leaf",
            BodyCellClass = "bi-matrix-body-cell",
            TotalClass = "total",
            NumericCellClassName = " bi-table-cell-numeric",
            TableTotalLabel = "Total";

        beforeEach(() => {
            element = powerbitests.helpers.testDom("1500", "1500");
            element["visible"] = () => { return true; };
            v = webPluginService.getPlugin("matrix").create();
            v.init({
                element: element,
                host: mocks.createVisualHostServices(),
                style: powerbi.visuals.visualStyles.create(),
                viewport: {
                    height: element.height(),
                    width: element.width()
                },
                animation:
                {
                    transitionImmediate: true
                },
                interactivity: {
                    selection: true
                }
            });
        });

        function validateSortIcons(expectedValues: string[]): void {
            tablixHelper.validateSortIconClassNames(expectedValues, ".bi-tablix tr");
        }

        function validateMatrix(expectedValues: string[][]): void {
            tablixHelper.validateMatrix(expectedValues, ".bi-tablix tr");
        }

        function validateClassNames(expectedValues: string[][]): void {
            tablixHelper.validateClassNames(expectedValues, ".bi-tablix tr", NoMarginClass);
        }

        function validateMatrixTooltip(selector: string, values: powerbi.DataViewTreeNodeValue, index: number): void {
            let matrixItems = $("tr").eq(index + 1).find(`.${selector} div div`);
            for (let i = 0; i < Object.keys(values).length; i++) {
                expect(matrixItems[i].textContent).toBe(formatter(values[i].value, measureSource3));
                expect(matrixItems[i].title).toBe(formatter(values[i].value, measureSource3));
            }
        }

        describe('text size', () => {
            describe('default', () => {
                it('font size set on container', (done) => {
                    let matrix = matrixRowGroupColumnGroupWithBooleanAndNullOneMeasureBothTotals;
                    v.onDataChanged({
                        dataViews: [{
                            metadata: {
                                columns:
                                [
                                    rowGroupSource4,
                                    columnGroupSource4,
                                    measureSource1
                                ],
                                objects: {
                                    general: {
                                        rowSubtotals: true,
                                        columnSubtotals: true,
                                    }
                                }
                            },
                            matrix: matrix
                        }]
                    });

                    setTimeout(() => {
                        let actualFontSize = element.find(`.${ContainerClassName}`).css('font-size');
                        tablixHelper.validateFontSize(actualFontSize, 8);
                        done();
                    }, DefaultWaitForRender);
                });

                it("3x8 matrix with default text size row height", (done) => {
                    let matrix = matrixThreeRowGroups;
                    v.onDataChanged({
                        dataViews: [{
                            metadata: {
                                columns:
                                [
                                    rowGroupSource1,
                                    rowGroupSource2,
                                    rowGroupSource3
                                ]
                            },
                            matrix: matrix
                        }]
                    });

                    setTimeout(() => {
                        let cells = element
                            .find(`.${ColumnHeaderLeafClass}, .${HeaderClass}, .${RowHeaderStaticLeafClass}`)
                            .find('> div');

                        expect(cells.length).toBe(17);
                        tablixHelper.validateCellHeights(cells, 13);

                        done();
                    }, DefaultWaitForRender);
                });
            });

            describe('specified', () => {
                it("font size set on container", (done) => {
                    let matrix = matrixRowGroupColumnGroupWithBooleanAndNullOneMeasureBothTotals;
                    v.onDataChanged({
                        dataViews: [{
                            metadata: {
                                columns:
                                [
                                    rowGroupSource4,
                                    columnGroupSource4,
                                    measureSource1
                                ],
                                objects: {
                                    general: {
                                        rowSubtotals: true,
                                        columnSubtotals: true,
                                        textSize: 18,
                                    }
                                }
                            },
                            matrix: matrix
                        }]
                    });

                    setTimeout(() => {
                        let actualFontSize = element.find(`.${ContainerClassName}`).css('font-size');
                        tablixHelper.validateFontSize(actualFontSize, 18);
                        done();
                    }, DefaultWaitForRender);
                });

                it("3x8 matrix with specified text size adjusted row height", (done) => {
                    let matrix = matrixThreeRowGroups;
                    v.onDataChanged({
                        dataViews: [{
                            metadata: {
                                columns:
                                [
                                    rowGroupSource1,
                                    rowGroupSource2,
                                    rowGroupSource3
                                ],
                                objects: {
                                    general: {
                                        rowSubtotals: true,
                                        columnSubtotals: true,
                                        textSize: 14,
                                    }
                                },
                            },
                            matrix: matrix
                        }]
                    });

                    setTimeout(() => {
                        let cells = element
                            .find(`.${ColumnHeaderLeafClass}, .${HeaderClass}, .${RowHeaderStaticLeafClass}`)
                            .find('> div');

                        expect(cells.length).toBe(17);
                        tablixHelper.validateCellHeights(cells, 25);

                        done();
                    }, DefaultWaitForRender);
                });

                it("6x9 matrix with text size does not crop columns by minimum column width", (done) => {
                    v.onDataChanged({
                        dataViews: [matrixThreeMeasuresThreeRowGroupsDataViewIncreasedFontSize]
                    });

                    let matrix = matrixThreeMeasuresThreeRowGroups;
                    setTimeout(() => {
                        // All columns will be visible since this is not dashboard
                        let header_1 = matrix.rows.root.children[0];
                        let header_1_1 = header_1.children[0];
                        let header_1_1_1 = header_1_1.children[0];
                        let header_1_1_2 = header_1_1.children[1];
                        let header_1_2 = header_1.children[1];
                        let header_1_2_1 = header_1_2.children[0];
                        let header_1_2_2 = header_1_2.children[1];
                        let header_2 = matrix.rows.root.children[1];
                        let header_2_1 = header_2.children[0];
                        let header_2_1_1 = header_2_1.children[0];
                        let header_2_1_2 = header_2_1.children[1];
                        let header_2_2 = header_2.children[1];
                        let header_2_2_1 = header_2_2.children[0];
                        let header_2_2_2 = header_2_2.children[1];
                        let cellValue1 = formatter(header_1_1_1.values[0].value, measureSource1);
                        let cellValue2 = formatter(header_1_1_1.values[1].value, measureSource2);
                        let cellValue3 = formatter(header_1_1_1.values[2].value, measureSource3);
                        let cellValue4 = formatter(header_1_1_2.values[0].value, measureSource1);
                        let cellValue5 = formatter(header_1_1_2.values[1].value, measureSource2);
                        let cellValue6 = formatter(header_1_1_2.values[2].value, measureSource3);
                        let cellValue7 = formatter(header_1_2_1.values[0].value, measureSource1);
                        let cellValue8 = formatter(header_1_2_1.values[1].value, measureSource2);
                        let cellValue9 = formatter(header_1_2_1.values[2].value, measureSource3);
                        let cellValue10 = formatter(header_1_2_2.values[0].value, measureSource1);
                        let cellValue11 = formatter(header_1_2_2.values[1].value, measureSource2);
                        let cellValue12 = formatter(header_1_2_2.values[2].value, measureSource3);
                        let cellValue13 = formatter(header_2_1_1.values[0].value, measureSource1);
                        let cellValue14 = formatter(header_2_1_1.values[1].value, measureSource2);
                        let cellValue15 = formatter(header_2_1_1.values[2].value, measureSource3);
                        let cellValue16 = formatter(header_2_1_2.values[0].value, measureSource1);
                        let cellValue17 = formatter(header_2_1_2.values[1].value, measureSource2);
                        let cellValue18 = formatter(header_2_1_2.values[2].value, measureSource3);
                        let cellValue19 = formatter(header_2_2_1.values[0].value, measureSource1);
                        let cellValue20 = formatter(header_2_2_1.values[1].value, measureSource2);
                        let cellValue21 = formatter(header_2_2_1.values[2].value, measureSource3);
                        let cellValue22 = formatter(header_2_2_2.values[0].value, measureSource1);
                        let cellValue23 = formatter(header_2_2_2.values[1].value, measureSource2);
                        let cellValue24 = formatter(header_2_2_2.values[2].value, measureSource3);

                        let expectedCells: string[][] = [
                            [rowGroupSource1.displayName, rowGroupSource2.displayName, rowGroupSource3.displayName, measureSource1.displayName, measureSource2.displayName, measureSource3.displayName, ""],
                            [header_1.value, header_1_1.value, header_1_1_1.value, cellValue1, cellValue2, cellValue3],
                            [header_1_1_2.value, cellValue4, cellValue5, cellValue6],
                            [header_1_2.value, header_1_2_1.value, cellValue7, cellValue8, cellValue9],
                            [header_1_2_2.value, cellValue10, cellValue11, cellValue12],
                            [header_2.value, header_2_1.value, header_2_1_1.value, cellValue13, cellValue14, cellValue15],
                            [header_2_1_2.value, cellValue16, cellValue17, cellValue18],
                            [header_2_2.value, header_2_2_1.value, cellValue19, cellValue20, cellValue21],
                            [header_2_2_2.value, cellValue22, cellValue23, cellValue24]
                        ];

                        validateMatrix(expectedCells);

                        let expectedClassNames: string[][] = [
                            [ColumnHeaderLeafClass, ColumnHeaderLeafClass, ColumnHeaderLeafClass + " " + RowHeaderLeafClass, ColumnHeaderLeafClass + NumericCellClassName, ColumnHeaderLeafClass + NumericCellClassName, ColumnHeaderLeafClass + NumericCellClassName, ""],
                            [HeaderClass, HeaderClass, RowHeaderStaticLeafClass, BodyCellClass, BodyCellClass, BodyCellClass],
                            [RowHeaderStaticLeafClass, BodyCellClass, BodyCellClass, BodyCellClass],
                            [HeaderClass, RowHeaderStaticLeafClass, BodyCellClass, BodyCellClass, BodyCellClass],
                            [RowHeaderStaticLeafClass, BodyCellClass, BodyCellClass, BodyCellClass],
                            [HeaderClass, HeaderClass, RowHeaderStaticLeafClass, BodyCellClass, BodyCellClass, BodyCellClass],
                            [RowHeaderStaticLeafClass, BodyCellClass, BodyCellClass, BodyCellClass],
                            [HeaderClass, RowHeaderStaticLeafClass, BodyCellClass, BodyCellClass, BodyCellClass],
                            [RowHeaderStaticLeafClass, BodyCellClass, BodyCellClass, BodyCellClass]
                        ];

                        validateClassNames(expectedClassNames);

                        done();
                    }, DefaultWaitForRender);
                });
            });
        });

        it("resize with autoSizeColumnwidth on", (done) => {
            let selector = ".bi-tablix tr";
            let matrix = matrixTwoRowGroupsTwoColumnGroupsTwoMeasuresAndTotals;
            let objects = {
                general: {
                    rowSubtotals: true,
                    columnSubtotals: true,
                    autoSizeColumnWidth: true,
                }
            };

            let newMeasureSource1: DataViewMetadataColumn = { displayName: "Measure2", queryName: "Measure2", type: dataTypeNumber, isMeasure: true, index: 7, objects: { general: { formatString: "#.00", columnWidth: 45 } } };
            let columns = [
                rowGroupSource1,
                rowGroupSource2,
                columnGroupSource1,
                columnGroupSource2,
                newMeasureSource1,
                measureSource2
            ];
            let dataView = getMatrixColumnWidthDataView2(columns, matrix, objects);
            v["isInteractive"] = true;
            v.onDataChanged({ dataViews: [dataView] });
            setTimeout(() => {
                let rows = $(selector);
                let rowCells = rows.eq(2).find('td');
                expect(rowCells.length).toBe(16);
                expect(rowCells.eq(3).width()).toEqual(45);
                expect(rowCells.eq(5).width()).toEqual(45);
                expect(rowCells.eq(7).width()).toEqual(45);
                expect(rowCells.eq(9).width()).toEqual(45);
                done();
            }, DefaultWaitForRender);
        });

        it("autoSizeColumnwidth on to off then resize", (done) => {
            let selector = ".bi-tablix tr";
            let matrix = matrixTwoRowGroupsTwoColumnGroupsTwoMeasuresAndTotals;
            let objects = {
                general: {
                    rowSubtotals: true,
                    columnSubtotals: true,
                    autoSizeColumnWidth: false,
                }
            };
            let dataView = getMatrixColumnWidthDataView(matrix, objects);
            v["isInteractive"] = true;
            v.onDataChanged({
                dataViews: [dataView]
            });
            setTimeout(() => {
                let rows = $(selector);
                let rowCells = rows.eq(2).find('td');
                expect(rowCells.eq(0).width()).toBeCloseTo(74, -1);
                expect(rowCells.eq(1).width()).toBeCloseTo(68, -1);
                expect(rowCells.eq(2).width()).toBeCloseTo(49, -1);
                expect(rowCells.eq(3).width()).toBeCloseTo(50, -1);
                expect(rowCells.eq(4).width()).toBeCloseTo(48, -1);
                expect(rowCells.eq(5).width()).toBeCloseTo(50, -1);
                expect(rowCells.eq(6).width()).toBeCloseTo(49, -1);

                let newMeasureSource1: DataViewMetadataColumn = { displayName: "Measure2", queryName: "Measure2", type: dataTypeNumber, isMeasure: true, index: 7, objects: { general: { formatString: "#.00", columnWidth: 45 } } };
                let columns = [
                    rowGroupSource1,
                    rowGroupSource2,
                    columnGroupSource1,
                    columnGroupSource2,
                    newMeasureSource1,
                    measureSource2
                ];
                let dataView1 = getMatrixColumnWidthDataView2(columns, matrix, objects);
                v["isInteractive"] = true;
                let matrixVisual = <Matrix>v;
                let colWidthManager = matrixVisual.getColumnWidthManager();
                colWidthManager.suppressOnDataChangedNotification = false;
                colWidthManager["dataViewUpdated"] = true;
                v.onDataChanged({ dataViews: [dataView1] });
                setTimeout(() => {
                    let rows1 = $(selector);
                    let rowCells1 = rows1.eq(2).find('td');
                    expect(rowCells1.eq(0).width()).toBeCloseTo(74, -1);
                    expect(rowCells1.eq(1).width()).toBeCloseTo(68, -1);
                    expect(rowCells1.eq(2).width()).toBeCloseTo(49, -1);
                    expect(rowCells1.eq(3).width()).toBeCloseTo(46, -1);
                    expect(rowCells1.eq(4).width()).toBeCloseTo(48, -1);
                    expect(rowCells1.eq(5).width()).toBeCloseTo(46, -1);
                    expect(rowCells1.eq(6).width()).toBeCloseTo(49, -1);
                    done();
                }, DefaultWaitForRender);
            }, DefaultWaitForRender);
        });

        xit("autoSizeColumnwidth off to on", (done) => {
            let selector = ".bi-tablix tr";
            let matrix = matrixTwoRowGroupsTwoColumnGroupsTwoMeasuresAndTotals;
            let objects = {
                general: {
                    rowSubtotals: true,
                    columnSubtotals: true,
                    autoSizeColumnWidth: false,
                }
            };
            let newMeasureSource1: DataViewMetadataColumn = { displayName: "Measure2", queryName: "Measure2", type: dataTypeNumber, isMeasure: true, index: 7, objects: { general: { formatString: "#.00", columnWidth: 45 } } };
            let columns = [
                rowGroupSource1,
                rowGroupSource2,
                columnGroupSource1,
                columnGroupSource2,
                newMeasureSource1,
                measureSource2
            ];
            let dataView = getMatrixColumnWidthDataView2(columns, matrix, objects);
            v.onDataChanged({
                dataViews: [dataView]
            });
            setTimeout(() => {
                let rows = $(selector);
                let rowCells = rows.eq(2).find('td');
                expect(rowCells.eq(4).width()).toEqual(48);
                expect(rowCells.eq(5).width()).toEqual(45);
                expect(rowCells.eq(6).width()).toEqual(49);

                let objects = {
                    general: {
                        rowSubtotals: true,
                        columnSubtotals: true,
                        autoSizeColumnWidth: true,
                    }
                };
                let dataView2 = getMatrixColumnWidthDataView(matrix, objects);
                let matrixVisual = <Matrix>v;
                let colWidthManager = matrixVisual.getColumnWidthManager();
                colWidthManager.suppressOnDataChangedNotification = false;
                colWidthManager["dataViewUpdated"] = true;
                v.onDataChanged({
                    dataViews: [dataView2]
                });
                setTimeout(() => {
                    let rows = $(selector);
                    let rowCells = rows.eq(2).find('td');
                    expect(rowCells.eq(4).width()).toEqual(48);
                    expect(rowCells.eq(5).width()).toEqual(50);
                    expect(rowCells.eq(6).width()).toEqual(49);
                    done();
                }, DefaultWaitForRender);
            }, DefaultWaitForRender);
        });

        xit("multiple onDataChangedCalls to add matrix columns + resize", (done) => {
            let selector = ".bi-tablix tr";
            let matrix0 = matrixOneMeasure;
            let objects = {
                general: {
                    rowSubtotals: true,
                    columnSubtotals: true,
                    autoSizeColumnWidth: true,
                }
            };

            let dataView0 = getMatrixColumnWidthDataView(matrix0, objects);
            // 1st onDataChanged call with one column in matrix
            v["isInteractive"] = true;
            v.onDataChanged({ dataViews: [dataView0] });
            setTimeout(() => {
                let matrixVisual = <Matrix>v;
                let columnWidthManager = matrixVisual.getColumnWidthManager();
                let rows0 = $(selector);
                let rowCells0 = rows0.eq(0).find('td');
                let queryNames0 = columnWidthManager.getTablixQueryNames();
                expect(queryNames0.length).toBe(1);
                expect(queryNames0[0]).toBe(measureSource1.queryName);
                expect(rowCells0.eq(1).width()).toEqual(49);

                // 2nd onDataChanged call with two columns in matrix
                let matrix1 = matrixTwoMeasures;
                let dataView1 = getMatrixColumnWidthDataView(matrix1, objects);
                v.onDataChanged({ dataViews: [dataView1] });
                setTimeout(() => {
                    let rows1 = $(selector);
                    let rowCells1 = rows1.eq(0).find('td');
                    let queryNames1 = columnWidthManager.getTablixQueryNames();
                    expect(queryNames1.length).toBe(2);
                    expect(queryNames1[0]).toBe(measureSource1.queryName);
                    expect(queryNames1[1]).toBe(measureSource2.queryName);
                    expect(rowCells1.eq(1).width()).toEqual(49);
                    expect(rowCells1.eq(2).width()).toEqual(50);

                    // 3rd onDataChanged call with three columns in matrix
                    let matrix2 = matrixThreeMeasures;
                    let dataView2 = getMatrixColumnWidthDataView(matrix2, objects);
                    v.onDataChanged({ dataViews: [dataView2] });
                    setTimeout(() => {
                        let rows2 = $(selector);
                        let rowCells2 = rows2.eq(0).find('td');
                        let queryNames2 = columnWidthManager.getTablixQueryNames();
                        expect(queryNames2.length).toBe(3);
                        expect(queryNames2[0]).toBe(measureSource1.queryName);
                        expect(queryNames2[1]).toBe(measureSource2.queryName);
                        expect(queryNames2[2]).toBe(measureSource3.queryName);
                        expect(rowCells2.eq(1).width()).toEqual(49);
                        expect(rowCells2.eq(2).width()).toEqual(50);
                        expect(rowCells2.eq(3).width()).toEqual(50);

                        // Resize column 2
                        let newMeasureSource: DataViewMetadataColumn = { displayName: "Measure2", queryName: "Measure2", type: dataTypeNumber, isMeasure: true, index: 7, objects: { general: { formatString: "#.00", columnWidth: 45 } } };
                        let columns = [measureSource1, newMeasureSource, measureSource3];
                        let dataView3 = getMatrixColumnWidthDataView2(columns, matrix2, objects);
                        v.onDataChanged({ dataViews: [dataView3] });
                        setTimeout(() => {
                            let rows3 = $(selector);
                            let rowCells3 = rows3.eq(1).find('td');
                            expect(rowCells3.eq(1).width()).toEqual(46);
                            expect(rowCells3.eq(2).width()).toEqual(50);
                            expect(rowCells3.eq(3).width()).toEqual(50);
                            done();
                        }, DefaultWaitForRender);
                    }, DefaultWaitForRender);
                }, DefaultWaitForRender);
            }, DefaultWaitForRender);
        });

        it("1x2 matrix (value and static column header)", (done) => {

            let matrix = matrixOneMeasure;
            v.onDataChanged({
                dataViews: [matrixOneMeasureDataView]
            });

            setTimeout(() => {

                let cellValue: string = formatter(matrix.rows.root.children[0].values[0].value, measureSource1);
                let expectedCells: string[][] = [
                    ["", measureSource1.displayName, ""],
                    [EmptyHeaderCell, cellValue]
                ];

                validateMatrix(expectedCells);

                let expectedClassNames: string[][] = [
                    [HeaderClass, ColumnHeaderLeafClass + NumericCellClassName, ""],
                    [RowHeaderTopLevelStaticLeafClass, BodyCellClass]
                ];

                validateClassNames(expectedClassNames);

                done();
            }, DefaultWaitForRender);
        });

        it("1x2 matrix (value and column header value) update", (done) => {
            v.onDataChanged({
                dataViews: [matrixOneMeasureDataView]
            });

            // Call onDataChanged again to trigger an update on the hierarchy navigator
            let matrix = matrixOneMeasureOneColumnGroupOneGroupInstance;
            v.onDataChanged({
                dataViews: [matrixOneMeasureOneColumnGroupOneGroupInstanceDataView]
            });

            setTimeout(() => {

                let headerValue: string = matrix.columns.root.children[0].value;
                let cellValue: string = formatter(matrix.rows.root.children[0].values[0].value, measureSource1);

                let expectedCells: string[][] = [
                    ["", headerValue, ""],
                    [EmptyHeaderCell, cellValue]
                ];

                validateMatrix(expectedCells);

                let expectedClassNames: string[][] = [
                    [HeaderClass, ColumnHeaderLeafClass + NumericCellClassName, ""],
                    [RowHeaderTopLevelStaticLeafClass, BodyCellClass]
                ];

                validateClassNames(expectedClassNames);

                done();
            }, DefaultWaitForRender);
        });

        it("2x3 matrix (1 row and 2 columns no value + leading spaces) update", (done) => {
            v.onDataChanged({
                dataViews: [matrixOneMeasureDataView]
            });

            // Call onDataChanged again to trigger an update on the hierarchy navigator
            v.onDataChanged({
                dataViews: [matrixOneRowGroupTwoColumnGroupsOneGroupInstanceLeadingSpaceDataView]
            });

            setTimeout(() => {
                let expectedCells: string[][] = [
                    ["    Col    Group1", "    G    C1", ""],
                    ["    Row    Group1", "    G    C2"],
                    ["    GR    ", ""]
                ];

                validateMatrix(expectedCells);

                let expectedClassNames: string[][] = [
                    [RowHeaderLeafClass, HeaderClass + NumericCellClassName, ""],
                    [ColumnHeaderLeafClass + " " + RowHeaderLeafClass, ColumnHeaderLeafClass + NumericCellClassName],
                    [RowHeaderTopLevelStaticLeafClass, BodyCellClass],
                ];

                validateClassNames(expectedClassNames);

                done();
            }, DefaultWaitForRender);
        });

        it("3x2 matrix (values and static column headers)", (done) => {

            let matrix = matrixThreeMeasures;
            v.onDataChanged({
                dataViews: [{
                    metadata: { columns: [measureSource1, measureSource2, measureSource3] },
                    matrix: matrix
                }]
            });

            setTimeout(() => {

                let cellValue1: string = formatter(matrix.rows.root.children[0].values[0].value, measureSource1);
                let cellValue2: string = formatter(matrix.rows.root.children[0].values[1].value, measureSource2);
                let cellValue3: string = formatter(matrix.rows.root.children[0].values[2].value, measureSource3);

                let expectedCells: string[][] = [
                    ["", measureSource1.displayName, measureSource2.displayName, measureSource3.displayName, ""],
                    [EmptyHeaderCell, cellValue1, cellValue2, cellValue3]
                ];

                validateMatrix(expectedCells);

                let expectedClassNames: string[][] = [
                    [HeaderClass, ColumnHeaderLeafClass + NumericCellClassName, ColumnHeaderLeafClass + NumericCellClassName, ColumnHeaderLeafClass + NumericCellClassName, ""],
                    [RowHeaderTopLevelStaticLeafClass, BodyCellClass, BodyCellClass, BodyCellClass]
                ];

                validateClassNames(expectedClassNames);

                done();
            }, DefaultWaitForRender);
        });

        it("3x3 matrix (values, static and value column headers)", (done) => {

            let matrix = matrixThreeMeasuresOneColumnGroupOneGroupInstance;
            v.onDataChanged({
                dataViews: [{
                    metadata: { columns: [columnGroupSource1, measureSource1, measureSource2, measureSource3] },
                    matrix: matrix
                }]
            });

            setTimeout(() => {

                let headerValue: string = matrix.columns.root.children[0].value;

                let cellValue1: string = formatter(matrix.rows.root.children[0].values[0].value, measureSource1);
                let cellValue2: string = formatter(matrix.rows.root.children[0].values[1].value, measureSource2);
                let cellValue3: string = formatter(matrix.rows.root.children[0].values[2].value, measureSource3);

                let expectedCells: string[][] = [
                    ["", headerValue, ""],
                    ["", measureSource1.displayName, measureSource2.displayName, measureSource3.displayName],
                    [EmptyHeaderCell, cellValue1, cellValue2, cellValue3]
                ];

                validateMatrix(expectedCells);

                let expectedClassNames: string[][] = [
                    [HeaderClass, HeaderClass + NumericCellClassName, ""],
                    [HeaderClass, ColumnHeaderLeafClass + NumericCellClassName, ColumnHeaderLeafClass + NumericCellClassName, ColumnHeaderLeafClass + NumericCellClassName],
                    [RowHeaderTopLevelStaticLeafClass, BodyCellClass, BodyCellClass, BodyCellClass]
                ];

                validateClassNames(expectedClassNames);

                done();
            }, DefaultWaitForRender);
        });

        it("6x9 matrix (values, static column headers and row value headers)", (done) => {

            v.onDataChanged({
                dataViews: [matrixThreeMeasuresThreeRowGroupsDataView]
            });

            let matrix = matrixThreeMeasuresThreeRowGroups;
            setTimeout(() => {

                let header_1 = matrix.rows.root.children[0];
                let header_1_1 = header_1.children[0];
                let header_1_1_1 = header_1_1.children[0];
                let header_1_1_2 = header_1_1.children[1];
                let header_1_2 = header_1.children[1];
                let header_1_2_1 = header_1_2.children[0];
                let header_1_2_2 = header_1_2.children[1];
                let header_2 = matrix.rows.root.children[1];
                let header_2_1 = header_2.children[0];
                let header_2_1_1 = header_2_1.children[0];
                let header_2_1_2 = header_2_1.children[1];
                let header_2_2 = header_2.children[1];
                let header_2_2_1 = header_2_2.children[0];
                let header_2_2_2 = header_2_2.children[1];
                let cellValue1 = formatter(header_1_1_1.values[0].value, measureSource1);
                let cellValue2 = formatter(header_1_1_1.values[1].value, measureSource2);
                let cellValue3 = formatter(header_1_1_1.values[2].value, measureSource3);
                let cellValue4 = formatter(header_1_1_2.values[0].value, measureSource1);
                let cellValue5 = formatter(header_1_1_2.values[1].value, measureSource2);
                let cellValue6 = formatter(header_1_1_2.values[2].value, measureSource3);
                let cellValue7 = formatter(header_1_2_1.values[0].value, measureSource1);
                let cellValue8 = formatter(header_1_2_1.values[1].value, measureSource2);
                let cellValue9 = formatter(header_1_2_1.values[2].value, measureSource3);
                let cellValue10 = formatter(header_1_2_2.values[0].value, measureSource1);
                let cellValue11 = formatter(header_1_2_2.values[1].value, measureSource2);
                let cellValue12 = formatter(header_1_2_2.values[2].value, measureSource3);
                let cellValue13 = formatter(header_2_1_1.values[0].value, measureSource1);
                let cellValue14 = formatter(header_2_1_1.values[1].value, measureSource2);
                let cellValue15 = formatter(header_2_1_1.values[2].value, measureSource3);
                let cellValue16 = formatter(header_2_1_2.values[0].value, measureSource1);
                let cellValue17 = formatter(header_2_1_2.values[1].value, measureSource2);
                let cellValue18 = formatter(header_2_1_2.values[2].value, measureSource3);
                let cellValue19 = formatter(header_2_2_1.values[0].value, measureSource1);
                let cellValue20 = formatter(header_2_2_1.values[1].value, measureSource2);
                let cellValue21 = formatter(header_2_2_1.values[2].value, measureSource3);
                let cellValue22 = formatter(header_2_2_2.values[0].value, measureSource1);
                let cellValue23 = formatter(header_2_2_2.values[1].value, measureSource2);
                let cellValue24 = formatter(header_2_2_2.values[2].value, measureSource3);

                let expectedCells: string[][] = [
                    [rowGroupSource1.displayName, rowGroupSource2.displayName, rowGroupSource3.displayName, measureSource1.displayName, measureSource2.displayName, measureSource3.displayName, ""],
                    [header_1.value, header_1_1.value, header_1_1_1.value, cellValue1, cellValue2, cellValue3],
                    [header_1_1_2.value, cellValue4, cellValue5, cellValue6],
                    [header_1_2.value, header_1_2_1.value, cellValue7, cellValue8, cellValue9],
                    [header_1_2_2.value, cellValue10, cellValue11, cellValue12],
                    [header_2.value, header_2_1.value, header_2_1_1.value, cellValue13, cellValue14, cellValue15],
                    [header_2_1_2.value, cellValue16, cellValue17, cellValue18],
                    [header_2_2.value, header_2_2_1.value, cellValue19, cellValue20, cellValue21],
                    [header_2_2_2.value, cellValue22, cellValue23, cellValue24]
                ];

                validateMatrix(expectedCells);

                let expectedClassNames: string[][] = [
                    [ColumnHeaderLeafClass, ColumnHeaderLeafClass, ColumnHeaderLeafClass + " " + RowHeaderLeafClass, ColumnHeaderLeafClass + NumericCellClassName, ColumnHeaderLeafClass + NumericCellClassName, ColumnHeaderLeafClass + NumericCellClassName, ""],
                    [HeaderClass, HeaderClass, RowHeaderStaticLeafClass, BodyCellClass, BodyCellClass, BodyCellClass],
                    [RowHeaderStaticLeafClass, BodyCellClass, BodyCellClass, BodyCellClass],
                    [HeaderClass, RowHeaderStaticLeafClass, BodyCellClass, BodyCellClass, BodyCellClass],
                    [RowHeaderStaticLeafClass, BodyCellClass, BodyCellClass, BodyCellClass],
                    [HeaderClass, HeaderClass, RowHeaderStaticLeafClass, BodyCellClass, BodyCellClass, BodyCellClass],
                    [RowHeaderStaticLeafClass, BodyCellClass, BodyCellClass, BodyCellClass],
                    [HeaderClass, RowHeaderStaticLeafClass, BodyCellClass, BodyCellClass, BodyCellClass],
                    [RowHeaderStaticLeafClass, BodyCellClass, BodyCellClass, BodyCellClass]
                ];

                validateClassNames(expectedClassNames);

                done();
            }, DefaultWaitForRender);
        });

        it("2x2 matrix (value, static column header and row value header)", (done) => {

            let matrix = matrixOneMeasureOneRowGroupOneGroupInstance;
            v.onDataChanged({
                dataViews: [{
                    metadata: { columns: [rowGroupSource1, measureSource1] },
                    matrix: matrix
                }]
            });

            setTimeout(() => {

                let header = matrix.rows.root.children[0];
                let cellValue: string = formatter(header.values[0].value, measureSource1);

                let expectedCells: string[][] = [
                    [rowGroupSource1.displayName, measureSource1.displayName, ""],
                    [header.value, cellValue]
                ];

                validateMatrix(expectedCells);

                let expectedClassNames: string[][] = [
                    [ColumnHeaderLeafClass + " " + RowHeaderLeafClass, ColumnHeaderLeafClass + NumericCellClassName, ""],
                    [RowHeaderTopLevelStaticLeafClass, BodyCellClass]
                ];

                validateClassNames(expectedClassNames);

                done();
            }, DefaultWaitForRender);
        });

        it("2x2 matrix (value, column value header and row value header, empty cell)", (done) => {

            let matrix = matrixOneRowGroupOneColumnGroupOneGroupInstance;
            v.onDataChanged({
                dataViews: [matrixOneRowGroupOneColumnGroupOneGroupInstanceDataView]
            });

            setTimeout(() => {

                let columnHeader = matrix.columns.root.children[0];
                let rowHeader = matrix.rows.root.children[0];

                let expectedCells: string[][] = [
                    [rowGroupSource1.displayName, columnHeader.value.toString(), ""],
                    [rowHeader.value.toString(), ""]
                ];

                validateMatrix(expectedCells);

                done();
            }, DefaultWaitForRender);
        });

        it("3x2 matrix (static column headers and row value headers)", (done) => {

            let matrix = matrixThreeRowGroupsOneGroupInstance;
            v.onDataChanged({
                dataViews: [matrixThreeRowGroupsOneGroupInstanceDataView]
            });

            setTimeout(() => {

                let rowHeader_1 = matrix.rows.root.children[0];
                let rowHeader_1_1 = rowHeader_1.children[0];
                let rowHeader_1_1_1 = rowHeader_1_1.children[0];

                let expectedCells: string[][] = [
                    [rowGroupSource1.displayName, rowGroupSource2.displayName, rowGroupSource3.displayName, ""],
                    [rowHeader_1.value, rowHeader_1_1.value, rowHeader_1_1_1.value.toString()]
                ];

                validateMatrix(expectedCells);

                let expectedClassNames: string[][] = [
                    [ColumnHeaderLeafClass, ColumnHeaderLeafClass, ColumnHeaderLeafClass + " " + RowHeaderLeafClass, ""],
                    [HeaderClass, HeaderClass, RowHeaderLeafClass]
                ];

                validateClassNames(expectedClassNames);

                done();
            }, DefaultWaitForRender);
        });

        it("2x6 matrix (static column headers and row value headers including empty ones)", (done) => {

            let matrix = matrixTwoRowGroupsWithNullValues;
            v.onDataChanged({
                dataViews: [{
                    metadata: {
                        columns:
                        [
                            rowGroupSource1,
                            rowGroupSource2
                        ]
                    },
                    matrix: matrix
                }]
            });

            setTimeout(() => {

                let header_1 = matrix.rows.root.children[0];
                let header_1_2 = header_1.children[1];
                let header_2 = matrix.rows.root.children[1];
                let header_2_1 = header_2.children[0];

                let expectedCells: string[][] = [
                    [rowGroupSource1.displayName, rowGroupSource2.displayName, ""],
                    [header_1.value, EmptyHeaderCell],
                    [header_1_2.value],
                    [header_2.value, header_2_1.value],
                    [EmptyHeaderCell],
                    [EmptyHeaderCell, EmptyHeaderCell]
                ];

                validateMatrix(expectedCells);

                let expectedClassNames: string[][] = [
                    [ColumnHeaderLeafClass, ColumnHeaderLeafClass + " " + RowHeaderLeafClass, ""],
                    [HeaderClass, RowHeaderStaticLeafClass],
                    [RowHeaderStaticLeafClass],
                    [HeaderClass, RowHeaderStaticLeafClass],
                    [RowHeaderStaticLeafClass],
                    [HeaderClass, RowHeaderStaticLeafClass]
                ];

                validateClassNames(expectedClassNames);

                done();
            }, DefaultWaitForRender);
        });

        it("5x2 matrix (column value headers including empty ones)", (done) => {

            let matrix = <DataViewMatrix><any>matrixTwoColumnGroupsWithNullValues;
            v.onDataChanged({
                dataViews: [{
                    metadata: {
                        columns:
                        [
                            columnGroupSource1,
                            columnGroupSource2
                        ]
                    },
                    matrix: matrix
                }]
            });

            setTimeout(() => {

                let header_1 = matrix.columns.root.children[0];
                let header_1_2 = header_1.children[1];
                let header_2 = matrix.columns.root.children[1];
                let header_2_1 = header_2.children[0];

                let expectedCells: string[][] = [
                    ["", header_1.value, header_2.value, EmptyHeaderCell, ""],
                    ["", EmptyHeaderCell, header_1_2.value, header_2_1.value, EmptyHeaderCell, EmptyHeaderCell]
                ];

                validateMatrix(expectedCells);

                let expectedClassNames: string[][] = [
                    [HeaderClass, HeaderClass + NumericCellClassName, HeaderClass + NumericCellClassName, HeaderClass + NumericCellClassName, ""],
                    [HeaderClass, ColumnHeaderLeafClass + NumericCellClassName, ColumnHeaderLeafClass + NumericCellClassName, ColumnHeaderLeafClass + NumericCellClassName, ColumnHeaderLeafClass + NumericCellClassName, ColumnHeaderLeafClass + NumericCellClassName]
                ];

                validateClassNames(expectedClassNames);

                done();
            }, DefaultWaitForRender);
        });

        it("3x9 matrix (static column headers and row value headers)", (done) => {

            let matrix = matrixThreeRowGroups;
            v.onDataChanged({
                dataViews: [{
                    metadata: {
                        columns:
                        [
                            rowGroupSource1,
                            rowGroupSource2,
                            rowGroupSource3
                        ]
                    },
                    matrix: matrix
                }]
            });

            setTimeout(() => {

                let header_1 = matrix.rows.root.children[0];
                let header_1_1 = header_1.children[0];
                let header_1_1_1 = header_1_1.children[0];
                let header_1_1_2 = header_1_1.children[1];
                let header_1_2 = header_1.children[1];
                let header_1_2_1 = header_1_2.children[0];
                let header_1_2_2 = header_1_2.children[1];
                let header_2 = matrix.rows.root.children[1];
                let header_2_1 = header_2.children[0];
                let header_2_1_1 = header_2_1.children[0];
                let header_2_1_2 = header_2_1.children[1];
                let header_2_2 = header_2.children[1];
                let header_2_2_1 = header_2_2.children[0];
                let header_2_2_2 = header_2_2.children[1];

                let expectedCells: string[][] = [
                    [rowGroupSource1.displayName, rowGroupSource2.displayName, rowGroupSource3.displayName, ""],
                    [header_1.value, header_1_1.value, header_1_1_1.value.toString()],
                    [header_1_1_2.value.toString()],
                    [header_1_2.value, header_1_2_1.value.toString()],
                    [header_1_2_2.value.toString()],
                    [header_2.value, header_2_1.value, header_2_1_1.value.toString()],
                    [header_2_1_2.value.toString()],
                    [header_2_2.value, header_2_2_1.value.toString()],
                    [header_2_2_2.value.toString()]
                ];

                validateMatrix(expectedCells);

                done();
            }, DefaultWaitForRender);
        });

        it("1x1 matrix loadMoreData", () => {

            let matrix: DataViewMatrix = {
                rows: {
                    root: {
                        children: [{
                            level: 0,
                            value: "1"
                        }]
                    },
                    levels: [{ sources: [rowGroupSource1] }]
                },
                columns: {
                    root: {
                        children: []
                    },
                    levels: []
                },
                valueSources: []
            };

            v.onDataChanged({
                dataViews: [{
                    metadata: {
                        columns:
                        [
                            rowGroupSource1
                        ]
                    },
                    matrix: matrix
                }]
            });

            let segment2: DataViewMatrix = {
                rows: {
                    root: {
                        children: [{
                            level: 0,
                            value: "2"
                        }]
                    },
                    levels: [{ sources: [rowGroupSource1] }]
                },
                columns: {
                    root: {
                        children: []
                    },
                    levels: []
                },
                valueSources: []
            };

            // Simulate a load more merge
            powerbi.data.segmentation.DataViewMerger.mergeTreeNodes(matrix.rows.root, segment2.rows.root, false);
            v.onDataChanged({
                dataViews: [{
                    metadata: {
                        columns:
                        [
                            rowGroupSource1
                        ]
                    },
                    matrix: matrix
                }],
                operationKind: powerbi.VisualDataChangeOperationKind.Append
            });

            let header1 = matrix.rows.root.children[0];
            let header2 = matrix.rows.root.children[1];

            let expectedCells: string[][] = [
                [rowGroupSource1.displayName, ""],
                [header1.value],
                [header2.value]
            ];

            validateMatrix(expectedCells);
        });

        it("8x3 matrix (column value headers)", (done) => {

            let matrix = matrixThreeColumnGroups;
            v.onDataChanged({
                dataViews: [matrixThreeColumnGroupsDataView]
            });

            setTimeout(() => {

                let header_1 = matrix.columns.root.children[0];
                let header_1_1 = header_1.children[0];
                let header_1_1_1 = header_1_1.children[0].value.toString();
                let header_1_1_2 = header_1_1.children[1].value.toString();
                let header_1_2 = header_1.children[1];
                let header_1_2_1 = header_1_2.children[0].value.toString();
                let header_1_2_2 = header_1_2.children[1].value.toString();
                let header_2 = matrix.columns.root.children[1];
                let header_2_1 = header_2.children[0];
                let header_2_1_1 = header_2_1.children[0].value.toString();
                let header_2_1_2 = header_2_1.children[1].value.toString();
                let header_2_2 = header_2.children[1];
                let header_2_2_1 = header_2_2.children[0].value.toString();
                let header_2_2_2 = header_2_2.children[1].value.toString();

                let expectedCells: string[][] = [
                    ["", header_1.value, header_2.value, ""],
                    ["", header_1_1.value, header_1_2.value, header_2_1.value, header_2_2.value],
                    ["", header_1_1_1, header_1_1_2, header_1_2_1, header_1_2_2, header_2_1_1, header_2_1_2, header_2_2_1, header_2_2_2]
                ];

                validateMatrix(expectedCells);

                done();
            }, DefaultWaitForRender);
        });

        it("6x5 matrix (column value headers and row value headers, multiple group instances, empty cells)", (done) => {

            let matrix = matrixThreeRowGroupsThreeColumnGroups;
            v.onDataChanged({
                dataViews: [{
                    metadata: {
                        columns:
                        [
                            rowGroupSource1,
                            rowGroupSource2,
                            rowGroupSource3formatted,
                            columnGroupSource1,
                            columnGroupSource2,
                            columnGroupSource3formatted
                        ]
                    },
                    matrix: matrix
                }]
            });

            setTimeout(() => {

                let rowHeader_1 = matrix.rows.root.children[0];
                let rowHeader_1_1 = rowHeader_1.children[0];
                let rowHeaderValue_1_1_1 = formatter(rowHeader_1_1.children[0].value, rowGroupSource3formatted);
                let rowHeaderValue_1_1_2 = formatter(rowHeader_1_1.children[1].value, rowGroupSource3formatted);
                let rowHeader_1_2 = rowHeader_1.children[1];
                let rowHeaderValue_1_2_1 = formatter(rowHeader_1_2.children[0].value, rowGroupSource3formatted);
                let colHeader_1 = matrix.columns.root.children[0];
                let colHeader_1_1 = colHeader_1.children[0];
                let colHeaderValue_1_1_1 = formatter(colHeader_1_1.children[0].value, columnGroupSource3formatted);
                let colHeaderValue_1_1_2 = formatter(colHeader_1_1.children[1].value, columnGroupSource3formatted);
                let colHeader_1_2 = colHeader_1.children[1];
                let colHeaderValue_1_2_1 = formatter(colHeader_1_2.children[0].value, columnGroupSource3formatted);

                let expectedCells: string[][] = [
                    ["", "", columnGroupSource1.displayName, colHeader_1.value, ""],
                    ["", "", columnGroupSource2.displayName, colHeader_1_1.value, colHeader_1_2.value],
                    [rowGroupSource1.displayName, rowGroupSource2.displayName, rowGroupSource3.displayName, colHeaderValue_1_1_1, colHeaderValue_1_1_2, colHeaderValue_1_2_1],
                    [rowHeader_1.value, rowHeader_1_1.value, rowHeaderValue_1_1_1, "", "", ""],
                    [rowHeaderValue_1_1_2, "", "", ""],
                    [rowHeader_1_2.value, rowHeaderValue_1_2_1, "", "", ""]
                ];

                validateMatrix(expectedCells);

                done();
            }, DefaultWaitForRender);
        });

        it("3x4 matrix (boolean and null group instances)", (done) => {

            let matrix = matrixRowGroupColumnGroupWithBooleanAndNullOneMeasure;
            v.onDataChanged({
                dataViews: [{
                    metadata: {
                        columns:
                        [
                            rowGroupSource4,
                            columnGroupSource4,
                            measureSource1
                        ]
                    },
                    matrix: matrix
                }]
            });

            setTimeout(() => {

                let colHeader1 = matrix.columns.root.children[0];
                let colHeader2 = matrix.columns.root.children[1];
                let rowHeader1 = matrix.rows.root.children[0];
                let rowHeader2 = matrix.rows.root.children[1];
                let rowHeader3 = matrix.rows.root.children[2];

                let expectedCells: string[][] = [
                    [rowGroupSource4.displayName, colHeader1.value.toString(), colHeader2.value.toString(), ""],
                    [rowHeader1.value.toString(), formatter(rowHeader1.values[0].value, measureSource1), formatter(rowHeader1.values[1].value, measureSource1)],
                    [rowHeader2.value.toString(), formatter(rowHeader2.values[0].value, measureSource1), formatter(rowHeader2.values[1].value, measureSource1)],
                    [EmptyHeaderCell, formatter(rowHeader3.values[0].value, measureSource1), formatter(rowHeader3.values[1].value, measureSource1)]
                ];

                validateMatrix(expectedCells);

                done();
            }, DefaultWaitForRender);
        });

        it("Matrix with row and column subtotals", (done) => {

            let matrix = matrixRowGroupColumnGroupWithBooleanAndNullOneMeasureBothTotals;
            v.onDataChanged({
                dataViews: [{
                    metadata: {
                        columns:
                        [
                            rowGroupSource4,
                            columnGroupSource4,
                            measureSource1
                        ],
                        objects: {
                            general: {
                                rowSubtotals: true,
                                columnSubtotals: true
                            }
                        }
                    },
                    matrix: matrix
                }]
            });

            setTimeout(() => {

                let colHeader1 = matrix.columns.root.children[0];
                let colHeader2 = matrix.columns.root.children[1];
                let rowHeader1 = matrix.rows.root.children[0];
                let rowHeader2 = matrix.rows.root.children[1];
                let rowHeader3 = matrix.rows.root.children[2];
                let rowHeader4 = matrix.rows.root.children[3];

                let expectedCells: string[][] = [
                    [rowGroupSource4.displayName, colHeader1.value.toString(), colHeader2.value.toString(), TableTotalLabel, ""],
                    [rowHeader1.value.toString(), formatter(rowHeader1.values[0].value, measureSource1), formatter(rowHeader1.values[1].value, measureSource1), formatter(rowHeader1.values[2].value, measureSource1)],
                    [rowHeader2.value.toString(), formatter(rowHeader2.values[0].value, measureSource1), formatter(rowHeader2.values[1].value, measureSource1), formatter(rowHeader2.values[2].value, measureSource1)],
                    [EmptyHeaderCell, formatter(rowHeader3.values[0].value, measureSource1), formatter(rowHeader3.values[1].value, measureSource1), formatter(rowHeader3.values[2].value, measureSource1)],
                    [TableTotalLabel, formatter(rowHeader4.values[0].value, measureSource1), formatter(rowHeader4.values[1].value, measureSource1), formatter(rowHeader4.values[2].value, measureSource1)]
                ];

                validateMatrix(expectedCells);

                let expectedClassNames: string[][] = [
                    [ColumnHeaderLeafClass + " " + RowHeaderLeafClass, ColumnHeaderLeafClass + NumericCellClassName, ColumnHeaderLeafClass + NumericCellClassName, ColumnHeaderLeafClass + " " + TotalClass + NumericCellClassName, ""],
                    [RowHeaderTopLevelStaticLeafClass, BodyCellClass, BodyCellClass, BodyCellClass + " " + TotalClass],
                    [RowHeaderTopLevelStaticLeafClass, BodyCellClass, BodyCellClass, BodyCellClass + " " + TotalClass],
                    [RowHeaderTopLevelStaticLeafClass, BodyCellClass, BodyCellClass, BodyCellClass + " " + TotalClass],
                    [RowHeaderTopLevelStaticLeafClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass]
                ];

                validateClassNames(expectedClassNames);

                done();
            }, DefaultWaitForRender);
        });

        it("ensure matrix items tooltip", (done) => {
            let matrix = matrixWithBigValues;
            v.onDataChanged({
                dataViews: [{
                    metadata: {
                        columns:
                        [
                            rowGroupSource4,
                            columnGroupSource4,
                            measureSource1
                        ],
                        objects: {
                            general: {
                                rowSubtotals: true,
                                columnSubtotals: true
                            }
                        }
                    },
                    matrix: matrix
                }]
            });

            setTimeout(() => {
                
                //test matrix items
                for (let i = 0; i < matrixWithBigValues.rows.root.children.length; i++) {
                    validateMatrixTooltip(BodyCellClass, matrixWithBigValues.rows.root.children[i].values,i);
                }

                done();
            }, DefaultWaitForRender);
        });

        it("header sort arrow up", (done) => {

            let dataView = matrixOneMeasureDataViewSortAscending;
            v.onDataChanged({ dataViews: [dataView] });

            setTimeout(() => {
                let expectedCells: string[] =
                    ['powervisuals-glyph caret-up','powervisuals-glyph caret-down'];

                validateSortIcons(expectedCells);
                done();
            }, DefaultWaitForRender);
        });

        it("header sort arrow down", (done) => {

            let dataView = matrixOneMeasureDataViewSortDescending;
            v.onDataChanged({ dataViews: [dataView] });

            setTimeout(() => {
                let expectedCells: string[] =
                    ['powervisuals-glyph caret-down','powervisuals-glyph caret-up'];

                validateSortIcons(expectedCells);
                done();
            }, DefaultWaitForRender);
        });

        it("Matrix with multiple row and column group hierarchy levels, one measure with subtotals", (done) => {
            let matrix = matrixTwoRowGroupsTwoColumnGroupsOneMeasureAndTotals;
            v.onDataChanged({
                dataViews: [{
                    metadata: {
                        columns:
                        [
                            rowGroupSource1,
                            rowGroupSource2,
                            columnGroupSource1,
                            columnGroupSource2,
                            measureSource1
                        ],
                        objects: {
                            general: {
                                rowSubtotals: true,
                                columnSubtotals: true
                            }
                        }
                    },
                    matrix: matrix
                }]
            });

            setTimeout(() => {

                let colHeader1 = matrix.columns.root.children[0];
                let colHeader2 = matrix.columns.root.children[1];
                let colHeader1_1 = matrix.columns.root.children[0].children[0];
                let colHeader1_2 = matrix.columns.root.children[0].children[1];
                let colHeader2_1 = matrix.columns.root.children[1].children[0];
                let colHeader2_2 = matrix.columns.root.children[1].children[1];

                let rowHeader1 = matrix.rows.root.children[0];
                let rowHeader2 = matrix.rows.root.children[1];
                let rowHeader3 = matrix.rows.root.children[2];
                let rowHeader4 = matrix.rows.root.children[3];
                let rowHeadert = matrix.rows.root.children[4];

                let rowHeader1_1 = matrix.rows.root.children[0].children[0];
                let rowHeader1_2 = matrix.rows.root.children[0].children[1];
                let rowHeader1_t = matrix.rows.root.children[0].children[2];
                let rowHeader2_1 = matrix.rows.root.children[1].children[0];
                let rowHeader2_2 = matrix.rows.root.children[1].children[1];
                let rowHeader2_t = matrix.rows.root.children[1].children[2];
                let rowHeader3_1 = matrix.rows.root.children[2].children[0];
                let rowHeader3_t = matrix.rows.root.children[2].children[1];
                let rowHeader4_1 = matrix.rows.root.children[3].children[0];
                let rowHeader4_t = matrix.rows.root.children[3].children[1];

                let expectedCells: string[][] = [
                    ["", columnGroupSource1.displayName, colHeader1.value.toString(), colHeader2.value.toString(), TableTotalLabel, ""],
                    [rowGroupSource1.displayName, rowGroupSource2.displayName, colHeader1_1.value.toString(), colHeader1_2.value.toString(), TableTotalLabel, colHeader2_1.value.toString(), colHeader2_2.value.toString(), TableTotalLabel],
                    [rowHeader1.value.toString(), rowHeader1_1.value.toString(), formatter(rowHeader1_1.values[0].value, measureSource1), formatter(rowHeader1_1.values[1].value, measureSource1), formatter(rowHeader1_1.values[2].value, measureSource1), formatter(rowHeader1_1.values[3].value, measureSource1), formatter(rowHeader1_1.values[4].value, measureSource1), formatter(rowHeader1_1.values[5].value, measureSource1), formatter(rowHeader1_1.values[6].value, measureSource1)],
                    [rowHeader1_2.value.toString(), formatter(rowHeader1_2.values[0].value, measureSource1), formatter(rowHeader1_2.values[1].value, measureSource1), formatter(rowHeader1_2.values[2].value, measureSource1), formatter(rowHeader1_2.values[3].value, measureSource1), formatter(rowHeader1_2.values[4].value, measureSource1), formatter(rowHeader1_2.values[5].value, measureSource1), formatter(rowHeader1_2.values[6].value, measureSource1)],
                    [TableTotalLabel, formatter(rowHeader1_t.values[0].value, measureSource1), formatter(rowHeader1_t.values[1].value, measureSource1), formatter(rowHeader1_t.values[2].value, measureSource1), formatter(rowHeader1_t.values[3].value, measureSource1), formatter(rowHeader1_t.values[4].value, measureSource1), formatter(rowHeader1_t.values[5].value, measureSource1), formatter(rowHeader1_t.values[6].value, measureSource1)],
                    [rowHeader2.value.toString(), rowHeader2_1.value.toString(), formatter(rowHeader2_1.values[0].value, measureSource1), formatter(rowHeader2_1.values[1].value, measureSource1), formatter(rowHeader2_1.values[2].value, measureSource1), formatter(rowHeader2_1.values[3].value, measureSource1), formatter(rowHeader2_1.values[4].value, measureSource1), formatter(rowHeader2_1.values[5].value, measureSource1), formatter(rowHeader2_1.values[6].value, measureSource1)],
                    [rowHeader2_2.value.toString(), formatter(rowHeader2_2.values[0].value, measureSource1), formatter(rowHeader2_2.values[1].value, measureSource1), formatter(rowHeader2_2.values[2].value, measureSource1), formatter(rowHeader2_2.values[3].value, measureSource1), formatter(rowHeader2_2.values[4].value, measureSource1), formatter(rowHeader2_2.values[5].value, measureSource1), formatter(rowHeader2_2.values[6].value, measureSource1)],
                    [TableTotalLabel, formatter(rowHeader2_t.values[0].value, measureSource1), formatter(rowHeader2_t.values[1].value, measureSource1), formatter(rowHeader2_t.values[2].value, measureSource1), formatter(rowHeader2_t.values[3].value, measureSource1), formatter(rowHeader2_t.values[4].value, measureSource1), formatter(rowHeader2_t.values[5].value, measureSource1), formatter(rowHeader2_t.values[6].value, measureSource1)],
                    [rowHeader3.value.toString(), rowHeader3_1.value.toString(), formatter(rowHeader3_1.values[0].value, measureSource1), formatter(rowHeader3_1.values[1].value, measureSource1), formatter(rowHeader3_1.values[2].value, measureSource1), formatter(rowHeader3_1.values[3].value, measureSource1), formatter(rowHeader3_1.values[4].value, measureSource1), formatter(rowHeader3_1.values[5].value, measureSource1), formatter(rowHeader3_1.values[6].value, measureSource1)],
                    [TableTotalLabel, formatter(rowHeader3_t.values[0].value, measureSource1), formatter(rowHeader3_t.values[1].value, measureSource1), formatter(rowHeader3_t.values[2].value, measureSource1), formatter(rowHeader3_t.values[3].value, measureSource1), formatter(rowHeader3_t.values[4].value, measureSource1), formatter(rowHeader3_t.values[5].value, measureSource1), formatter(rowHeader3_t.values[6].value, measureSource1)],
                    [rowHeader4.value.toString(), rowHeader4_1.value.toString(), formatter(rowHeader4_1.values[0].value, measureSource1), formatter(rowHeader4_1.values[1].value, measureSource1), formatter(rowHeader4_1.values[2].value, measureSource1), formatter(rowHeader4_1.values[3].value, measureSource1), formatter(rowHeader4_1.values[4].value, measureSource1), formatter(rowHeader4_1.values[5].value, measureSource1), formatter(rowHeader4_1.values[6].value, measureSource1)],
                    [TableTotalLabel, formatter(rowHeader4_t.values[0].value, measureSource1), formatter(rowHeader4_t.values[1].value, measureSource1), formatter(rowHeader4_t.values[2].value, measureSource1), formatter(rowHeader4_t.values[3].value, measureSource1), formatter(rowHeader4_t.values[4].value, measureSource1), formatter(rowHeader4_t.values[5].value, measureSource1), formatter(rowHeader4_t.values[6].value, measureSource1)],
                    [TableTotalLabel, formatter(rowHeadert.values[0].value, measureSource1), formatter(rowHeadert.values[1].value, measureSource1), formatter(rowHeadert.values[2].value, measureSource1), formatter(rowHeadert.values[3].value, measureSource1), formatter(rowHeadert.values[4].value, measureSource1), formatter(rowHeadert.values[5].value, measureSource1), formatter(rowHeadert.values[6].value, measureSource1)]
                ];

                let expectedClassNames: string[][] = [
                    [HeaderClass, RowHeaderLeafClass, HeaderClass + NumericCellClassName, HeaderClass + NumericCellClassName, ColumnHeaderLeafClass + " " + TotalClass + NumericCellClassName, ""],
                    [ColumnHeaderLeafClass, ColumnHeaderLeafClass + " " + RowHeaderLeafClass, ColumnHeaderLeafClass + NumericCellClassName, ColumnHeaderLeafClass + NumericCellClassName, ColumnHeaderLeafClass + " " + TotalClass + NumericCellClassName, ColumnHeaderLeafClass + NumericCellClassName, ColumnHeaderLeafClass + NumericCellClassName, ColumnHeaderLeafClass + " " + TotalClass + NumericCellClassName],
                    [HeaderClass, RowHeaderStaticLeafClass, BodyCellClass, BodyCellClass, BodyCellClass + " " + TotalClass, BodyCellClass, BodyCellClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass],
                    [RowHeaderStaticLeafClass, BodyCellClass, BodyCellClass, BodyCellClass + " " + TotalClass, BodyCellClass, BodyCellClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass],
                    [RowHeaderStaticLeafClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass],
                    [HeaderClass, RowHeaderStaticLeafClass, BodyCellClass, BodyCellClass, BodyCellClass + " " + TotalClass, BodyCellClass, BodyCellClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass],
                    [RowHeaderStaticLeafClass, BodyCellClass, BodyCellClass, BodyCellClass + " " + TotalClass, BodyCellClass, BodyCellClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass],
                    [RowHeaderStaticLeafClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass],
                    [HeaderClass, RowHeaderStaticLeafClass, BodyCellClass, BodyCellClass, BodyCellClass + " " + TotalClass, BodyCellClass, BodyCellClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass],
                    [RowHeaderStaticLeafClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass],
                    [HeaderClass, RowHeaderStaticLeafClass, BodyCellClass, BodyCellClass, BodyCellClass + " " + TotalClass, BodyCellClass, BodyCellClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass],
                    [RowHeaderStaticLeafClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass],
                    [RowHeaderTopLevelStaticLeafClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass]
                ];

                validateClassNames(expectedClassNames);

                validateMatrix(expectedCells);

                done();
            }, DefaultWaitForRender);
        });

        it("Matrix with multiple row and column group hierarchy levels, two measures with subtotals", (done) => {
            let matrix = matrixTwoRowGroupsTwoColumnGroupsTwoMeasuresAndTotals;
            v.onDataChanged({
                dataViews: [{
                    metadata: {
                        columns:
                        [
                            rowGroupSource1,
                            rowGroupSource2,
                            columnGroupSource1,
                            columnGroupSource2,
                            measureSource1,
                            measureSource2
                        ],
                        objects: {
                            general: {
                                rowSubtotals: true,
                                columnSubtotals: true
                            }
                        }
                    },
                    matrix: matrix
                }]
            });

            setTimeout(() => {

                let colHeader1 = matrix.columns.root.children[0];
                let colHeader2 = matrix.columns.root.children[1];
                let colHeader1_1 = matrix.columns.root.children[0].children[0];
                let colHeader1_2 = matrix.columns.root.children[0].children[1];
                let colHeader2_1 = matrix.columns.root.children[1].children[0];
                let colHeader2_2 = matrix.columns.root.children[1].children[1];

                let rowHeader1 = matrix.rows.root.children[0];
                let rowHeader2 = matrix.rows.root.children[1];
                let rowHeader3 = matrix.rows.root.children[2];
                let rowHeader4 = matrix.rows.root.children[3];
                let rowHeadert = matrix.rows.root.children[4];

                let rowHeader1_1 = matrix.rows.root.children[0].children[0];
                let rowHeader1_2 = matrix.rows.root.children[0].children[1];
                let rowHeader1_t = matrix.rows.root.children[0].children[2];
                let rowHeader2_1 = matrix.rows.root.children[1].children[0];
                let rowHeader2_2 = matrix.rows.root.children[1].children[1];
                let rowHeader2_t = matrix.rows.root.children[1].children[2];
                let rowHeader3_1 = matrix.rows.root.children[2].children[0];
                let rowHeader3_t = matrix.rows.root.children[2].children[1];
                let rowHeader4_1 = matrix.rows.root.children[3].children[0];
                let rowHeader4_t = matrix.rows.root.children[3].children[1];

                let expectedCells: string[][] = [
                    ["", columnGroupSource1.displayName, colHeader1.value.toString(), colHeader2.value.toString(), TableTotalLabel, ""],
                    ["", columnGroupSource2.displayName, colHeader1_1.value.toString(), colHeader1_2.value.toString(), TableTotalLabel, colHeader2_1.value.toString(), colHeader2_2.value.toString(), TableTotalLabel],
                    [rowGroupSource1.displayName, rowGroupSource2.displayName, measureSource1.displayName, measureSource2.displayName, measureSource1.displayName, measureSource2.displayName, measureSource1.displayName, measureSource2.displayName, measureSource1.displayName, measureSource2.displayName, measureSource1.displayName, measureSource2.displayName, measureSource1.displayName, measureSource2.displayName, measureSource1.displayName, measureSource2.displayName],
                    [rowHeader1.value.toString(), rowHeader1_1.value.toString(), formatter(rowHeader1_1.values[0].value, measureSource1), formatter(rowHeader1_1.values[1].value, measureSource1), formatter(rowHeader1_1.values[2].value, measureSource1), formatter(rowHeader1_1.values[3].value, measureSource1), formatter(rowHeader1_1.values[4].value, measureSource1), formatter(rowHeader1_1.values[5].value, measureSource1), formatter(rowHeader1_1.values[6].value, measureSource1), formatter(rowHeader1_1.values[7].value, measureSource1), formatter(rowHeader1_1.values[8].value, measureSource1), formatter(rowHeader1_1.values[9].value, measureSource1), formatter(rowHeader1_1.values[10].value, measureSource1), formatter(rowHeader1_1.values[11].value, measureSource1), formatter(rowHeader1_1.values[12].value, measureSource1), formatter(rowHeader1_1.values[13].value, measureSource1)],
                    [rowHeader1_2.value.toString(), formatter(rowHeader1_2.values[0].value, measureSource1), formatter(rowHeader1_2.values[1].value, measureSource1), formatter(rowHeader1_2.values[2].value, measureSource1), formatter(rowHeader1_2.values[3].value, measureSource1), formatter(rowHeader1_2.values[4].value, measureSource1), formatter(rowHeader1_2.values[5].value, measureSource1), formatter(rowHeader1_2.values[6].value, measureSource1), formatter(rowHeader1_2.values[7].value, measureSource1), formatter(rowHeader1_2.values[8].value, measureSource1), formatter(rowHeader1_2.values[9].value, measureSource1), formatter(rowHeader1_2.values[10].value, measureSource1), formatter(rowHeader1_2.values[11].value, measureSource1), formatter(rowHeader1_2.values[12].value, measureSource1), formatter(rowHeader1_2.values[13].value, measureSource1)],
                    [TableTotalLabel, formatter(rowHeader1_t.values[0].value, measureSource1), formatter(rowHeader1_t.values[1].value, measureSource1), formatter(rowHeader1_t.values[2].value, measureSource1), formatter(rowHeader1_t.values[3].value, measureSource1), formatter(rowHeader1_t.values[4].value, measureSource1), formatter(rowHeader1_t.values[5].value, measureSource1), formatter(rowHeader1_t.values[6].value, measureSource1), formatter(rowHeader1_t.values[7].value, measureSource1), formatter(rowHeader1_t.values[8].value, measureSource1), formatter(rowHeader1_t.values[9].value, measureSource1), formatter(rowHeader1_t.values[10].value, measureSource1), formatter(rowHeader1_t.values[11].value, measureSource1), formatter(rowHeader1_t.values[12].value, measureSource1), formatter(rowHeader1_t.values[13].value, measureSource1)],
                    [rowHeader2.value.toString(), rowHeader2_1.value.toString(), formatter(rowHeader2_1.values[0].value, measureSource1), formatter(rowHeader2_1.values[1].value, measureSource1), formatter(rowHeader2_1.values[2].value, measureSource1), formatter(rowHeader2_1.values[3].value, measureSource1), formatter(rowHeader2_1.values[4].value, measureSource1), formatter(rowHeader2_1.values[5].value, measureSource1), formatter(rowHeader2_1.values[6].value, measureSource1), formatter(rowHeader2_1.values[7].value, measureSource1), formatter(rowHeader2_1.values[8].value, measureSource1), formatter(rowHeader2_1.values[9].value, measureSource1), formatter(rowHeader2_1.values[10].value, measureSource1), formatter(rowHeader2_1.values[11].value, measureSource1), formatter(rowHeader2_1.values[12].value, measureSource1), formatter(rowHeader2_1.values[13].value, measureSource1)],
                    [rowHeader2_2.value.toString(), formatter(rowHeader2_2.values[0].value, measureSource1), formatter(rowHeader2_2.values[1].value, measureSource1), formatter(rowHeader2_2.values[2].value, measureSource1), formatter(rowHeader2_2.values[3].value, measureSource1), formatter(rowHeader2_2.values[4].value, measureSource1), formatter(rowHeader2_2.values[5].value, measureSource1), formatter(rowHeader2_2.values[6].value, measureSource1), formatter(rowHeader2_2.values[7].value, measureSource1), formatter(rowHeader2_2.values[8].value, measureSource1), formatter(rowHeader2_2.values[9].value, measureSource1), formatter(rowHeader2_2.values[10].value, measureSource1), formatter(rowHeader2_2.values[11].value, measureSource1), formatter(rowHeader2_2.values[12].value, measureSource1), formatter(rowHeader2_2.values[13].value, measureSource1)],
                    [TableTotalLabel, formatter(rowHeader2_t.values[0].value, measureSource1), formatter(rowHeader2_t.values[1].value, measureSource1), formatter(rowHeader2_t.values[2].value, measureSource1), formatter(rowHeader2_t.values[3].value, measureSource1), formatter(rowHeader2_t.values[4].value, measureSource1), formatter(rowHeader2_t.values[5].value, measureSource1), formatter(rowHeader2_t.values[6].value, measureSource1), formatter(rowHeader2_t.values[7].value, measureSource1), formatter(rowHeader2_t.values[8].value, measureSource1), formatter(rowHeader2_t.values[9].value, measureSource1), formatter(rowHeader2_t.values[10].value, measureSource1), formatter(rowHeader2_t.values[11].value, measureSource1), formatter(rowHeader2_t.values[12].value, measureSource1), formatter(rowHeader2_t.values[13].value, measureSource1)],
                    [rowHeader3.value.toString(), rowHeader3_1.value.toString(), formatter(rowHeader3_1.values[0].value, measureSource1), formatter(rowHeader3_1.values[1].value, measureSource1), formatter(rowHeader3_1.values[2].value, measureSource1), formatter(rowHeader3_1.values[3].value, measureSource1), formatter(rowHeader3_1.values[4].value, measureSource1), formatter(rowHeader3_1.values[5].value, measureSource1), formatter(rowHeader3_1.values[6].value, measureSource1), formatter(rowHeader3_1.values[7].value, measureSource1), formatter(rowHeader3_1.values[8].value, measureSource1), formatter(rowHeader3_1.values[9].value, measureSource1), formatter(rowHeader3_1.values[10].value, measureSource1), formatter(rowHeader3_1.values[11].value, measureSource1), formatter(rowHeader3_1.values[12].value, measureSource1), formatter(rowHeader3_1.values[13].value, measureSource1)],
                    [TableTotalLabel, formatter(rowHeader3_t.values[0].value, measureSource1), formatter(rowHeader3_t.values[1].value, measureSource1), formatter(rowHeader3_t.values[2].value, measureSource1), formatter(rowHeader3_t.values[3].value, measureSource1), formatter(rowHeader3_t.values[4].value, measureSource1), formatter(rowHeader3_t.values[5].value, measureSource1), formatter(rowHeader3_t.values[6].value, measureSource1), formatter(rowHeader3_t.values[7].value, measureSource1), formatter(rowHeader3_t.values[8].value, measureSource1), formatter(rowHeader3_t.values[9].value, measureSource1), formatter(rowHeader3_t.values[10].value, measureSource1), formatter(rowHeader3_t.values[11].value, measureSource1), formatter(rowHeader3_t.values[12].value, measureSource1), formatter(rowHeader3_t.values[13].value, measureSource1)],
                    [rowHeader4.value.toString(), rowHeader4_1.value.toString(), formatter(rowHeader4_1.values[0].value, measureSource1), formatter(rowHeader4_1.values[1].value, measureSource1), formatter(rowHeader4_1.values[2].value, measureSource1), formatter(rowHeader4_1.values[3].value, measureSource1), formatter(rowHeader4_1.values[4].value, measureSource1), formatter(rowHeader4_1.values[5].value, measureSource1), formatter(rowHeader4_1.values[6].value, measureSource1), formatter(rowHeader4_1.values[7].value, measureSource1), formatter(rowHeader4_1.values[8].value, measureSource1), formatter(rowHeader4_1.values[9].value, measureSource1), formatter(rowHeader4_1.values[10].value, measureSource1), formatter(rowHeader4_1.values[11].value, measureSource1), formatter(rowHeader4_1.values[12].value, measureSource1), formatter(rowHeader4_1.values[13].value, measureSource1)],
                    [TableTotalLabel, formatter(rowHeader4_t.values[0].value, measureSource1), formatter(rowHeader4_t.values[1].value, measureSource1), formatter(rowHeader4_t.values[2].value, measureSource1), formatter(rowHeader4_t.values[3].value, measureSource1), formatter(rowHeader4_t.values[4].value, measureSource1), formatter(rowHeader4_t.values[5].value, measureSource1), formatter(rowHeader4_t.values[6].value, measureSource1), formatter(rowHeader4_t.values[7].value, measureSource1), formatter(rowHeader4_t.values[8].value, measureSource1), formatter(rowHeader4_t.values[9].value, measureSource1), formatter(rowHeader4_t.values[10].value, measureSource1), formatter(rowHeader4_t.values[11].value, measureSource1), formatter(rowHeader4_t.values[12].value, measureSource1), formatter(rowHeader4_t.values[13].value, measureSource1)],
                    [TableTotalLabel, formatter(rowHeadert.values[0].value, measureSource1), formatter(rowHeadert.values[1].value, measureSource1), formatter(rowHeadert.values[2].value, measureSource1), formatter(rowHeadert.values[3].value, measureSource1), formatter(rowHeadert.values[4].value, measureSource1), formatter(rowHeadert.values[5].value, measureSource1), formatter(rowHeadert.values[6].value, measureSource1), formatter(rowHeadert.values[7].value, measureSource1), formatter(rowHeadert.values[8].value, measureSource1), formatter(rowHeadert.values[9].value, measureSource1), formatter(rowHeadert.values[10].value, measureSource1), formatter(rowHeadert.values[11].value, measureSource1), formatter(rowHeadert.values[12].value, measureSource1), formatter(rowHeadert.values[13].value, measureSource1)]
                ];

                validateMatrix(expectedCells);

                let expectedClassNames: string[][] = [
                    [HeaderClass, RowHeaderLeafClass, HeaderClass + NumericCellClassName, HeaderClass + NumericCellClassName, HeaderClass + " " + TotalClass + NumericCellClassName, ""],
                    [HeaderClass, RowHeaderLeafClass, HeaderClass + NumericCellClassName, HeaderClass + NumericCellClassName, HeaderClass + " " + TotalClass + NumericCellClassName, HeaderClass + NumericCellClassName, HeaderClass + NumericCellClassName, HeaderClass + " " + TotalClass + NumericCellClassName],
                    [ColumnHeaderLeafClass, ColumnHeaderLeafClass + " " + RowHeaderLeafClass, ColumnHeaderLeafClass + NumericCellClassName, ColumnHeaderLeafClass + NumericCellClassName, ColumnHeaderLeafClass + NumericCellClassName, ColumnHeaderLeafClass + NumericCellClassName, ColumnHeaderLeafClass + " " + TotalClass + NumericCellClassName, ColumnHeaderLeafClass + " " + TotalClass + NumericCellClassName, ColumnHeaderLeafClass + NumericCellClassName, ColumnHeaderLeafClass + NumericCellClassName, ColumnHeaderLeafClass + NumericCellClassName, ColumnHeaderLeafClass + NumericCellClassName, ColumnHeaderLeafClass + " " + TotalClass + NumericCellClassName, ColumnHeaderLeafClass + " " + TotalClass + NumericCellClassName, ColumnHeaderLeafClass + " " + TotalClass + NumericCellClassName, ColumnHeaderLeafClass + " " + TotalClass + NumericCellClassName],
                    [HeaderClass, RowHeaderStaticLeafClass, BodyCellClass, BodyCellClass, BodyCellClass, BodyCellClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass, BodyCellClass, BodyCellClass, BodyCellClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass],
                    [RowHeaderStaticLeafClass, BodyCellClass, BodyCellClass, BodyCellClass, BodyCellClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass, BodyCellClass, BodyCellClass, BodyCellClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass],
                    [RowHeaderStaticLeafClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass],
                    [HeaderClass, RowHeaderStaticLeafClass, BodyCellClass, BodyCellClass, BodyCellClass, BodyCellClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass, BodyCellClass, BodyCellClass, BodyCellClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass],
                    [RowHeaderStaticLeafClass, BodyCellClass, BodyCellClass, BodyCellClass, BodyCellClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass, BodyCellClass, BodyCellClass, BodyCellClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass],
                    [RowHeaderStaticLeafClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass],
                    [HeaderClass, RowHeaderStaticLeafClass, BodyCellClass, BodyCellClass, BodyCellClass, BodyCellClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass, BodyCellClass, BodyCellClass, BodyCellClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass],
                    [RowHeaderStaticLeafClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass],
                    [HeaderClass, RowHeaderStaticLeafClass, BodyCellClass, BodyCellClass, BodyCellClass, BodyCellClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass, BodyCellClass, BodyCellClass, BodyCellClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass],
                    [RowHeaderStaticLeafClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass],
                    [RowHeaderTopLevelStaticLeafClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass]
                ];

                validateClassNames(expectedClassNames);

                done();
            }, DefaultWaitForRender);
        });

        it("Verify Interactivity mode - Dashboard", (done) => {

            // Pick a matrix that exceeds the viewport
            v.init({
                element: element,
                host: mocks.createVisualHostServices(),
                style: powerbi.visuals.visualStyles.create(),
                viewport: {
                    height: 100,
                    width: 100
                },
                interactivity: {
                    overflow: "hidden"
                }
            });

            v.onDataChanged({
                dataViews: [matrixTwoRowGroupsTwoColumnGroupsTwoMeasuresDataView]
            });

            setTimeout(() => {
                let scrollbars = $(".bi-tablix .scroll-bar-div");

                // Scrollbars are not attached to DOM for Dashboard
                expect(scrollbars.length).toBe(0);

                done();
            }, DefaultWaitForRender);
        });

        it("Verify Interactivity mode - Canvas", (done) => {
            let viewPort: powerbi.IViewport = {
                height: 100,
                width: 100
            };

            // Pick a matrix that exceeds the viewport
            v.init({
                element: element,
                host: mocks.createVisualHostServices(),
                style: powerbi.visuals.visualStyles.create(),
                viewport: viewPort,
                interactivity: {
                    selection: true
                }
            });

            v.onDataChanged({
                dataViews: [matrixTwoRowGroupsTwoColumnGroupsTwoMeasuresDataView]
            });

            setTimeout(() => {
                let scrollbars = $(".bi-tablix .scroll-bar-div");
                let verticalScrollBar = scrollbars.eq(0);
                let horizontalScrollBar = scrollbars.eq(1);

                // Scrollbars are attached to DOM for Canvas
                expect(scrollbars.length).toBe(2);
                expect(verticalScrollBar.css("width")).toBe("9px");
                expect(verticalScrollBar.width()).toBe(9);
                expect(horizontalScrollBar.css("height")).toBe("9px");
                expect(horizontalScrollBar.height()).toBe(9);

                viewPort = {
                    height: element.height(),
                    width: element.width()
                };
                v.onResizing(viewPort);

                setTimeout(() => {
                    scrollbars = $(".bi-tablix .scroll-bar-div");
                    expect(scrollbars.length).toBe(2);
                    if (scrollbars.length === 2) {
                        verticalScrollBar = scrollbars.eq(0);
                        horizontalScrollBar = scrollbars.eq(1);

                        // Scrollbars are attached to DOM for Canvas
                        expect(scrollbars.length).toBe(2);
                        expect(verticalScrollBar.css("width")).toBe("0px");
                        expect(verticalScrollBar.width()).toBe(0);
                        expect(horizontalScrollBar.css("height")).toBe("0px");
                        expect(horizontalScrollBar.height()).toBe(0);
                    }

                    done();
                }, DefaultWaitForRender);
            }, DefaultWaitForRender);
        });

        function formatter(value: any, source?: DataViewMetadataColumn): string {
            return valueFormatter.formatValueColumn(value, source, TablixUtils.TablixFormatStringProp);
        }
    });

    describe("Dashboard matrix DOM validation", () => {
        let v: powerbi.IVisual,
            element: JQuery,
            EmptyHeaderCell = "\xa0",
            ContainerClassName = 'bi-dashboard-tablix',
            NoMarginClass = "bi-tablix-cellNoMarginStyle",
            HeaderClass = "bi-tablix-header",
            ColumnHeaderLeafClass = "bi-tablix-column-header-leaf",
            RowHeaderLeafClass = "bi-tablix-row-header-leaf",
            RowHeaderStaticLeafClass = "bi-tablix-row-header-static-leaf",
            RowHeaderTopLevelStaticLeafClass = "bi-tablix-row-header-toplevel-static-leaf",
            BodyCellClass = "bi-matrix-body-cell",
            TotalClass = "total",
            NumericCellClassName = " bi-table-cell-numeric",
            TableTotalLabel = "Total";

        beforeEach(() => {
            element = powerbitests.helpers.testDom("700", "700");
            element["visible"] = () => { return true; };
            v = dashboardPluginService.getPlugin("matrix").create();
            v.init({
                element: element,
                host: mocks.createVisualHostServices(),
                style: powerbi.visuals.visualStyles.create(),
                viewport: {
                    height: element.height(),
                    width: element.width()
                },
                animation:
                {
                    transitionImmediate: true
                },
                interactivity: {
                    selection: null
                }
            });
        });

        function validateMatrix(expectedValues: string[][]): void {
            tablixHelper.validateMatrix(expectedValues, ".bi-dashboard-tablix tr");
        }

        function validateClassNames(expectedValues: string[][]): void {
            tablixHelper.validateClassNames(expectedValues, ".bi-dashboard-tablix tr", NoMarginClass);
        }

        describe('text size', () => {
            describe('default', () => {
                it('font size set on container', (done) => {
                    let matrix = matrixRowGroupColumnGroupWithBooleanAndNullOneMeasureBothTotals;
                    v.onDataChanged({
                        dataViews: [{
                            metadata: {
                                columns:
                                [
                                    rowGroupSource4,
                                    columnGroupSource4,
                                    measureSource1
                                ],
                                objects: {
                                    general: {
                                        rowSubtotals: true,
                                        columnSubtotals: true,
                                    }
                                }
                            },
                            matrix: matrix
                        }]
                    });

                    setTimeout(() => {
                        let actualFontSize = element.find(`.${ContainerClassName}`).css('font-size');
                        tablixHelper.validateFontSize(actualFontSize, 8);
                        done();
                    }, DefaultWaitForRender);
                });

                it("3x8 matrix with default text size row height", (done) => {
                    let matrix = matrixThreeRowGroups;
                    v.onDataChanged({
                        dataViews: [{
                            metadata: {
                                columns:
                                [
                                    rowGroupSource1,
                                    rowGroupSource2,
                                    rowGroupSource3
                                ]
                            },
                            matrix: matrix
                        }]
                    });

                    setTimeout(() => {
                        let cells = element
                            .find(`.${ColumnHeaderLeafClass}, .${HeaderClass}, .${RowHeaderStaticLeafClass}`)
                            .find('> div');

                        expect(cells.length).toBe(17);
                        tablixHelper.validateCellHeights(cells, 14);

                        done();
                    }, DefaultWaitForRender);
                });
            });

            describe('specified', () => {
                it("font size set on container", (done) => {
                    let matrix = matrixRowGroupColumnGroupWithBooleanAndNullOneMeasureBothTotals;
                    v.onDataChanged({
                        dataViews: [{
                            metadata: {
                                columns:
                                [
                                    rowGroupSource4,
                                    columnGroupSource4,
                                    measureSource1
                                ],
                                objects: {
                                    general: {
                                        rowSubtotals: true,
                                        columnSubtotals: true,
                                        textSize: 18,
                                    }
                                }
                            },
                            matrix: matrix
                        }]
                    });

                    setTimeout(() => {
                        let actualFontSize = element.find(`.${ContainerClassName}`).css('font-size');
                        tablixHelper.validateFontSize(actualFontSize, 18);
                        done();
                    }, DefaultWaitForRender);
                });

                it("3x8 matrix with specified text size adjusted row height", (done) => {
                    let matrix = matrixThreeRowGroups;
                    v.onDataChanged({
                        dataViews: [{
                            metadata: {
                                columns:
                                [
                                    rowGroupSource1,
                                    rowGroupSource2,
                                    rowGroupSource3
                                ],
                                objects: {
                                    general: {
                                        rowSubtotals: true,
                                        columnSubtotals: true,
                                        textSize: 14,
                                    }
                                },
                            },
                            matrix: matrix
                        }]
                    });

                    setTimeout(() => {
                        let cells = element
                            .find(`.${ColumnHeaderLeafClass}, .${HeaderClass}, .${RowHeaderStaticLeafClass}`)
                            .find('> div');

                        expect(cells.length).toBe(17);
                        tablixHelper.validateCellHeights(cells, 21);

                        done();
                    }, DefaultWaitForRender);
                });

                it("6x9 matrix with text size scaling factor adjusts minimum column width", (done) => {
                    v.onDataChanged({
                        dataViews: [matrixThreeMeasuresThreeRowGroupsDataViewIncreasedFontSize]
                    });

                    let matrix = matrixThreeMeasuresThreeRowGroups;
                    setTimeout(() => {
                        // Dashboard crops out columns which do not fit (minimum width based on text size)
                        let header_1 = matrix.rows.root.children[0];
                        let header_1_1 = header_1.children[0];
                        let header_1_1_1 = header_1_1.children[0];
                        let header_1_1_2 = header_1_1.children[1];
                        let header_1_2 = header_1.children[1];
                        let header_1_2_1 = header_1_2.children[0];
                        let header_1_2_2 = header_1_2.children[1];
                        let header_2 = matrix.rows.root.children[1];
                        let header_2_1 = header_2.children[0];
                        let header_2_1_1 = header_2_1.children[0];
                        let header_2_1_2 = header_2_1.children[1];
                        let header_2_2 = header_2.children[1];
                        let header_2_2_1 = header_2_2.children[0];
                        let header_2_2_2 = header_2_2.children[1];
                        let cellValue1 = formatter(header_1_1_1.values[0].value, measureSource1);
                        let cellValue4 = formatter(header_1_1_2.values[0].value, measureSource1);
                        let cellValue7 = formatter(header_1_2_1.values[0].value, measureSource1);
                        let cellValue10 = formatter(header_1_2_2.values[0].value, measureSource1);
                        let cellValue13 = formatter(header_2_1_1.values[0].value, measureSource1);
                        let cellValue16 = formatter(header_2_1_2.values[0].value, measureSource1);
                        let cellValue19 = formatter(header_2_2_1.values[0].value, measureSource1);
                        let cellValue22 = formatter(header_2_2_2.values[0].value, measureSource1);

                        let expectedCells: string[][] = [
                            [rowGroupSource1.displayName, rowGroupSource2.displayName, rowGroupSource3.displayName, measureSource1.displayName],
                            [header_1.value, header_1_1.value, header_1_1_1.value, cellValue1],
                            [header_1_1_2.value, cellValue4],
                            [header_1_2.value, header_1_2_1.value, cellValue7],
                            [header_1_2_2.value, cellValue10],
                            [header_2.value, header_2_1.value, header_2_1_1.value, cellValue13],
                            [header_2_1_2.value, cellValue16],
                            [header_2_2.value, header_2_2_1.value, cellValue19],
                            [header_2_2_2.value, cellValue22],
                        ];

                        validateMatrix(expectedCells);

                        let expectedClassNames: string[][] = [
                            [ColumnHeaderLeafClass, ColumnHeaderLeafClass, ColumnHeaderLeafClass + " " + RowHeaderLeafClass, ColumnHeaderLeafClass + NumericCellClassName],
                            [HeaderClass, HeaderClass, RowHeaderStaticLeafClass, BodyCellClass],
                            [RowHeaderStaticLeafClass, BodyCellClass],
                            [HeaderClass, RowHeaderStaticLeafClass, BodyCellClass],
                            [RowHeaderStaticLeafClass, BodyCellClass],
                            [HeaderClass, HeaderClass, RowHeaderStaticLeafClass, BodyCellClass],
                            [RowHeaderStaticLeafClass, BodyCellClass],
                            [HeaderClass, RowHeaderStaticLeafClass, BodyCellClass],
                            [RowHeaderStaticLeafClass, BodyCellClass],
                        ];

                        validateClassNames(expectedClassNames);

                        done();
                    }, DefaultWaitForRender);
                });
            });
        });

        it("1x2 matrix (value and static column header)", (done) => {

            let matrix = matrixOneMeasure;
            v.onDataChanged({
                dataViews: [matrixOneMeasureDataView]
            });

            setTimeout(() => {

                let cellValue: string = formatter(matrix.rows.root.children[0].values[0].value, measureSource1);
                let expectedCells: string[][] = [
                    ["", measureSource1.displayName],
                    [EmptyHeaderCell, cellValue]
                ];

                validateMatrix(expectedCells);

                let expectedClassNames: string[][] = [
                    [HeaderClass, ColumnHeaderLeafClass + NumericCellClassName],
                    [RowHeaderTopLevelStaticLeafClass, BodyCellClass]
                ];

                validateClassNames(expectedClassNames);

                done();
            }, DefaultWaitForRender);
        });

        it("1x2 matrix (value and column header value)", (done) => {

            let matrix = matrixOneMeasureOneColumnGroupOneGroupInstance;
            v.onDataChanged({
                dataViews: [matrixOneMeasureOneColumnGroupOneGroupInstanceDataView]
            });

            setTimeout(() => {

                let headerValue: string = matrix.columns.root.children[0].value;
                let cellValue: string = formatter(matrix.rows.root.children[0].values[0].value, measureSource1);

                let expectedCells: string[][] = [
                    ["", headerValue],
                    [EmptyHeaderCell, cellValue]
                ];

                validateMatrix(expectedCells);

                let expectedClassNames: string[][] = [
                    [HeaderClass, ColumnHeaderLeafClass + NumericCellClassName],
                    [RowHeaderTopLevelStaticLeafClass, BodyCellClass]
                ];

                validateClassNames(expectedClassNames);

                done();
            }, DefaultWaitForRender);
        });

        it("3x2 matrix (values and static column headers)", (done) => {

            let matrix = matrixThreeMeasures;
            v.onDataChanged({
                dataViews: [{
                    metadata: { columns: [measureSource1, measureSource2, measureSource3] },
                    matrix: matrix
                }]
            });

            setTimeout(() => {

                let cellValue1: string = formatter(matrix.rows.root.children[0].values[0].value, measureSource1);
                let cellValue2: string = formatter(matrix.rows.root.children[0].values[1].value, measureSource2);
                let cellValue3: string = formatter(matrix.rows.root.children[0].values[2].value, measureSource3);

                let expectedCells: string[][] = [
                    ["", measureSource1.displayName, measureSource2.displayName, measureSource3.displayName],
                    [EmptyHeaderCell, cellValue1, cellValue2, cellValue3]
                ];

                validateMatrix(expectedCells);

                let expectedClassNames: string[][] = [
                    [HeaderClass, ColumnHeaderLeafClass + NumericCellClassName, ColumnHeaderLeafClass + NumericCellClassName, ColumnHeaderLeafClass + NumericCellClassName],
                    [RowHeaderTopLevelStaticLeafClass, BodyCellClass, BodyCellClass, BodyCellClass]
                ];

                validateClassNames(expectedClassNames);

                done();
            }, DefaultWaitForRender);
        });

        it("3x3 matrix (values, static and value column headers)", (done) => {

            let matrix = matrixThreeMeasuresOneColumnGroupOneGroupInstance;
            v.onDataChanged({
                dataViews: [{
                    metadata: { columns: [columnGroupSource1, measureSource1, measureSource2, measureSource3] },
                    matrix: matrix
                }]
            });

            setTimeout(() => {

                let headerValue: string = matrix.columns.root.children[0].value;

                let cellValue1: string = formatter(matrix.rows.root.children[0].values[0].value, measureSource1);
                let cellValue2: string = formatter(matrix.rows.root.children[0].values[1].value, measureSource2);
                let cellValue3: string = formatter(matrix.rows.root.children[0].values[2].value, measureSource3);

                let expectedCells: string[][] = [
                    ["", headerValue],
                    ["", measureSource1.displayName, measureSource2.displayName, measureSource3.displayName],
                    [EmptyHeaderCell, cellValue1, cellValue2, cellValue3]
                ];

                validateMatrix(expectedCells);

                let expectedClassNames: string[][] = [
                    [HeaderClass, HeaderClass + NumericCellClassName],
                    [HeaderClass, ColumnHeaderLeafClass + NumericCellClassName, ColumnHeaderLeafClass + NumericCellClassName, ColumnHeaderLeafClass + NumericCellClassName],
                    [RowHeaderTopLevelStaticLeafClass, BodyCellClass, BodyCellClass, BodyCellClass]
                ];

                validateClassNames(expectedClassNames);

                done();
            }, DefaultWaitForRender);
        });

        it("6x9 matrix (values, static column headers and row value headers)", (done) => {

            v.onDataChanged({
                dataViews: [matrixThreeMeasuresThreeRowGroupsDataView]
            });

            let matrix = matrixThreeMeasuresThreeRowGroups;
            setTimeout(() => {

                let header_1 = matrix.rows.root.children[0];
                let header_1_1 = header_1.children[0];
                let header_1_1_1 = header_1_1.children[0];
                let header_1_1_2 = header_1_1.children[1];
                let header_1_2 = header_1.children[1];
                let header_1_2_1 = header_1_2.children[0];
                let header_1_2_2 = header_1_2.children[1];
                let header_2 = matrix.rows.root.children[1];
                let header_2_1 = header_2.children[0];
                let header_2_1_1 = header_2_1.children[0];
                let header_2_1_2 = header_2_1.children[1];
                let header_2_2 = header_2.children[1];
                let header_2_2_1 = header_2_2.children[0];
                let header_2_2_2 = header_2_2.children[1];
                let cellValue1 = formatter(header_1_1_1.values[0].value, measureSource1);
                let cellValue2 = formatter(header_1_1_1.values[1].value, measureSource2);
                let cellValue3 = formatter(header_1_1_1.values[2].value, measureSource3);
                let cellValue4 = formatter(header_1_1_2.values[0].value, measureSource1);
                let cellValue5 = formatter(header_1_1_2.values[1].value, measureSource2);
                let cellValue6 = formatter(header_1_1_2.values[2].value, measureSource3);
                let cellValue7 = formatter(header_1_2_1.values[0].value, measureSource1);
                let cellValue8 = formatter(header_1_2_1.values[1].value, measureSource2);
                let cellValue9 = formatter(header_1_2_1.values[2].value, measureSource3);
                let cellValue10 = formatter(header_1_2_2.values[0].value, measureSource1);
                let cellValue11 = formatter(header_1_2_2.values[1].value, measureSource2);
                let cellValue12 = formatter(header_1_2_2.values[2].value, measureSource3);
                let cellValue13 = formatter(header_2_1_1.values[0].value, measureSource1);
                let cellValue14 = formatter(header_2_1_1.values[1].value, measureSource2);
                let cellValue15 = formatter(header_2_1_1.values[2].value, measureSource3);
                let cellValue16 = formatter(header_2_1_2.values[0].value, measureSource1);
                let cellValue17 = formatter(header_2_1_2.values[1].value, measureSource2);
                let cellValue18 = formatter(header_2_1_2.values[2].value, measureSource3);
                let cellValue19 = formatter(header_2_2_1.values[0].value, measureSource1);
                let cellValue20 = formatter(header_2_2_1.values[1].value, measureSource2);
                let cellValue21 = formatter(header_2_2_1.values[2].value, measureSource3);
                let cellValue22 = formatter(header_2_2_2.values[0].value, measureSource1);
                let cellValue23 = formatter(header_2_2_2.values[1].value, measureSource2);
                let cellValue24 = formatter(header_2_2_2.values[2].value, measureSource3);

                let expectedCells: string[][] = [
                    [rowGroupSource1.displayName, rowGroupSource2.displayName, rowGroupSource3.displayName, measureSource1.displayName, measureSource2.displayName, measureSource3.displayName],
                    [header_1.value, header_1_1.value, header_1_1_1.value, cellValue1, cellValue2, cellValue3],
                    [header_1_1_2.value, cellValue4, cellValue5, cellValue6],
                    [header_1_2.value, header_1_2_1.value, cellValue7, cellValue8, cellValue9],
                    [header_1_2_2.value, cellValue10, cellValue11, cellValue12],
                    [header_2.value, header_2_1.value, header_2_1_1.value, cellValue13, cellValue14, cellValue15],
                    [header_2_1_2.value, cellValue16, cellValue17, cellValue18],
                    [header_2_2.value, header_2_2_1.value, cellValue19, cellValue20, cellValue21],
                    [header_2_2_2.value, cellValue22, cellValue23, cellValue24]
                ];

                validateMatrix(expectedCells);

                let expectedClassNames: string[][] = [
                    [ColumnHeaderLeafClass, ColumnHeaderLeafClass, ColumnHeaderLeafClass + " " + RowHeaderLeafClass, ColumnHeaderLeafClass + NumericCellClassName, ColumnHeaderLeafClass + NumericCellClassName, ColumnHeaderLeafClass + NumericCellClassName],
                    [HeaderClass, HeaderClass, RowHeaderStaticLeafClass, BodyCellClass, BodyCellClass, BodyCellClass],
                    [RowHeaderStaticLeafClass, BodyCellClass, BodyCellClass, BodyCellClass],
                    [HeaderClass, RowHeaderStaticLeafClass, BodyCellClass, BodyCellClass, BodyCellClass],
                    [RowHeaderStaticLeafClass, BodyCellClass, BodyCellClass, BodyCellClass],
                    [HeaderClass, HeaderClass, RowHeaderStaticLeafClass, BodyCellClass, BodyCellClass, BodyCellClass],
                    [RowHeaderStaticLeafClass, BodyCellClass, BodyCellClass, BodyCellClass],
                    [HeaderClass, RowHeaderStaticLeafClass, BodyCellClass, BodyCellClass, BodyCellClass],
                    [RowHeaderStaticLeafClass, BodyCellClass, BodyCellClass, BodyCellClass]
                ];

                validateClassNames(expectedClassNames);

                done();
            }, DefaultWaitForRender);
        });

        it("2x2 matrix (value, static column header and row value header)", (done) => {

            let matrix = matrixOneMeasureOneRowGroupOneGroupInstance;
            v.onDataChanged({
                dataViews: [{
                    metadata: { columns: [rowGroupSource1, measureSource1] },
                    matrix: matrix
                }]
            });

            setTimeout(() => {

                let header = matrix.rows.root.children[0];
                let cellValue: string = formatter(header.values[0].value, measureSource1);

                let expectedCells: string[][] = [
                    [rowGroupSource1.displayName, measureSource1.displayName],
                    [header.value, cellValue]
                ];

                validateMatrix(expectedCells);

                let expectedClassNames: string[][] = [
                    [ColumnHeaderLeafClass + " " + RowHeaderLeafClass, ColumnHeaderLeafClass + NumericCellClassName],
                    [RowHeaderTopLevelStaticLeafClass, BodyCellClass]
                ];

                validateClassNames(expectedClassNames);

                done();
            }, DefaultWaitForRender);
        });

        it("2x2 matrix (value, column value header and row value header, empty cell)", (done) => {

            let matrix = matrixOneRowGroupOneColumnGroupOneGroupInstance;
            v.onDataChanged({
                dataViews: [matrixOneRowGroupOneColumnGroupOneGroupInstanceDataView]
            });

            setTimeout(() => {

                let columnHeader = matrix.columns.root.children[0];
                let rowHeader = matrix.rows.root.children[0];

                let expectedCells: string[][] = [
                    [rowGroupSource1.displayName, columnHeader.value.toString()],
                    [rowHeader.value.toString(), ""]
                ];

                validateMatrix(expectedCells);

                done();
            }, DefaultWaitForRender);
        });

        it("3x2 matrix (static column headers and row value headers)", (done) => {

            let matrix = matrixThreeRowGroupsOneGroupInstance;
            v.onDataChanged({
                dataViews: [matrixThreeRowGroupsOneGroupInstanceDataView]
            });

            setTimeout(() => {

                let rowHeader_1 = matrix.rows.root.children[0];
                let rowHeader_1_1 = rowHeader_1.children[0];
                let rowHeader_1_1_1 = rowHeader_1_1.children[0];

                let expectedCells: string[][] = [
                    [rowGroupSource1.displayName, rowGroupSource2.displayName, rowGroupSource3.displayName],
                    [rowHeader_1.value, rowHeader_1_1.value, rowHeader_1_1_1.value.toString()]
                ];

                validateMatrix(expectedCells);

                let expectedClassNames: string[][] = [
                    [ColumnHeaderLeafClass, ColumnHeaderLeafClass, ColumnHeaderLeafClass + " " + RowHeaderLeafClass],
                    [HeaderClass, HeaderClass, RowHeaderLeafClass]
                ];

                validateClassNames(expectedClassNames);

                done();
            }, DefaultWaitForRender);
        });

        it("2x6 matrix (static column headers and row value headers including empty ones)", (done) => {

            let matrix = matrixTwoRowGroupsWithNullValues;
            v.onDataChanged({
                dataViews: [{
                    metadata: {
                        columns:
                        [
                            rowGroupSource1,
                            rowGroupSource2
                        ]
                    },
                    matrix: matrix
                }]
            });

            setTimeout(() => {

                let header_1 = matrix.rows.root.children[0];
                let header_1_2 = header_1.children[1];
                let header_2 = matrix.rows.root.children[1];
                let header_2_1 = header_2.children[0];

                let expectedCells: string[][] = [
                    [rowGroupSource1.displayName, rowGroupSource2.displayName],
                    [header_1.value, EmptyHeaderCell],
                    [header_1_2.value],
                    [header_2.value, header_2_1.value],
                    [EmptyHeaderCell],
                    [EmptyHeaderCell, EmptyHeaderCell]
                ];

                validateMatrix(expectedCells);

                let expectedClassNames: string[][] = [
                    [ColumnHeaderLeafClass, ColumnHeaderLeafClass + " " + RowHeaderLeafClass],
                    [HeaderClass, RowHeaderStaticLeafClass],
                    [RowHeaderStaticLeafClass],
                    [HeaderClass, RowHeaderStaticLeafClass],
                    [RowHeaderStaticLeafClass],
                    [HeaderClass, RowHeaderStaticLeafClass]
                ];

                validateClassNames(expectedClassNames);

                done();
            }, DefaultWaitForRender);
        });

        it("5x2 matrix (column value headers including empty ones)", (done) => {

            let matrix = <DataViewMatrix><any>matrixTwoColumnGroupsWithNullValues;
            v.onDataChanged({
                dataViews: [{
                    metadata: {
                        columns:
                        [
                            columnGroupSource1,
                            columnGroupSource2
                        ]
                    },
                    matrix: matrix
                }]
            });

            setTimeout(() => {

                let header_1 = matrix.columns.root.children[0];
                let header_1_2 = header_1.children[1];
                let header_2 = matrix.columns.root.children[1];
                let header_2_1 = header_2.children[0];

                let expectedCells: string[][] = [
                    ["", header_1.value, header_2.value, EmptyHeaderCell],
                    ["", EmptyHeaderCell, header_1_2.value, header_2_1.value, EmptyHeaderCell, EmptyHeaderCell]
                ];

                validateMatrix(expectedCells);

                let expectedClassNames: string[][] = [
                    [HeaderClass, HeaderClass + NumericCellClassName, HeaderClass + NumericCellClassName, HeaderClass + NumericCellClassName],
                    [HeaderClass, ColumnHeaderLeafClass + NumericCellClassName, ColumnHeaderLeafClass + NumericCellClassName, ColumnHeaderLeafClass + NumericCellClassName, ColumnHeaderLeafClass + NumericCellClassName, ColumnHeaderLeafClass + NumericCellClassName]
                ];

                validateClassNames(expectedClassNames);

                done();
            }, DefaultWaitForRender);
        });

        it("3x9 matrix (static column headers and row value headers)", (done) => {

            let matrix = matrixThreeRowGroups;
            v.onDataChanged({
                dataViews: [{
                    metadata: {
                        columns:
                        [
                            rowGroupSource1,
                            rowGroupSource2,
                            rowGroupSource3
                        ]
                    },
                    matrix: matrix
                }]
            });

            setTimeout(() => {

                let header_1 = matrix.rows.root.children[0];
                let header_1_1 = header_1.children[0];
                let header_1_1_1 = header_1_1.children[0];
                let header_1_1_2 = header_1_1.children[1];
                let header_1_2 = header_1.children[1];
                let header_1_2_1 = header_1_2.children[0];
                let header_1_2_2 = header_1_2.children[1];
                let header_2 = matrix.rows.root.children[1];
                let header_2_1 = header_2.children[0];
                let header_2_1_1 = header_2_1.children[0];
                let header_2_1_2 = header_2_1.children[1];
                let header_2_2 = header_2.children[1];
                let header_2_2_1 = header_2_2.children[0];
                let header_2_2_2 = header_2_2.children[1];

                let expectedCells: string[][] = [
                    [rowGroupSource1.displayName, rowGroupSource2.displayName, rowGroupSource3.displayName],
                    [header_1.value, header_1_1.value, header_1_1_1.value.toString()],
                    [header_1_1_2.value.toString()],
                    [header_1_2.value, header_1_2_1.value.toString()],
                    [header_1_2_2.value.toString()],
                    [header_2.value, header_2_1.value, header_2_1_1.value.toString()],
                    [header_2_1_2.value.toString()],
                    [header_2_2.value, header_2_2_1.value.toString()],
                    [header_2_2_2.value.toString()]
                ];

                validateMatrix(expectedCells);

                done();
            }, DefaultWaitForRender);
        });

        it("8x3 matrix (column value headers)", (done) => {

            let matrix = matrixThreeColumnGroups;
            v.onDataChanged({
                dataViews: [matrixThreeColumnGroupsDataView]
            });

            setTimeout(() => {

                let header_1 = matrix.columns.root.children[0];
                let header_1_1 = header_1.children[0];
                let header_1_1_1 = header_1_1.children[0].value.toString();
                let header_1_1_2 = header_1_1.children[1].value.toString();
                let header_1_2 = header_1.children[1];
                let header_1_2_1 = header_1_2.children[0].value.toString();
                let header_1_2_2 = header_1_2.children[1].value.toString();
                let header_2 = matrix.columns.root.children[1];
                let header_2_1 = header_2.children[0];
                let header_2_1_1 = header_2_1.children[0].value.toString();
                let header_2_1_2 = header_2_1.children[1].value.toString();
                let header_2_2 = header_2.children[1];
                let header_2_2_1 = header_2_2.children[0].value.toString();
                let header_2_2_2 = header_2_2.children[1].value.toString();

                let expectedCells: string[][] = [
                    ["", header_1.value, header_2.value],
                    ["", header_1_1.value, header_1_2.value, header_2_1.value, header_2_2.value],
                    ["", header_1_1_1, header_1_1_2, header_1_2_1, header_1_2_2, header_2_1_1, header_2_1_2, header_2_2_1, header_2_2_2]
                ];

                validateMatrix(expectedCells);

                done();
            }, DefaultWaitForRender);
        });

        it("6x5 matrix (column value headers and row value headers, multiple group instances, empty cells)", (done) => {
            let matrix = matrixThreeRowGroupsThreeColumnGroups;
            v.onDataChanged({
                dataViews: [{
                    metadata: {
                        columns:
                        [
                            rowGroupSource1,
                            rowGroupSource2,
                            rowGroupSource3formatted,
                            columnGroupSource1,
                            columnGroupSource2,
                            columnGroupSource3formatted
                        ]
                    },
                    matrix: matrix
                }]
            });

            setTimeout(() => {

                let rowHeader_1 = matrix.rows.root.children[0];
                let rowHeader_1_1 = rowHeader_1.children[0];
                let rowHeaderValue_1_1_1 = formatter(rowHeader_1_1.children[0].value, rowGroupSource3formatted);
                let rowHeaderValue_1_1_2 = formatter(rowHeader_1_1.children[1].value, rowGroupSource3formatted);
                let rowHeader_1_2 = rowHeader_1.children[1];
                let rowHeaderValue_1_2_1 = formatter(rowHeader_1_2.children[0].value, rowGroupSource3formatted);
                let colHeader_1 = matrix.columns.root.children[0];
                let colHeader_1_1 = colHeader_1.children[0];
                let colHeaderValue_1_1_1 = formatter(colHeader_1_1.children[0].value, columnGroupSource3formatted);
                let colHeaderValue_1_1_2 = formatter(colHeader_1_1.children[1].value, columnGroupSource3formatted);
                let colHeader_1_2 = colHeader_1.children[1];
                let colHeaderValue_1_2_1 = formatter(colHeader_1_2.children[0].value, columnGroupSource3formatted);

                let expectedCells: string[][] = [
                    ["", "", columnGroupSource1.displayName, colHeader_1.value],
                    ["", "", columnGroupSource2.displayName, colHeader_1_1.value, colHeader_1_2.value],
                    [rowGroupSource1.displayName, rowGroupSource2.displayName, rowGroupSource3.displayName, colHeaderValue_1_1_1, colHeaderValue_1_1_2, colHeaderValue_1_2_1],
                    [rowHeader_1.value, rowHeader_1_1.value, rowHeaderValue_1_1_1, "", "", ""],
                    [rowHeaderValue_1_1_2, "", "", ""],
                    [rowHeader_1_2.value, rowHeaderValue_1_2_1, "", "", ""]
                ];

                validateMatrix(expectedCells);

                done();
            }, DefaultWaitForRender);
        });

        it("3x4 matrix (boolean and null group instances)", (done) => {
            let matrix = matrixRowGroupColumnGroupWithBooleanAndNullOneMeasure;
            v.onDataChanged({
                dataViews: [{
                    metadata: {
                        columns:
                        [
                            rowGroupSource4,
                            columnGroupSource4,
                            measureSource1
                        ]
                    },
                    matrix: matrix
                }]
            });

            setTimeout(() => {

                let colHeader1 = matrix.columns.root.children[0];
                let colHeader2 = matrix.columns.root.children[1];
                let rowHeader1 = matrix.rows.root.children[0];
                let rowHeader2 = matrix.rows.root.children[1];
                let rowHeader3 = matrix.rows.root.children[2];

                let expectedCells: string[][] = [
                    [rowGroupSource4.displayName, colHeader1.value.toString(), colHeader2.value.toString()],
                    [rowHeader1.value.toString(), formatter(rowHeader1.values[0].value, measureSource1), formatter(rowHeader1.values[1].value, measureSource1)],
                    [rowHeader2.value.toString(), formatter(rowHeader2.values[0].value, measureSource1), formatter(rowHeader2.values[1].value, measureSource1)],
                    [EmptyHeaderCell, formatter(rowHeader3.values[0].value, measureSource1), formatter(rowHeader3.values[1].value, measureSource1)]
                ];

                validateMatrix(expectedCells);

                done();
            }, DefaultWaitForRender);
        });

        it("Matrix with row and column subtotals", (done) => {
            let matrix = matrixRowGroupColumnGroupWithBooleanAndNullOneMeasureBothTotals;
            v.onDataChanged({
                dataViews: [{
                    metadata: {
                        columns:
                        [
                            rowGroupSource4,
                            columnGroupSource4,
                            measureSource1
                        ],
                        objects: {
                            general: {
                                rowSubtotals: true,
                                columnSubtotals: true
                            }
                        }
                    },
                    matrix: matrix
                }]
            });

            setTimeout(() => {

                let colHeader1 = matrix.columns.root.children[0];
                let colHeader2 = matrix.columns.root.children[1];
                let rowHeader1 = matrix.rows.root.children[0];
                let rowHeader2 = matrix.rows.root.children[1];
                let rowHeader3 = matrix.rows.root.children[2];
                let rowHeader4 = matrix.rows.root.children[3];

                let expectedCells: string[][] = [
                    [rowGroupSource4.displayName, colHeader1.value.toString(), colHeader2.value.toString(), TableTotalLabel],
                    [rowHeader1.value.toString(), formatter(rowHeader1.values[0].value, measureSource1), formatter(rowHeader1.values[1].value, measureSource1), formatter(rowHeader1.values[2].value, measureSource1)],
                    [rowHeader2.value.toString(), formatter(rowHeader2.values[0].value, measureSource1), formatter(rowHeader2.values[1].value, measureSource1), formatter(rowHeader2.values[2].value, measureSource1)],
                    [EmptyHeaderCell, formatter(rowHeader3.values[0].value, measureSource1), formatter(rowHeader3.values[1].value, measureSource1), formatter(rowHeader3.values[2].value, measureSource1)],
                    [TableTotalLabel, formatter(rowHeader4.values[0].value, measureSource1), formatter(rowHeader4.values[1].value, measureSource1), formatter(rowHeader4.values[2].value, measureSource1)]
                ];

                validateMatrix(expectedCells);

                let expectedClassNames: string[][] = [
                    [ColumnHeaderLeafClass + " " + RowHeaderLeafClass, ColumnHeaderLeafClass + NumericCellClassName, ColumnHeaderLeafClass + NumericCellClassName, ColumnHeaderLeafClass + " " + TotalClass + NumericCellClassName],
                    [RowHeaderTopLevelStaticLeafClass, BodyCellClass, BodyCellClass, BodyCellClass + " " + TotalClass],
                    [RowHeaderTopLevelStaticLeafClass, BodyCellClass, BodyCellClass, BodyCellClass + " " + TotalClass],
                    [RowHeaderTopLevelStaticLeafClass, BodyCellClass, BodyCellClass, BodyCellClass + " " + TotalClass],
                    [RowHeaderTopLevelStaticLeafClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass]
                ];

                validateClassNames(expectedClassNames);

                done();
            }, DefaultWaitForRender);
        });

        it("Matrix with multiple row and column group hierarchy levels, one measure with subtotals", (done) => {
            let matrix = matrixTwoRowGroupsTwoColumnGroupsOneMeasureAndTotals;
            v.onDataChanged({
                dataViews: [{
                    metadata: {
                        columns:
                        [
                            rowGroupSource1,
                            rowGroupSource2,
                            columnGroupSource1,
                            columnGroupSource2,
                            measureSource1
                        ],
                        objects: {
                            general: {
                                rowSubtotals: true,
                                columnSubtotals: true
                            }
                        }
                    },
                    matrix: matrix
                }]
            });

            setTimeout(() => {

                let colHeader1 = matrix.columns.root.children[0];
                let colHeader2 = matrix.columns.root.children[1];
                let colHeader1_1 = matrix.columns.root.children[0].children[0];
                let colHeader1_2 = matrix.columns.root.children[0].children[1];
                let colHeader2_1 = matrix.columns.root.children[1].children[0];
                let colHeader2_2 = matrix.columns.root.children[1].children[1];

                let rowHeader1 = matrix.rows.root.children[0];
                let rowHeader2 = matrix.rows.root.children[1];
                let rowHeader3 = matrix.rows.root.children[2];
                let rowHeader4 = matrix.rows.root.children[3];
                let rowHeadert = matrix.rows.root.children[4];

                let rowHeader1_1 = matrix.rows.root.children[0].children[0];
                let rowHeader1_2 = matrix.rows.root.children[0].children[1];
                let rowHeader1_t = matrix.rows.root.children[0].children[2];
                let rowHeader2_1 = matrix.rows.root.children[1].children[0];
                let rowHeader2_2 = matrix.rows.root.children[1].children[1];
                let rowHeader2_t = matrix.rows.root.children[1].children[2];
                let rowHeader3_1 = matrix.rows.root.children[2].children[0];
                let rowHeader3_t = matrix.rows.root.children[2].children[1];
                let rowHeader4_1 = matrix.rows.root.children[3].children[0];
                let rowHeader4_t = matrix.rows.root.children[3].children[1];

                let expectedCells: string[][] = [
                    ["", columnGroupSource1.displayName, colHeader1.value.toString(), colHeader2.value.toString(), TableTotalLabel],
                    [rowGroupSource1.displayName, rowGroupSource2.displayName, colHeader1_1.value.toString(), colHeader1_2.value.toString(), TableTotalLabel, colHeader2_1.value.toString(), colHeader2_2.value.toString(), TableTotalLabel],
                    [rowHeader1.value.toString(), rowHeader1_1.value.toString(), formatter(rowHeader1_1.values[0].value, measureSource1), formatter(rowHeader1_1.values[1].value, measureSource1), formatter(rowHeader1_1.values[2].value, measureSource1), formatter(rowHeader1_1.values[3].value, measureSource1), formatter(rowHeader1_1.values[4].value, measureSource1), formatter(rowHeader1_1.values[5].value, measureSource1), formatter(rowHeader1_1.values[6].value, measureSource1)],
                    [rowHeader1_2.value.toString(), formatter(rowHeader1_2.values[0].value, measureSource1), formatter(rowHeader1_2.values[1].value, measureSource1), formatter(rowHeader1_2.values[2].value, measureSource1), formatter(rowHeader1_2.values[3].value, measureSource1), formatter(rowHeader1_2.values[4].value, measureSource1), formatter(rowHeader1_2.values[5].value, measureSource1), formatter(rowHeader1_2.values[6].value, measureSource1)],
                    [TableTotalLabel, formatter(rowHeader1_t.values[0].value, measureSource1), formatter(rowHeader1_t.values[1].value, measureSource1), formatter(rowHeader1_t.values[2].value, measureSource1), formatter(rowHeader1_t.values[3].value, measureSource1), formatter(rowHeader1_t.values[4].value, measureSource1), formatter(rowHeader1_t.values[5].value, measureSource1), formatter(rowHeader1_t.values[6].value, measureSource1)],
                    [rowHeader2.value.toString(), rowHeader2_1.value.toString(), formatter(rowHeader2_1.values[0].value, measureSource1), formatter(rowHeader2_1.values[1].value, measureSource1), formatter(rowHeader2_1.values[2].value, measureSource1), formatter(rowHeader2_1.values[3].value, measureSource1), formatter(rowHeader2_1.values[4].value, measureSource1), formatter(rowHeader2_1.values[5].value, measureSource1), formatter(rowHeader2_1.values[6].value, measureSource1)],
                    [rowHeader2_2.value.toString(), formatter(rowHeader2_2.values[0].value, measureSource1), formatter(rowHeader2_2.values[1].value, measureSource1), formatter(rowHeader2_2.values[2].value, measureSource1), formatter(rowHeader2_2.values[3].value, measureSource1), formatter(rowHeader2_2.values[4].value, measureSource1), formatter(rowHeader2_2.values[5].value, measureSource1), formatter(rowHeader2_2.values[6].value, measureSource1)],
                    [TableTotalLabel, formatter(rowHeader2_t.values[0].value, measureSource1), formatter(rowHeader2_t.values[1].value, measureSource1), formatter(rowHeader2_t.values[2].value, measureSource1), formatter(rowHeader2_t.values[3].value, measureSource1), formatter(rowHeader2_t.values[4].value, measureSource1), formatter(rowHeader2_t.values[5].value, measureSource1), formatter(rowHeader2_t.values[6].value, measureSource1)],
                    [rowHeader3.value.toString(), rowHeader3_1.value.toString(), formatter(rowHeader3_1.values[0].value, measureSource1), formatter(rowHeader3_1.values[1].value, measureSource1), formatter(rowHeader3_1.values[2].value, measureSource1), formatter(rowHeader3_1.values[3].value, measureSource1), formatter(rowHeader3_1.values[4].value, measureSource1), formatter(rowHeader3_1.values[5].value, measureSource1), formatter(rowHeader3_1.values[6].value, measureSource1)],
                    [TableTotalLabel, formatter(rowHeader3_t.values[0].value, measureSource1), formatter(rowHeader3_t.values[1].value, measureSource1), formatter(rowHeader3_t.values[2].value, measureSource1), formatter(rowHeader3_t.values[3].value, measureSource1), formatter(rowHeader3_t.values[4].value, measureSource1), formatter(rowHeader3_t.values[5].value, measureSource1), formatter(rowHeader3_t.values[6].value, measureSource1)],
                    [rowHeader4.value.toString(), rowHeader4_1.value.toString(), formatter(rowHeader4_1.values[0].value, measureSource1), formatter(rowHeader4_1.values[1].value, measureSource1), formatter(rowHeader4_1.values[2].value, measureSource1), formatter(rowHeader4_1.values[3].value, measureSource1), formatter(rowHeader4_1.values[4].value, measureSource1), formatter(rowHeader4_1.values[5].value, measureSource1), formatter(rowHeader4_1.values[6].value, measureSource1)],
                    [TableTotalLabel, formatter(rowHeader4_t.values[0].value, measureSource1), formatter(rowHeader4_t.values[1].value, measureSource1), formatter(rowHeader4_t.values[2].value, measureSource1), formatter(rowHeader4_t.values[3].value, measureSource1), formatter(rowHeader4_t.values[4].value, measureSource1), formatter(rowHeader4_t.values[5].value, measureSource1), formatter(rowHeader4_t.values[6].value, measureSource1)],
                    [TableTotalLabel, formatter(rowHeadert.values[0].value, measureSource1), formatter(rowHeadert.values[1].value, measureSource1), formatter(rowHeadert.values[2].value, measureSource1), formatter(rowHeadert.values[3].value, measureSource1), formatter(rowHeadert.values[4].value, measureSource1), formatter(rowHeadert.values[5].value, measureSource1), formatter(rowHeadert.values[6].value, measureSource1)]
                ];

                let expectedClassNames: string[][] = [
                    [HeaderClass, RowHeaderLeafClass, HeaderClass + NumericCellClassName, HeaderClass + NumericCellClassName, ColumnHeaderLeafClass + " " + TotalClass + NumericCellClassName],
                    [ColumnHeaderLeafClass, ColumnHeaderLeafClass + " " + RowHeaderLeafClass, ColumnHeaderLeafClass + NumericCellClassName, ColumnHeaderLeafClass + NumericCellClassName, ColumnHeaderLeafClass + " " + TotalClass + NumericCellClassName, ColumnHeaderLeafClass + NumericCellClassName, ColumnHeaderLeafClass + NumericCellClassName, ColumnHeaderLeafClass + " " + TotalClass + NumericCellClassName],
                    [HeaderClass, RowHeaderStaticLeafClass, BodyCellClass, BodyCellClass, BodyCellClass + " " + TotalClass, BodyCellClass, BodyCellClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass],
                    [RowHeaderStaticLeafClass, BodyCellClass, BodyCellClass, BodyCellClass + " " + TotalClass, BodyCellClass, BodyCellClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass],
                    [RowHeaderStaticLeafClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass],
                    [HeaderClass, RowHeaderStaticLeafClass, BodyCellClass, BodyCellClass, BodyCellClass + " " + TotalClass, BodyCellClass, BodyCellClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass],
                    [RowHeaderStaticLeafClass, BodyCellClass, BodyCellClass, BodyCellClass + " " + TotalClass, BodyCellClass, BodyCellClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass],
                    [RowHeaderStaticLeafClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass],
                    [HeaderClass, RowHeaderStaticLeafClass, BodyCellClass, BodyCellClass, BodyCellClass + " " + TotalClass, BodyCellClass, BodyCellClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass],
                    [RowHeaderStaticLeafClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass],
                    [HeaderClass, RowHeaderStaticLeafClass, BodyCellClass, BodyCellClass, BodyCellClass + " " + TotalClass, BodyCellClass, BodyCellClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass],
                    [RowHeaderStaticLeafClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass],
                    [RowHeaderTopLevelStaticLeafClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass]
                ];

                validateClassNames(expectedClassNames);

                validateMatrix(expectedCells);

                done();
            }, DefaultWaitForRender);
        });

        it("Matrix with multiple row and column group hierarchy levels, two measures with subtotals", (done) => {
            let matrix = matrixTwoRowGroupsTwoColumnGroupsTwoMeasuresAndTotals;

            /**
             * Scaling factor will be 1.05 because phantomjs renders as 11px font which is 8.25pt
             * i.e. 8.25 / 8 ~= 1.05
             * In actual practice, default 8pt text size ~= 10.6667px font
             * which will result in a scale factor ~= 1.0 as expected
             */
            v.onDataChanged({
                dataViews: [{
                    metadata: {
                        columns:
                        [
                            rowGroupSource1,
                            rowGroupSource2,
                            columnGroupSource1,
                            columnGroupSource2,
                            measureSource1,
                            measureSource2
                        ],
                        objects: {
                            general: {
                                rowSubtotals: true,
                                columnSubtotals: true
                            }
                        }
                    },
                    matrix: matrix
                }]
            });

            setTimeout(() => {

                let colHeader1 = matrix.columns.root.children[0];
                let colHeader1_1 = matrix.columns.root.children[0].children[0];
                let colHeader1_2 = matrix.columns.root.children[0].children[1];
                let colHeader2 = matrix.columns.root.children[1];
                let colHeader2_1 = matrix.columns.root.children[1].children[0];

                let rowHeader1 = matrix.rows.root.children[0];
                let rowHeader2 = matrix.rows.root.children[1];
                let rowHeader3 = matrix.rows.root.children[2];
                let rowHeader4 = matrix.rows.root.children[3];
                let rowHeadert = matrix.rows.root.children[4];

                let rowHeader1_1 = matrix.rows.root.children[0].children[0];
                let rowHeader1_2 = matrix.rows.root.children[0].children[1];
                let rowHeader1_t = matrix.rows.root.children[0].children[2];
                let rowHeader2_1 = matrix.rows.root.children[1].children[0];
                let rowHeader2_2 = matrix.rows.root.children[1].children[1];
                let rowHeader2_t = matrix.rows.root.children[1].children[2];
                let rowHeader3_1 = matrix.rows.root.children[2].children[0];
                let rowHeader3_t = matrix.rows.root.children[2].children[1];
                let rowHeader4_1 = matrix.rows.root.children[3].children[0];
                let rowHeader4_t = matrix.rows.root.children[3].children[1];

                let expectedCells: string[][] = [
                    ["", columnGroupSource1.displayName, colHeader1.value.toString(), colHeader2.value.toString()],
                    ["", columnGroupSource2.displayName, colHeader1_1.value.toString(), colHeader1_2.value.toString(), TableTotalLabel, colHeader2_1.value.toString()],
                    [rowGroupSource1.displayName, rowGroupSource2.displayName, measureSource1.displayName, measureSource2.displayName, measureSource1.displayName, measureSource2.displayName, measureSource1.displayName, measureSource2.displayName, measureSource1.displayName],
                    [rowHeader1.value.toString(), rowHeader1_1.value.toString(), formatter(rowHeader1_1.values[0].value, measureSource1), formatter(rowHeader1_1.values[1].value, measureSource1), formatter(rowHeader1_1.values[2].value, measureSource1), formatter(rowHeader1_1.values[3].value, measureSource1), formatter(rowHeader1_1.values[4].value, measureSource1), formatter(rowHeader1_1.values[5].value, measureSource1), formatter(rowHeader1_1.values[6].value, measureSource1)],
                    [rowHeader1_2.value.toString(), formatter(rowHeader1_2.values[0].value, measureSource1), formatter(rowHeader1_2.values[1].value, measureSource1), formatter(rowHeader1_2.values[2].value, measureSource1), formatter(rowHeader1_2.values[3].value, measureSource1), formatter(rowHeader1_2.values[4].value, measureSource1), formatter(rowHeader1_2.values[5].value, measureSource1), formatter(rowHeader1_2.values[6].value, measureSource1)],
                    [TableTotalLabel, formatter(rowHeader1_t.values[0].value, measureSource1), formatter(rowHeader1_t.values[1].value, measureSource1), formatter(rowHeader1_t.values[2].value, measureSource1), formatter(rowHeader1_t.values[3].value, measureSource1), formatter(rowHeader1_t.values[4].value, measureSource1), formatter(rowHeader1_t.values[5].value, measureSource1), formatter(rowHeader1_t.values[6].value, measureSource1)],
                    [rowHeader2.value.toString(), rowHeader2_1.value.toString(), formatter(rowHeader2_1.values[0].value, measureSource1), formatter(rowHeader2_1.values[1].value, measureSource1), formatter(rowHeader2_1.values[2].value, measureSource1), formatter(rowHeader2_1.values[3].value, measureSource1), formatter(rowHeader2_1.values[4].value, measureSource1), formatter(rowHeader2_1.values[5].value, measureSource1), formatter(rowHeader2_1.values[6].value, measureSource1)],
                    [rowHeader2_2.value.toString(), formatter(rowHeader2_2.values[0].value, measureSource1), formatter(rowHeader2_2.values[1].value, measureSource1), formatter(rowHeader2_2.values[2].value, measureSource1), formatter(rowHeader2_2.values[3].value, measureSource1), formatter(rowHeader2_2.values[4].value, measureSource1), formatter(rowHeader2_2.values[5].value, measureSource1), formatter(rowHeader2_2.values[6].value, measureSource1)],
                    [TableTotalLabel, formatter(rowHeader2_t.values[0].value, measureSource1), formatter(rowHeader2_t.values[1].value, measureSource1), formatter(rowHeader2_t.values[2].value, measureSource1), formatter(rowHeader2_t.values[3].value, measureSource1), formatter(rowHeader2_t.values[4].value, measureSource1), formatter(rowHeader2_t.values[5].value, measureSource1), formatter(rowHeader2_t.values[6].value, measureSource1)],
                    [rowHeader3.value.toString(), rowHeader3_1.value.toString(), formatter(rowHeader3_1.values[0].value, measureSource1), formatter(rowHeader3_1.values[1].value, measureSource1), formatter(rowHeader3_1.values[2].value, measureSource1), formatter(rowHeader3_1.values[3].value, measureSource1), formatter(rowHeader3_1.values[4].value, measureSource1), formatter(rowHeader3_1.values[5].value, measureSource1), formatter(rowHeader3_1.values[6].value, measureSource1)],
                    [TableTotalLabel, formatter(rowHeader3_t.values[0].value, measureSource1), formatter(rowHeader3_t.values[1].value, measureSource1), formatter(rowHeader3_t.values[2].value, measureSource1), formatter(rowHeader3_t.values[3].value, measureSource1), formatter(rowHeader3_t.values[4].value, measureSource1), formatter(rowHeader3_t.values[5].value, measureSource1), formatter(rowHeader3_t.values[6].value, measureSource1)],
                    [rowHeader4.value.toString(), rowHeader4_1.value.toString(), formatter(rowHeader4_1.values[0].value, measureSource1), formatter(rowHeader4_1.values[1].value, measureSource1), formatter(rowHeader4_1.values[2].value, measureSource1), formatter(rowHeader4_1.values[3].value, measureSource1), formatter(rowHeader4_1.values[4].value, measureSource1), formatter(rowHeader4_1.values[5].value, measureSource1), formatter(rowHeader4_1.values[6].value, measureSource1)],
                    [TableTotalLabel, formatter(rowHeader4_t.values[0].value, measureSource1), formatter(rowHeader4_t.values[1].value, measureSource1), formatter(rowHeader4_t.values[2].value, measureSource1), formatter(rowHeader4_t.values[3].value, measureSource1), formatter(rowHeader4_t.values[4].value, measureSource1), formatter(rowHeader4_t.values[5].value, measureSource1), formatter(rowHeader4_t.values[6].value, measureSource1)],
                    [TableTotalLabel, formatter(rowHeadert.values[0].value, measureSource1), formatter(rowHeadert.values[1].value, measureSource1), formatter(rowHeadert.values[2].value, measureSource1), formatter(rowHeadert.values[3].value, measureSource1), formatter(rowHeadert.values[4].value, measureSource1), formatter(rowHeadert.values[5].value, measureSource1), formatter(rowHeadert.values[6].value, measureSource1)]
                ];

                validateMatrix(expectedCells);

                let expectedClassNames: string[][] = [
                    [HeaderClass, RowHeaderLeafClass, HeaderClass + NumericCellClassName, HeaderClass + NumericCellClassName],
                    [HeaderClass, RowHeaderLeafClass, HeaderClass + NumericCellClassName, HeaderClass + NumericCellClassName, HeaderClass + " " + TotalClass + NumericCellClassName, HeaderClass + NumericCellClassName],
                    [ColumnHeaderLeafClass, ColumnHeaderLeafClass + " " + RowHeaderLeafClass, ColumnHeaderLeafClass + NumericCellClassName, ColumnHeaderLeafClass + NumericCellClassName, ColumnHeaderLeafClass + NumericCellClassName, ColumnHeaderLeafClass + NumericCellClassName, ColumnHeaderLeafClass + " " + TotalClass + NumericCellClassName, ColumnHeaderLeafClass + " " + TotalClass + NumericCellClassName, ColumnHeaderLeafClass + NumericCellClassName],
                    [HeaderClass, RowHeaderStaticLeafClass, BodyCellClass, BodyCellClass, BodyCellClass, BodyCellClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass],
                    [RowHeaderStaticLeafClass, BodyCellClass, BodyCellClass, BodyCellClass, BodyCellClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass],
                    [RowHeaderStaticLeafClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass],
                    [HeaderClass, RowHeaderStaticLeafClass, BodyCellClass, BodyCellClass, BodyCellClass, BodyCellClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass],
                    [RowHeaderStaticLeafClass, BodyCellClass, BodyCellClass, BodyCellClass, BodyCellClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass],
                    [RowHeaderStaticLeafClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass],
                    [HeaderClass, RowHeaderStaticLeafClass, BodyCellClass, BodyCellClass, BodyCellClass, BodyCellClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass],
                    [RowHeaderStaticLeafClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass],
                    [HeaderClass, RowHeaderStaticLeafClass, BodyCellClass, BodyCellClass, BodyCellClass, BodyCellClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass],
                    [RowHeaderStaticLeafClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass],
                    [RowHeaderTopLevelStaticLeafClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass, BodyCellClass + " " + TotalClass]
                ];

                validateClassNames(expectedClassNames);

                done();
            }, DefaultWaitForRender);
        });

        function formatter(value: any, source?: DataViewMetadataColumn): string {
            return valueFormatter.formatValueColumn(value, source, TablixUtils.TablixFormatStringProp);
        }
    });

    describe("Matrix sort validation", () => {
        let element: JQuery;

        beforeEach((done) => {
            element = powerbitests.helpers.testDom("1800", "1800");
            element["visible"] = () => { return true; };
            done();
        });

        it("matrix with single measure", (done) => {
            // Clicking on the measure will result in a sort event
            let data: powerbi.DataView = matrixOneMeasureDataView;
            let expectedColumnHeaders = [{ row: 0, col: 1, expectedText: "Measure1" }];
            let clicks = [{ row: 0, col: 1 }, { row: 1, col: 1 }];
            let expectedSorts = [];
            tablixHelper.runTablixSortTest(element, done, "matrix", data, expectedColumnHeaders, clicks, expectedSorts);
        });

        it("matrix with one measure and one column group", (done) => {
            // Clicking on a column group (even if there is only a single instance) will not result in a sort event
            let data: powerbi.DataView = matrixOneMeasureOneColumnGroupOneGroupInstanceDataView;
            let expectedColumnHeaders = [{ row: 0, col: 1, expectedText: "Group A" }];
            let clicks = [{ row: 0, col: 1 }, { row: 1, col: 1 }, { row: 0, col: 1 }];
            let expectedSorts = [];
            tablixHelper.runTablixSortTest(element, done, "matrix", data, expectedColumnHeaders, clicks, expectedSorts);
        });

        it("matrix with three measures", (done) => {
            // Clicking on any measure will result in a sort event
            let data: powerbi.DataView = matrixThreeMeasuresDataView;
            let expectedColumnHeaders = [{ row: 0, col: 1, expectedText: "Measure1" }, { row: 0, col: 2, expectedText: "Measure2" }, { row: 0, col: 3, expectedText: "Measure3" }];
            let clicks = [{ row: 0, col: 1 }, { row: 0, col: 2 }, { row: 0, col: 3 }];
            let expectedSorts = [];
            tablixHelper.runTablixSortTest(element, done, "matrix", data, expectedColumnHeaders, clicks, expectedSorts);
        });

        it("matrix with three measures under one column group", (done) => {
            // Clicking on any column group or any measure underneath it will not result in a sort event
            let data: powerbi.DataView = matrixThreeMeasuresOneColumnGroupOneGroupInstanceDataView;
            let expectedColumnHeaders = [{ row: 0, col: 1, expectedText: "Group A" }, { row: 1, col: 1, expectedText: "Measure1" }, { row: 1, col: 2, expectedText: "Measure2" }, { row: 1, col: 3, expectedText: "Measure3" }];
            let clicks = [{ row: 0, col: 1 }, { row: 1, col: 1 }, { row: 1, col: 2 }, { row: 1, col: 3 }];
            let expectedSorts = [];
            tablixHelper.runTablixSortTest(element, done, "matrix", data, expectedColumnHeaders, clicks, expectedSorts);
        });

        it("matrix with three measures and three row groups", (done) => {
            // Clicking on any row group or any measure will result in a sort event
            let data: powerbi.DataView = matrixThreeMeasuresThreeRowGroupsDataView;
            let expectedColumnHeaders = [
                { row: 0, col: 0, expectedText: "RowGroup1" },
                { row: 0, col: 1, expectedText: "RowGroup2" },
                { row: 0, col: 2, expectedText: "RowGroup3" },
                { row: 0, col: 3, expectedText: "Measure1" },
                { row: 0, col: 4, expectedText: "Measure2" },
                { row: 0, col: 5, expectedText: "Measure3" }];
            let clicks = [{ row: 0, col: 0 }, { row: 0, col: 1 }, { row: 0, col: 2 }, { row: 0, col: 3 }, { row: 0, col: 4 }, { row: 0, col: 5 }];
            let expectedSorts = [
                [{ queryName: "RowGroup1", sortDirection: powerbi.SortDirection.Descending }],
                [{ queryName: "RowGroup2", sortDirection: powerbi.SortDirection.Descending }],
                [{ queryName: "RowGroup3", sortDirection: powerbi.SortDirection.Descending }],
                [{ queryName: "Measure1", sortDirection: powerbi.SortDirection.Descending }],
                [{ queryName: "Measure2", sortDirection: powerbi.SortDirection.Descending }],
                [{ queryName: "Measure3", sortDirection: powerbi.SortDirection.Descending }]
            ];
            tablixHelper.runTablixSortTest(element, done, "matrix", data, expectedColumnHeaders, clicks, expectedSorts);
        });

        it("matrix with one row group and one column group", (done) => {
            // Clicking on the row group will result in a sort event; clicking on the column group will not
            let data: powerbi.DataView = matrixOneRowGroupOneColumnGroupOneGroupInstanceDataView;
            let expectedColumnHeaders = [
                { row: 0, col: 0, expectedText: "RowGroup1" },
                { row: 0, col: 1, expectedText: "10" }];
            let clicks = [{ row: 0, col: 0 }, { row: 0, col: 1 }, { row: 1, col: 0 }];
            let expectedSorts = [
                [{ queryName: "RowGroup1", sortDirection: powerbi.SortDirection.Descending }]
            ];
            tablixHelper.runTablixSortTest(element, done, "matrix", data, expectedColumnHeaders, clicks, expectedSorts);
        });

        it("matrix with one row group and one column group", (done) => {
            // Clicking on any row group will result in a sort event
            let data: powerbi.DataView = matrixThreeRowGroupsOneGroupInstanceDataView;
            let expectedColumnHeaders = [
                { row: 0, col: 0, expectedText: "RowGroup1" },
                { row: 0, col: 1, expectedText: "RowGroup2" },
                { row: 0, col: 2, expectedText: "RowGroup3" }];
            let clicks = [{ row: 0, col: 0 }, { row: 0, col: 1 }, { row: 0, col: 2 }];
            let expectedSorts = [
                [{ queryName: "RowGroup1", sortDirection: powerbi.SortDirection.Descending }], [{ queryName: "RowGroup2", sortDirection: powerbi.SortDirection.Descending }], [{ queryName: "RowGroup3", sortDirection: powerbi.SortDirection.Descending }]
            ];
            tablixHelper.runTablixSortTest(element, done, "matrix", data, expectedColumnHeaders, clicks, expectedSorts);
        });

        it("matrix with three column groups", (done) => {
            // Clicking on any column group will not result in a sort event
            let data: powerbi.DataView = matrixThreeColumnGroupsDataView;
            let expectedColumnHeaders = [
                { row: 0, col: 1, expectedText: "Africa" }, { row: 0, col: 2, expectedText: "Asia" },
                { row: 1, col: 1, expectedText: "Algeria" }, { row: 1, col: 2, expectedText: "Angola" }, { row: 1, col: 3, expectedText: "China" }, { row: 1, col: 4, expectedText: "India" },
                { row: 2, col: 1, expectedText: "2008" }, { row: 2, col: 2, expectedText: "2012" }, { row: 2, col: 3, expectedText: "2008" }, { row: 2, col: 4, expectedText: "2012" }, { row: 2, col: 5, expectedText: "2008" }, { row: 2, col: 6, expectedText: "2012" }, { row: 2, col: 7, expectedText: "2008" }, { row: 2, col: 8, expectedText: "2012" }
            ];
            let clicks = [
                { row: 0, col: 1 }, { row: 0, col: 2 },
                { row: 1, col: 1 }, { row: 1, col: 2 }, { row: 1, col: 3 }, { row: 1, col: 4 },
                { row: 2, col: 1 }, { row: 2, col: 2 }, { row: 2, col: 3 }, { row: 2, col: 4 }, { row: 2, col: 5 }, { row: 2, col: 6 }, { row: 2, col: 7 }, { row: 2, col: 8 }
            ];
            let expectedSorts = [];
            tablixHelper.runTablixSortTest(element, done, "matrix", data, expectedColumnHeaders, clicks, expectedSorts);
        });

        it("matrix with two row groups, two column groups and two measures", (done) => {
            // Clicking on any row group will result in a sort event, clicking on any column group or measure column will not result in a sort event
            let data: powerbi.DataView = matrixTwoRowGroupsTwoColumnGroupsTwoMeasuresDataView;
            let expectedColumnHeaders = [
                { row: 0, col: 1, expectedText: "ColGroup1" }, { row: 0, col: 2, expectedText: "1992" }, { row: 0, col: 3, expectedText: "1996" },
                { row: 1, col: 1, expectedText: "ColGroup2" }, { row: 1, col: 2, expectedText: "Bronze" }, { row: 1, col: 3, expectedText: "Gold" }, { row: 1, col: 4, expectedText: "Silver" }, { row: 1, col: 5, expectedText: "Bronze" }, { row: 1, col: 6, expectedText: "Gold" }, { row: 1, col: 7, expectedText: "Silver" },
                { row: 2, col: 0, expectedText: "RowGroup1" }, { row: 2, col: 1, expectedText: "RowGroup2" }, { row: 2, col: 2, expectedText: "Measure1" }, { row: 2, col: 3, expectedText: "Measure2" }, { row: 2, col: 4, expectedText: "Measure1" }, { row: 2, col: 5, expectedText: "Measure2" }, { row: 2, col: 6, expectedText: "Measure1" }, { row: 2, col: 7, expectedText: "Measure2" }, { row: 2, col: 8, expectedText: "Measure1" }, { row: 2, col: 9, expectedText: "Measure2" }, { row: 2, col: 10, expectedText: "Measure1" }, { row: 2, col: 11, expectedText: "Measure2" }, { row: 2, col: 12, expectedText: "Measure1" }
            ];
            let clicks = [
                { row: 0, col: 1 }, { row: 0, col: 2 }, { row: 0, col: 3 },
                { row: 1, col: 1 }, { row: 1, col: 2 }, { row: 1, col: 3 }, { row: 1, col: 4 }, { row: 1, col: 5 }, { row: 1, col: 6 }, { row: 1, col: 7 },
                { row: 2, col: 0 }, { row: 2, col: 1 }, { row: 2, col: 2 }, { row: 2, col: 3 }, { row: 2, col: 4 }, { row: 2, col: 5 }, { row: 2, col: 6 }, { row: 2, col: 7 }, { row: 2, col: 8 }, { row: 2, col: 9 }, { row: 2, col: 10 }, { row: 2, col: 11 }, { row: 2, col: 12 }
            ];
            let expectedSorts = [
                [{ queryName: "RowGroup1", sortDirection: powerbi.SortDirection.Descending }], [{ queryName: "RowGroup2", sortDirection: powerbi.SortDirection.Descending }]
            ];
            tablixHelper.runTablixSortTest(element, done, "matrix", data, expectedColumnHeaders, clicks, expectedSorts);
        });

        it("matrix with two row groups, two column groups and one measure with totals", (done) => {
            // Clicking on any row group will result in a sort event, clicking on any column group or measure column will not result in a sort event; clicking on the column grand total will result in a sort (by measure)
            let data: powerbi.DataView = matrixTwoRowGroupsTwoColumnGroupsOneMeasureAndTotalsDataView;
            let expectedColumnHeaders = [
                { row: 0, col: 1, expectedText: "ColGroup1" }, { row: 0, col: 2, expectedText: "1992" }, { row: 0, col: 3, expectedText: "1996" }, { row: 0, col: 4, expectedText: Matrix.TotalLabel },
                { row: 1, col: 0, expectedText: "RowGroup1" }, { row: 1, col: 1, expectedText: "RowGroup2" }, { row: 1, col: 2, expectedText: "Silver" }, { row: 1, col: 3, expectedText: "Gold" }, { row: 1, col: 4, expectedText: Matrix.TotalLabel }, { row: 1, col: 5, expectedText: "Silver" }, { row: 1, col: 6, expectedText: "Gold" }, { row: 1, col: 7, expectedText: Matrix.TotalLabel }
            ];
            let clicks = [
                { row: 0, col: 1 }, { row: 0, col: 2 }, { row: 0, col: 3 }, { row: 0, col: 4 },
                { row: 1, col: 0 }, { row: 1, col: 1 }, { row: 1, col: 2 }, { row: 1, col: 3 }, { row: 1, col: 4 }, { row: 1, col: 5 }, { row: 1, col: 6 }, { row: 1, col: 7 }
            ];
            let expectedSorts = [
                [{ queryName: "Measure1", sortDirection: powerbi.SortDirection.Descending }], [{ queryName: "RowGroup1", sortDirection: powerbi.SortDirection.Descending }], [{ queryName: "RowGroup2", sortDirection: powerbi.SortDirection.Descending }]
            ];

            tablixHelper.runTablixSortTest(element, done, "matrix", data, expectedColumnHeaders, clicks, expectedSorts);
        });

        it("matrix with two row groups, two column groups and two measures with totals", (done) => {
            // Clicking on any row group will result in a sort event, clicking on any column group or measure column will not result in a sort event; clicking on the column grand total will result in a sort (by measure)
            let data: powerbi.DataView = matrixTwoRowGroupsTwoColumnGroupsTwoMeasuresAndTotalsDataView;
            let expectedColumnHeaders = [
                { row: 0, col: 1, expectedText: "ColGroup1" }, { row: 0, col: 2, expectedText: "1992" }, { row: 0, col: 3, expectedText: "1996" }, { row: 0, col: 4, expectedText: Matrix.TotalLabel },
                { row: 1, col: 1, expectedText: "ColGroup2" }, { row: 1, col: 2, expectedText: "Silver" }, { row: 1, col: 3, expectedText: "Gold" }, { row: 1, col: 4, expectedText: Matrix.TotalLabel }, { row: 1, col: 5, expectedText: "Silver" }, { row: 1, col: 6, expectedText: "Gold" }, { row: 1, col: 7, expectedText: Matrix.TotalLabel },
                { row: 2, col: 0, expectedText: "RowGroup1" }, { row: 2, col: 1, expectedText: "RowGroup2" }, { row: 2, col: 2, expectedText: "Measure1" }, { row: 2, col: 3, expectedText: "Measure2" }, { row: 2, col: 4, expectedText: "Measure1" }, { row: 2, col: 5, expectedText: "Measure2" }, { row: 2, col: 6, expectedText: "Measure1" }, { row: 2, col: 7, expectedText: "Measure2" }, { row: 2, col: 8, expectedText: "Measure1" }, { row: 2, col: 9, expectedText: "Measure2" }, { row: 2, col: 10, expectedText: "Measure1" }, { row: 2, col: 11, expectedText: "Measure2" }, { row: 2, col: 12, expectedText: "Measure1" }, { row: 2, col: 13, expectedText: "Measure2" }, { row: 2, col: 14, expectedText: "Measure1" }, { row: 2, col: 15, expectedText: "Measure2" }
            ];
            let clicks = [
                { row: 0, col: 1 }, { row: 0, col: 2 }, { row: 0, col: 3 }, { row: 0, col: 4 },
                { row: 1, col: 1 }, { row: 1, col: 2 }, { row: 1, col: 3 }, { row: 1, col: 4 }, { row: 1, col: 5 }, { row: 1, col: 6 }, { row: 1, col: 7 },
                { row: 2, col: 0 }, { row: 2, col: 1 }, { row: 2, col: 2 }, { row: 2, col: 3 }, { row: 2, col: 4 }, { row: 2, col: 5 }, { row: 2, col: 6 }, { row: 2, col: 7 }, { row: 2, col: 8 }, { row: 2, col: 9 }, { row: 2, col: 10 }, { row: 2, col: 11 }, { row: 2, col: 12 }, { row: 2, col: 13 }, { row: 2, col: 14 }, { row: 2, col: 15 }
            ];
            let expectedSorts = [
                [{ queryName: "RowGroup1", sortDirection: powerbi.SortDirection.Descending }], [{ queryName: "RowGroup2", sortDirection: powerbi.SortDirection.Descending }], [{ queryName: "Measure1", sortDirection: powerbi.SortDirection.Descending }], [{ queryName: "Measure2", sortDirection: powerbi.SortDirection.Descending }]
            ];

            tablixHelper.runTablixSortTest(element, done, "matrix", data, expectedColumnHeaders, clicks, expectedSorts);
        });

        it("matrix with columnGroup url", (done) => {
            let data: powerbi.DataView = matrixOneMeasureOneColumnGroupWithUrlOneGroupInstanceDataView;

            let renderTablixPromise = tablixHelper.renderNewTablix(
                element,
                {
                    visualType: "matrix",
                    data: data
                });

            renderTablixPromise.then(
                () => {
                    let tableBody = $(".tablixContainer > div.bi-tablix > div:nth-child(1) > table.unselectable > tbody");
                    expect(tableBody).toBeInDOM();

                    let cellInfo = tablixHelper.getTableCell(tableBody, { row: 0, col: 1 });
                    let aTag = $("> div > a", cellInfo.clickTarget);
                    expect(aTag.length).toBe(1);
                    expect(aTag.text()).toBe("http://www.validurl.com");
                    expect(aTag.attr("href")).toBe("http://www.validurl.com");
                    expect(aTag.attr("title")).toBe("http://www.validurl.com");
                    done();
                });
        });

        it("matrix with rowGroup url", (done) => {
            let data: powerbi.DataView = matrixOneMeasureOneRowGroupUrlOneGroupInstanceDataView;

            let renderTablixPromise = tablixHelper.renderNewTablix(
                element,
                {
                    visualType: "matrix",
                    data: data
                });

            renderTablixPromise.then(
                () => {
                    let tableBody = $(".tablixContainer > div.bi-tablix > div:nth-child(1) > table.unselectable > tbody");
                    expect(tableBody).toBeInDOM();

                    let cellInfo = tablixHelper.getTableCell(tableBody, { row: 1, col: 0 });
                    let aTag = $("> div > a", cellInfo.clickTarget);
                    expect(aTag.length).toBe(1);
                    expect(aTag.text()).toBe("http://www.validurl.com");
                    expect(aTag.attr("href")).toBe("http://www.validurl.com");
                    expect(aTag.attr("title")).toBe("http://www.validurl.com");
                    done();
                });
        });

        it("matrix with rowGroup Kpi", (done) => {
            let data: powerbi.DataView = matrixOneMeasureOneRowGroupKpiStatusOneGroupInstanceDataView;

            let renderTablixPromise = tablixHelper.renderNewTablix(
                element,
                {
                    visualType: "matrix",
                    data: data
                });

            renderTablixPromise.then(
                () => {
                    let tableBody = $(".tablixContainer > div.bi-tablix > div:nth-child(1) > table.unselectable > tbody");
                    expect(tableBody).toBeInDOM();

                    let cellHeader = tablixHelper.getTableCell(tableBody, { row: 0, col: 1 });
                    let headerDiv = $("> div", cellHeader.clickTarget);
                    let cellInfo = tablixHelper.getTableCell(tableBody, { row: 1, col: 1 });
                    let kpiDiv = $("div.powervisuals-glyph.circle.kpi-green", cellInfo.clickTarget);

                    expect(headerDiv.text()).toBe('ColGroupKpiStatus');
                    expect(kpiDiv.length).toBe(1);
                    expect(kpiDiv.text()).toEqual('');

                    done();
                });
        });
    });
}
