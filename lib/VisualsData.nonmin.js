var __extends = this && this.__extends || function(d, b) {
    function __() {
        this.constructor = d;
    }
    for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
    d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
}, powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var DefaultSQExprVisitorWithArg = function() {
            function DefaultSQExprVisitorWithArg() {}
            return DefaultSQExprVisitorWithArg.prototype.visitEntity = function(expr, arg) {
                return this.visitDefault(expr, arg);
            }, DefaultSQExprVisitorWithArg.prototype.visitColumnRef = function(expr, arg) {
                return this.visitDefault(expr, arg);
            }, DefaultSQExprVisitorWithArg.prototype.visitMeasureRef = function(expr, arg) {
                return this.visitDefault(expr, arg);
            }, DefaultSQExprVisitorWithArg.prototype.visitAggr = function(expr, arg) {
                return this.visitDefault(expr, arg);
            }, DefaultSQExprVisitorWithArg.prototype.visitHierarchy = function(expr, arg) {
                return this.visitDefault(expr, arg);
            }, DefaultSQExprVisitorWithArg.prototype.visitHierarchyLevel = function(expr, arg) {
                return this.visitDefault(expr, arg);
            }, DefaultSQExprVisitorWithArg.prototype.visitPropertyVariationSource = function(expr, arg) {
                return this.visitDefault(expr, arg);
            }, DefaultSQExprVisitorWithArg.prototype.visitBetween = function(expr, arg) {
                return this.visitDefault(expr, arg);
            }, DefaultSQExprVisitorWithArg.prototype.visitIn = function(expr, arg) {
                return this.visitDefault(expr, arg);
            }, DefaultSQExprVisitorWithArg.prototype.visitAnd = function(expr, arg) {
                return this.visitDefault(expr, arg);
            }, DefaultSQExprVisitorWithArg.prototype.visitOr = function(expr, arg) {
                return this.visitDefault(expr, arg);
            }, DefaultSQExprVisitorWithArg.prototype.visitCompare = function(expr, arg) {
                return this.visitDefault(expr, arg);
            }, DefaultSQExprVisitorWithArg.prototype.visitContains = function(expr, arg) {
                return this.visitDefault(expr, arg);
            }, DefaultSQExprVisitorWithArg.prototype.visitExists = function(expr, arg) {
                return this.visitDefault(expr, arg);
            }, DefaultSQExprVisitorWithArg.prototype.visitNot = function(expr, arg) {
                return this.visitDefault(expr, arg);
            }, DefaultSQExprVisitorWithArg.prototype.visitStartsWith = function(expr, arg) {
                return this.visitDefault(expr, arg);
            }, DefaultSQExprVisitorWithArg.prototype.visitConstant = function(expr, arg) {
                return this.visitDefault(expr, arg);
            }, DefaultSQExprVisitorWithArg.prototype.visitDateSpan = function(expr, arg) {
                return this.visitDefault(expr, arg);
            }, DefaultSQExprVisitorWithArg.prototype.visitDateAdd = function(expr, arg) {
                return this.visitDefault(expr, arg);
            }, DefaultSQExprVisitorWithArg.prototype.visitNow = function(expr, arg) {
                return this.visitDefault(expr, arg);
            }, DefaultSQExprVisitorWithArg.prototype.visitDefaultValue = function(expr, arg) {
                return this.visitDefault(expr, arg);
            }, DefaultSQExprVisitorWithArg.prototype.visitAnyValue = function(expr, arg) {
                return this.visitDefault(expr, arg);
            }, DefaultSQExprVisitorWithArg.prototype.visitDefault = function(expr, arg) {}, 
            DefaultSQExprVisitorWithArg;
        }();
        data.DefaultSQExprVisitorWithArg = DefaultSQExprVisitorWithArg;
        var DefaultSQExprVisitor = function(_super) {
            function DefaultSQExprVisitor() {
                _super.apply(this, arguments);
            }
            return __extends(DefaultSQExprVisitor, _super), DefaultSQExprVisitor;
        }(DefaultSQExprVisitorWithArg);
        data.DefaultSQExprVisitor = DefaultSQExprVisitor;
        var DefaultSQExprVisitorWithTraversal = function() {
            function DefaultSQExprVisitorWithTraversal() {}
            return DefaultSQExprVisitorWithTraversal.prototype.visitEntity = function(expr) {
                this.visitDefault(expr);
            }, DefaultSQExprVisitorWithTraversal.prototype.visitColumnRef = function(expr) {
                expr.source.accept(this);
            }, DefaultSQExprVisitorWithTraversal.prototype.visitMeasureRef = function(expr) {
                expr.source.accept(this);
            }, DefaultSQExprVisitorWithTraversal.prototype.visitAggr = function(expr) {
                expr.arg.accept(this);
            }, DefaultSQExprVisitorWithTraversal.prototype.visitHierarchy = function(expr) {
                expr.arg.accept(this);
            }, DefaultSQExprVisitorWithTraversal.prototype.visitHierarchyLevel = function(expr) {
                expr.arg.accept(this);
            }, DefaultSQExprVisitorWithTraversal.prototype.visitPropertyVariationSource = function(expr) {
                expr.arg.accept(this);
            }, DefaultSQExprVisitorWithTraversal.prototype.visitBetween = function(expr) {
                expr.arg.accept(this), expr.lower.accept(this), expr.upper.accept(this);
            }, DefaultSQExprVisitorWithTraversal.prototype.visitIn = function(expr) {
                for (var args = expr.args, i = 0, len = args.length; len > i; i++) args[i].accept(this);
                for (var values = expr.values, i = 0, len = values.length; len > i; i++) for (var valueTuple = values[i], j = 0, jlen = valueTuple.length; jlen > j; j++) valueTuple[j].accept(this);
            }, DefaultSQExprVisitorWithTraversal.prototype.visitAnd = function(expr) {
                expr.left.accept(this), expr.right.accept(this);
            }, DefaultSQExprVisitorWithTraversal.prototype.visitOr = function(expr) {
                expr.left.accept(this), expr.right.accept(this);
            }, DefaultSQExprVisitorWithTraversal.prototype.visitCompare = function(expr) {
                expr.left.accept(this), expr.right.accept(this);
            }, DefaultSQExprVisitorWithTraversal.prototype.visitContains = function(expr) {
                expr.left.accept(this), expr.right.accept(this);
            }, DefaultSQExprVisitorWithTraversal.prototype.visitExists = function(expr) {
                expr.arg.accept(this);
            }, DefaultSQExprVisitorWithTraversal.prototype.visitNot = function(expr) {
                expr.arg.accept(this);
            }, DefaultSQExprVisitorWithTraversal.prototype.visitStartsWith = function(expr) {
                expr.left.accept(this), expr.right.accept(this);
            }, DefaultSQExprVisitorWithTraversal.prototype.visitConstant = function(expr) {
                this.visitDefault(expr);
            }, DefaultSQExprVisitorWithTraversal.prototype.visitDateSpan = function(expr) {
                expr.arg.accept(this);
            }, DefaultSQExprVisitorWithTraversal.prototype.visitDateAdd = function(expr) {
                expr.arg.accept(this);
            }, DefaultSQExprVisitorWithTraversal.prototype.visitNow = function(expr) {
                this.visitDefault(expr);
            }, DefaultSQExprVisitorWithTraversal.prototype.visitDefaultValue = function(expr) {
                this.visitDefault(expr);
            }, DefaultSQExprVisitorWithTraversal.prototype.visitAnyValue = function(expr) {
                this.visitDefault(expr);
            }, DefaultSQExprVisitorWithTraversal.prototype.visitDefault = function(expr) {}, 
            DefaultSQExprVisitorWithTraversal;
        }();
        data.DefaultSQExprVisitorWithTraversal = DefaultSQExprVisitorWithTraversal;
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    function createEnumType(members) {
        return new EnumType(members);
    }
    powerbi.createEnumType = createEnumType;
    var EnumType = function() {
        function EnumType(allMembers) {
            this.allMembers = allMembers;
        }
        return EnumType.prototype.members = function(validMembers) {
            var allMembers = this.allMembers;
            if (!validMembers) return allMembers;
            for (var membersToReturn = [], _i = 0; _i < allMembers.length; _i++) {
                var member = allMembers[_i];
                _.contains(validMembers, member.value) && membersToReturn.push(member);
            }
            return membersToReturn;
        }, EnumType;
    }();
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var FillSolidColorTypeDescriptor;
    !function(FillSolidColorTypeDescriptor) {
        function nullable(descriptor) {
            if (descriptor === !0) return !1;
            var advancedDescriptor = descriptor;
            return !!advancedDescriptor.nullable;
        }
        FillSolidColorTypeDescriptor.nullable = nullable;
    }(FillSolidColorTypeDescriptor = powerbi.FillSolidColorTypeDescriptor || (powerbi.FillSolidColorTypeDescriptor = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var ImageDefinition;
    !function(ImageDefinition) {
        ImageDefinition.urlType = {
            misc: {
                imageUrl: !0
            }
        };
    }(ImageDefinition = powerbi.ImageDefinition || (powerbi.ImageDefinition = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var StructuralTypeDescriptor;
    !function(StructuralTypeDescriptor) {
        function isValid(type) {
            return type.fill || type.fillRule || type.filter || type.expression || type.image || type.paragraphs ? !0 : !1;
        }
        StructuralTypeDescriptor.isValid = isValid;
    }(StructuralTypeDescriptor = powerbi.StructuralTypeDescriptor || (powerbi.StructuralTypeDescriptor = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    function getPrimitiveType(extendedType) {
        return extendedType & PrimitiveTypeMask;
    }
    function isPrimitiveType(extendedType) {
        return (extendedType & PrimitiveTypeWithFlagsMask) === extendedType;
    }
    function getCategoryFromExtendedType(extendedType) {
        if (isPrimitiveType(extendedType)) return null;
        var category = ExtendedType[extendedType];
        if (category) {
            var delimIdx = category.lastIndexOf("_");
            if (delimIdx > 0) {
                var baseCategory = category.slice(0, delimIdx);
                ExtendedType[baseCategory] && (category = baseCategory);
            }
        }
        return category || null;
    }
    function toExtendedType(primitiveType, category) {
        var primitiveString = PrimitiveType[primitiveType], t = ExtendedType[primitiveString];
        if (null == t && (t = ExtendedType.Null), primitiveType && category) {
            var categoryType = ExtendedType[category];
            if (categoryType) {
                var categoryPrimitiveType = getPrimitiveType(categoryType);
                categoryPrimitiveType === PrimitiveType.Null ? (categoryType = t | categoryType, 
                ExtendedType[categoryType] && (t = categoryType)) : categoryPrimitiveType === primitiveType && (t = categoryType);
            }
        }
        return t;
    }
    function matchesExtendedTypeWithAnyPrimitive(a, b) {
        return (a & PrimitiveTypeFlagsExcludedMask) === (b & PrimitiveTypeFlagsExcludedMask);
    }
    var EnumExtensions = jsCommon.EnumExtensions, ValueType = function() {
        function ValueType(type, category, enumType) {
            this.underlyingType = type, this.category = category, EnumExtensions.hasFlag(type, ExtendedType.Temporal) && (this.temporalType = new TemporalType(type)), 
            EnumExtensions.hasFlag(type, ExtendedType.Geography) && (this.geographyType = new GeographyType(type)), 
            EnumExtensions.hasFlag(type, ExtendedType.Miscellaneous) && (this.miscType = new MiscellaneousType(type)), 
            EnumExtensions.hasFlag(type, ExtendedType.Formatting) && (this.formattingType = new FormattingType(type)), 
            EnumExtensions.hasFlag(type, ExtendedType.Enumeration) && (this.enumType = enumType), 
            EnumExtensions.hasFlag(type, ExtendedType.Scripting) && (this.scriptingType = new ScriptType(type));
        }
        return ValueType.fromDescriptor = function(descriptor) {
            if (descriptor = descriptor || {}, descriptor.text) return ValueType.fromExtendedType(ExtendedType.Text);
            if (descriptor.integer) return ValueType.fromExtendedType(ExtendedType.Integer);
            if (descriptor.numeric) return ValueType.fromExtendedType(ExtendedType.Double);
            if (descriptor.bool) return ValueType.fromExtendedType(ExtendedType.Boolean);
            if (descriptor.dateTime) return ValueType.fromExtendedType(ExtendedType.DateTime);
            if (descriptor.duration) return ValueType.fromExtendedType(ExtendedType.Duration);
            if (descriptor.binary) return ValueType.fromExtendedType(ExtendedType.Binary);
            if (descriptor.none) return ValueType.fromExtendedType(ExtendedType.None);
            if (descriptor.scripting && descriptor.scripting.source) return ValueType.fromExtendedType(ExtendedType.ScriptSource);
            if (descriptor.enumeration) return ValueType.fromEnum(descriptor.enumeration);
            if (descriptor.temporal) {
                if (descriptor.temporal.year) return ValueType.fromExtendedType(ExtendedType.Year_Integer);
                if (descriptor.temporal.month) return ValueType.fromExtendedType(ExtendedType.Month_Integer);
            }
            if (descriptor.geography) {
                if (descriptor.geography.address) return ValueType.fromExtendedType(ExtendedType.Address);
                if (descriptor.geography.city) return ValueType.fromExtendedType(ExtendedType.City);
                if (descriptor.geography.continent) return ValueType.fromExtendedType(ExtendedType.Continent);
                if (descriptor.geography.country) return ValueType.fromExtendedType(ExtendedType.Country);
                if (descriptor.geography.county) return ValueType.fromExtendedType(ExtendedType.County);
                if (descriptor.geography.region) return ValueType.fromExtendedType(ExtendedType.Region);
                if (descriptor.geography.postalCode) return ValueType.fromExtendedType(ExtendedType.PostalCode_Text);
                if (descriptor.geography.stateOrProvince) return ValueType.fromExtendedType(ExtendedType.StateOrProvince);
                if (descriptor.geography.place) return ValueType.fromExtendedType(ExtendedType.Place);
                if (descriptor.geography.latitude) return ValueType.fromExtendedType(ExtendedType.Latitude_Double);
                if (descriptor.geography.longitude) return ValueType.fromExtendedType(ExtendedType.Longitude_Double);
            }
            if (descriptor.misc) {
                if (descriptor.misc.image) return ValueType.fromExtendedType(ExtendedType.Image);
                if (descriptor.misc.imageUrl) return ValueType.fromExtendedType(ExtendedType.ImageUrl);
                if (descriptor.misc.webUrl) return ValueType.fromExtendedType(ExtendedType.WebUrl);
            }
            if (descriptor.formatting) {
                if (descriptor.formatting.color) return ValueType.fromExtendedType(ExtendedType.Color);
                if (descriptor.formatting.formatString) return ValueType.fromExtendedType(ExtendedType.FormatString);
                if (descriptor.formatting.alignment) return ValueType.fromExtendedType(ExtendedType.Alignment);
                if (descriptor.formatting.labelDisplayUnits) return ValueType.fromExtendedType(ExtendedType.LabelDisplayUnits);
                if (descriptor.formatting.fontSize) return ValueType.fromExtendedType(ExtendedType.FontSize);
                if (descriptor.formatting.labelDensity) return ValueType.fromExtendedType(ExtendedType.LabelDensity);
            }
            return descriptor.extendedType ? ValueType.fromExtendedType(descriptor.extendedType) : ValueType.fromExtendedType(ExtendedType.Null);
        }, ValueType.fromExtendedType = function(extendedType) {
            extendedType = extendedType || ExtendedType.Null;
            var primitiveType = getPrimitiveType(extendedType), category = getCategoryFromExtendedType(extendedType);
            return ValueType.fromPrimitiveTypeAndCategory(primitiveType, category);
        }, ValueType.fromPrimitiveTypeAndCategory = function(primitiveType, category) {
            primitiveType = primitiveType || PrimitiveType.Null, category = category || null;
            var id = primitiveType.toString();
            return category && (id += "|" + category), ValueType.typeCache[id] || (ValueType.typeCache[id] = new ValueType(toExtendedType(primitiveType, category), category));
        }, ValueType.fromEnum = function(enumType) {
            return new ValueType(ExtendedType.Enumeration, null, enumType);
        }, ValueType.prototype.isCompatibleFrom = function(other) {
            var otherPrimitiveType = other.primitiveType;
            return this === other || this.primitiveType === otherPrimitiveType || otherPrimitiveType === PrimitiveType.Null ? !0 : !1;
        }, Object.defineProperty(ValueType.prototype, "primitiveType", {
            get: function() {
                return getPrimitiveType(this.underlyingType);
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(ValueType.prototype, "extendedType", {
            get: function() {
                return this.underlyingType;
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(ValueType.prototype, "categoryString", {
            get: function() {
                return this.category;
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(ValueType.prototype, "text", {
            get: function() {
                return this.primitiveType === PrimitiveType.Text;
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(ValueType.prototype, "numeric", {
            get: function() {
                return EnumExtensions.hasFlag(this.underlyingType, ExtendedType.Numeric);
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(ValueType.prototype, "integer", {
            get: function() {
                return this.primitiveType === PrimitiveType.Integer;
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(ValueType.prototype, "bool", {
            get: function() {
                return this.primitiveType === PrimitiveType.Boolean;
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(ValueType.prototype, "dateTime", {
            get: function() {
                return this.primitiveType === PrimitiveType.DateTime || this.primitiveType === PrimitiveType.Date || this.primitiveType === PrimitiveType.Time;
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(ValueType.prototype, "duration", {
            get: function() {
                return this.primitiveType === PrimitiveType.Duration;
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(ValueType.prototype, "binary", {
            get: function() {
                return this.primitiveType === PrimitiveType.Binary;
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(ValueType.prototype, "none", {
            get: function() {
                return this.primitiveType === PrimitiveType.None;
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(ValueType.prototype, "temporal", {
            get: function() {
                return this.temporalType;
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(ValueType.prototype, "geography", {
            get: function() {
                return this.geographyType;
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(ValueType.prototype, "misc", {
            get: function() {
                return this.miscType;
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(ValueType.prototype, "formatting", {
            get: function() {
                return this.formattingType;
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(ValueType.prototype, "enum", {
            get: function() {
                return this.enumType;
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(ValueType.prototype, "scripting", {
            get: function() {
                return this.scriptingType;
            },
            enumerable: !0,
            configurable: !0
        }), ValueType.typeCache = {}, ValueType;
    }();
    powerbi.ValueType = ValueType;
    var ScriptType = function() {
        function ScriptType(type) {
            this.underlyingType = type;
        }
        return Object.defineProperty(ScriptType.prototype, "source", {
            get: function() {
                return matchesExtendedTypeWithAnyPrimitive(this.underlyingType, ExtendedType.ScriptSource);
            },
            enumerable: !0,
            configurable: !0
        }), ScriptType;
    }();
    powerbi.ScriptType = ScriptType;
    var TemporalType = function() {
        function TemporalType(type) {
            this.underlyingType = type;
        }
        return Object.defineProperty(TemporalType.prototype, "year", {
            get: function() {
                return matchesExtendedTypeWithAnyPrimitive(this.underlyingType, ExtendedType.Year);
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(TemporalType.prototype, "month", {
            get: function() {
                return matchesExtendedTypeWithAnyPrimitive(this.underlyingType, ExtendedType.Month);
            },
            enumerable: !0,
            configurable: !0
        }), TemporalType;
    }();
    powerbi.TemporalType = TemporalType;
    var GeographyType = function() {
        function GeographyType(type) {
            this.underlyingType = type;
        }
        return Object.defineProperty(GeographyType.prototype, "address", {
            get: function() {
                return matchesExtendedTypeWithAnyPrimitive(this.underlyingType, ExtendedType.Address);
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(GeographyType.prototype, "city", {
            get: function() {
                return matchesExtendedTypeWithAnyPrimitive(this.underlyingType, ExtendedType.City);
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(GeographyType.prototype, "continent", {
            get: function() {
                return matchesExtendedTypeWithAnyPrimitive(this.underlyingType, ExtendedType.Continent);
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(GeographyType.prototype, "country", {
            get: function() {
                return matchesExtendedTypeWithAnyPrimitive(this.underlyingType, ExtendedType.Country);
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(GeographyType.prototype, "county", {
            get: function() {
                return matchesExtendedTypeWithAnyPrimitive(this.underlyingType, ExtendedType.County);
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(GeographyType.prototype, "region", {
            get: function() {
                return matchesExtendedTypeWithAnyPrimitive(this.underlyingType, ExtendedType.Region);
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(GeographyType.prototype, "postalCode", {
            get: function() {
                return matchesExtendedTypeWithAnyPrimitive(this.underlyingType, ExtendedType.PostalCode);
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(GeographyType.prototype, "stateOrProvince", {
            get: function() {
                return matchesExtendedTypeWithAnyPrimitive(this.underlyingType, ExtendedType.StateOrProvince);
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(GeographyType.prototype, "place", {
            get: function() {
                return matchesExtendedTypeWithAnyPrimitive(this.underlyingType, ExtendedType.Place);
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(GeographyType.prototype, "latitude", {
            get: function() {
                return matchesExtendedTypeWithAnyPrimitive(this.underlyingType, ExtendedType.Latitude);
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(GeographyType.prototype, "longitude", {
            get: function() {
                return matchesExtendedTypeWithAnyPrimitive(this.underlyingType, ExtendedType.Longitude);
            },
            enumerable: !0,
            configurable: !0
        }), GeographyType;
    }();
    powerbi.GeographyType = GeographyType;
    var MiscellaneousType = function() {
        function MiscellaneousType(type) {
            this.underlyingType = type;
        }
        return Object.defineProperty(MiscellaneousType.prototype, "image", {
            get: function() {
                return matchesExtendedTypeWithAnyPrimitive(this.underlyingType, ExtendedType.Image);
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(MiscellaneousType.prototype, "imageUrl", {
            get: function() {
                return matchesExtendedTypeWithAnyPrimitive(this.underlyingType, ExtendedType.ImageUrl);
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(MiscellaneousType.prototype, "webUrl", {
            get: function() {
                return matchesExtendedTypeWithAnyPrimitive(this.underlyingType, ExtendedType.WebUrl);
            },
            enumerable: !0,
            configurable: !0
        }), MiscellaneousType;
    }();
    powerbi.MiscellaneousType = MiscellaneousType;
    var FormattingType = function() {
        function FormattingType(type) {
            this.underlyingType = type;
        }
        return Object.defineProperty(FormattingType.prototype, "color", {
            get: function() {
                return matchesExtendedTypeWithAnyPrimitive(this.underlyingType, ExtendedType.Color);
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(FormattingType.prototype, "formatString", {
            get: function() {
                return matchesExtendedTypeWithAnyPrimitive(this.underlyingType, ExtendedType.FormatString);
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(FormattingType.prototype, "alignment", {
            get: function() {
                return matchesExtendedTypeWithAnyPrimitive(this.underlyingType, ExtendedType.Alignment);
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(FormattingType.prototype, "labelDisplayUnits", {
            get: function() {
                return matchesExtendedTypeWithAnyPrimitive(this.underlyingType, ExtendedType.LabelDisplayUnits);
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(FormattingType.prototype, "fontSize", {
            get: function() {
                return matchesExtendedTypeWithAnyPrimitive(this.underlyingType, ExtendedType.FontSize);
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(FormattingType.prototype, "labelDensity", {
            get: function() {
                return matchesExtendedTypeWithAnyPrimitive(this.underlyingType, ExtendedType.LabelDensity);
            },
            enumerable: !0,
            configurable: !0
        }), FormattingType;
    }();
    powerbi.FormattingType = FormattingType, function(PrimitiveType) {
        PrimitiveType[PrimitiveType.Null = 0] = "Null", PrimitiveType[PrimitiveType.Text = 1] = "Text", 
        PrimitiveType[PrimitiveType.Decimal = 2] = "Decimal", PrimitiveType[PrimitiveType.Double = 3] = "Double", 
        PrimitiveType[PrimitiveType.Integer = 4] = "Integer", PrimitiveType[PrimitiveType.Boolean = 5] = "Boolean", 
        PrimitiveType[PrimitiveType.Date = 6] = "Date", PrimitiveType[PrimitiveType.DateTime = 7] = "DateTime", 
        PrimitiveType[PrimitiveType.DateTimeZone = 8] = "DateTimeZone", PrimitiveType[PrimitiveType.Time = 9] = "Time", 
        PrimitiveType[PrimitiveType.Duration = 10] = "Duration", PrimitiveType[PrimitiveType.Binary = 11] = "Binary", 
        PrimitiveType[PrimitiveType.None = 12] = "None";
    }(powerbi.PrimitiveType || (powerbi.PrimitiveType = {}));
    var PrimitiveType = powerbi.PrimitiveType;
    !function(ExtendedType) {
        ExtendedType[ExtendedType.Numeric = 256] = "Numeric", ExtendedType[ExtendedType.Temporal = 512] = "Temporal", 
        ExtendedType[ExtendedType.Geography = 1024] = "Geography", ExtendedType[ExtendedType.Miscellaneous = 2048] = "Miscellaneous", 
        ExtendedType[ExtendedType.Formatting = 4096] = "Formatting", ExtendedType[ExtendedType.Scripting = 8192] = "Scripting", 
        ExtendedType[ExtendedType.Null = 0] = "Null", ExtendedType[ExtendedType.Text = 1] = "Text", 
        ExtendedType[ExtendedType.Decimal = 258] = "Decimal", ExtendedType[ExtendedType.Double = 259] = "Double", 
        ExtendedType[ExtendedType.Integer = 260] = "Integer", ExtendedType[ExtendedType.Boolean = 5] = "Boolean", 
        ExtendedType[ExtendedType.Date = 518] = "Date", ExtendedType[ExtendedType.DateTime = 519] = "DateTime", 
        ExtendedType[ExtendedType.DateTimeZone = 520] = "DateTimeZone", ExtendedType[ExtendedType.Time = 521] = "Time", 
        ExtendedType[ExtendedType.Duration = 10] = "Duration", ExtendedType[ExtendedType.Binary = 11] = "Binary", 
        ExtendedType[ExtendedType.None = 12] = "None", ExtendedType[ExtendedType.Year = 66048] = "Year", 
        ExtendedType[ExtendedType.Year_Text = 66049] = "Year_Text", ExtendedType[ExtendedType.Year_Integer = 66308] = "Year_Integer", 
        ExtendedType[ExtendedType.Year_Date = 66054] = "Year_Date", ExtendedType[ExtendedType.Year_DateTime = 66055] = "Year_DateTime", 
        ExtendedType[ExtendedType.Month = 131584] = "Month", ExtendedType[ExtendedType.Month_Text = 131585] = "Month_Text", 
        ExtendedType[ExtendedType.Month_Integer = 131844] = "Month_Integer", ExtendedType[ExtendedType.Month_Date = 131590] = "Month_Date", 
        ExtendedType[ExtendedType.Month_DateTime = 131591] = "Month_DateTime", ExtendedType[ExtendedType.Address = 6554625] = "Address", 
        ExtendedType[ExtendedType.City = 6620161] = "City", ExtendedType[ExtendedType.Continent = 6685697] = "Continent", 
        ExtendedType[ExtendedType.Country = 6751233] = "Country", ExtendedType[ExtendedType.County = 6816769] = "County", 
        ExtendedType[ExtendedType.Region = 6882305] = "Region", ExtendedType[ExtendedType.PostalCode = 6947840] = "PostalCode", 
        ExtendedType[ExtendedType.PostalCode_Text = 6947841] = "PostalCode_Text", ExtendedType[ExtendedType.PostalCode_Integer = 6948100] = "PostalCode_Integer", 
        ExtendedType[ExtendedType.StateOrProvince = 7013377] = "StateOrProvince", ExtendedType[ExtendedType.Place = 7078913] = "Place", 
        ExtendedType[ExtendedType.Latitude = 7144448] = "Latitude", ExtendedType[ExtendedType.Latitude_Decimal = 7144706] = "Latitude_Decimal", 
        ExtendedType[ExtendedType.Latitude_Double = 7144707] = "Latitude_Double", ExtendedType[ExtendedType.Longitude = 7209984] = "Longitude", 
        ExtendedType[ExtendedType.Longitude_Decimal = 7210242] = "Longitude_Decimal", ExtendedType[ExtendedType.Longitude_Double = 7210243] = "Longitude_Double", 
        ExtendedType[ExtendedType.Image = 13109259] = "Image", ExtendedType[ExtendedType.ImageUrl = 13174785] = "ImageUrl", 
        ExtendedType[ExtendedType.WebUrl = 13240321] = "WebUrl", ExtendedType[ExtendedType.Color = 19664897] = "Color", 
        ExtendedType[ExtendedType.FormatString = 19730433] = "FormatString", ExtendedType[ExtendedType.Alignment = 20058113] = "Alignment", 
        ExtendedType[ExtendedType.LabelDisplayUnits = 20123649] = "LabelDisplayUnits", ExtendedType[ExtendedType.FontSize = 20189443] = "FontSize", 
        ExtendedType[ExtendedType.LabelDensity = 20254979] = "LabelDensity", ExtendedType[ExtendedType.Enumeration = 26214401] = "Enumeration", 
        ExtendedType[ExtendedType.ScriptSource = 32776193] = "ScriptSource";
    }(powerbi.ExtendedType || (powerbi.ExtendedType = {}));
    var ExtendedType = powerbi.ExtendedType, PrimitiveTypeMask = 255, PrimitiveTypeWithFlagsMask = 65535, PrimitiveTypeFlagsExcludedMask = 4294901760;
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var ConceptualSchema = function() {
            function ConceptualSchema() {}
            return ConceptualSchema.prototype.findProperty = function(entityName, propertyName) {
                var entity = this.entities.withName(entityName);
                if (entity && !_.isEmpty(entity.properties)) return entity.properties.withName(propertyName);
            }, ConceptualSchema.prototype.findHierarchy = function(entityName, name) {
                var entity = this.entities.withName(entityName);
                if (entity && !_.isEmpty(entity.hierarchies)) return entity.hierarchies.withName(name);
            }, ConceptualSchema.prototype.findHierarchyByVariation = function(variationEntityName, variationColumnName, variationName, hierarchyName) {
                var variationEntity = this.entities.withName(variationEntityName);
                if (variationEntity && !_.isEmpty(variationEntity.properties)) {
                    var variationProperty = variationEntity.properties.withName(variationColumnName);
                    if (variationProperty) {
                        var variationColumn = variationProperty.column;
                        if (variationColumn && !_.isEmpty(variationColumn.variations)) {
                            var variation = variationColumn.variations.withName(variationName);
                            if (variation) {
                                var targetEntity = variation.navigationProperty ? variation.navigationProperty.targetEntity : variationEntity;
                                if (!targetEntity || _.isEmpty(targetEntity.hierarchies)) return;
                                return targetEntity.hierarchies.withName(hierarchyName);
                            }
                        }
                    }
                }
            }, ConceptualSchema.prototype.findPropertyWithKpi = function(entityName, kpiProperty) {
                var entity = this.entities.withName(entityName);
                if (entity && !_.isEmpty(entity.properties)) for (var _i = 0, _a = entity.properties; _i < _a.length; _i++) {
                    var prop = _a[_i];
                    if (prop && prop.measure && prop.measure.kpi && (prop.measure.kpi.status === kpiProperty || prop.measure.kpi.goal === kpiProperty)) return prop;
                }
            }, ConceptualSchema;
        }();
        data.ConceptualSchema = ConceptualSchema, function(ConceptualDataCategory) {
            ConceptualDataCategory[ConceptualDataCategory.None = 0] = "None", ConceptualDataCategory[ConceptualDataCategory.Address = 1] = "Address", 
            ConceptualDataCategory[ConceptualDataCategory.City = 2] = "City", ConceptualDataCategory[ConceptualDataCategory.Company = 3] = "Company", 
            ConceptualDataCategory[ConceptualDataCategory.Continent = 4] = "Continent", ConceptualDataCategory[ConceptualDataCategory.Country = 5] = "Country", 
            ConceptualDataCategory[ConceptualDataCategory.County = 6] = "County", ConceptualDataCategory[ConceptualDataCategory.Date = 7] = "Date", 
            ConceptualDataCategory[ConceptualDataCategory.Image = 8] = "Image", ConceptualDataCategory[ConceptualDataCategory.ImageUrl = 9] = "ImageUrl", 
            ConceptualDataCategory[ConceptualDataCategory.Latitude = 10] = "Latitude", ConceptualDataCategory[ConceptualDataCategory.Longitude = 11] = "Longitude", 
            ConceptualDataCategory[ConceptualDataCategory.Organization = 12] = "Organization", 
            ConceptualDataCategory[ConceptualDataCategory.Place = 13] = "Place", ConceptualDataCategory[ConceptualDataCategory.PostalCode = 14] = "PostalCode", 
            ConceptualDataCategory[ConceptualDataCategory.Product = 15] = "Product", ConceptualDataCategory[ConceptualDataCategory.StateOrProvince = 16] = "StateOrProvince", 
            ConceptualDataCategory[ConceptualDataCategory.WebUrl = 17] = "WebUrl";
        }(data.ConceptualDataCategory || (data.ConceptualDataCategory = {}));
        data.ConceptualDataCategory;
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        !function(DataShapeBindingLimitType) {
            DataShapeBindingLimitType[DataShapeBindingLimitType.Top = 0] = "Top", DataShapeBindingLimitType[DataShapeBindingLimitType.First = 1] = "First", 
            DataShapeBindingLimitType[DataShapeBindingLimitType.Last = 2] = "Last", DataShapeBindingLimitType[DataShapeBindingLimitType.Sample = 3] = "Sample", 
            DataShapeBindingLimitType[DataShapeBindingLimitType.Bottom = 4] = "Bottom";
        }(data.DataShapeBindingLimitType || (data.DataShapeBindingLimitType = {}));
        data.DataShapeBindingLimitType;
        !function(SubtotalType) {
            SubtotalType[SubtotalType.None = 0] = "None", SubtotalType[SubtotalType.Before = 1] = "Before", 
            SubtotalType[SubtotalType.After = 2] = "After";
        }(data.SubtotalType || (data.SubtotalType = {}));
        data.SubtotalType;
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var DataShapeBindingDataReduction;
        !function(DataShapeBindingDataReduction) {
            function createFrom(reduction) {
                if (reduction) {
                    var result;
                    return reduction.top && (result = {
                        Top: {}
                    }, reduction.top.count && (result.Top.Count = reduction.top.count)), reduction.bottom && (result = {
                        Bottom: {}
                    }, reduction.bottom.count && (result.Bottom.Count = reduction.bottom.count)), reduction.sample && (result = {
                        Sample: {}
                    }, reduction.sample.count && (result.Sample.Count = reduction.sample.count)), reduction.window && (result = {
                        Window: {}
                    }, reduction.window.count && (result.Window.Count = reduction.window.count)), result;
                }
            }
            DataShapeBindingDataReduction.createFrom = createFrom;
        }(DataShapeBindingDataReduction = data.DataShapeBindingDataReduction || (data.DataShapeBindingDataReduction = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var FederatedConceptualSchema = function() {
            function FederatedConceptualSchema(options) {
                this.schemas = options.schemas, options.links && (this.links = options.links);
            }
            return FederatedConceptualSchema.prototype.schema = function(name) {
                return this.schemas[name];
            }, FederatedConceptualSchema;
        }();
        data.FederatedConceptualSchema = FederatedConceptualSchema;
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data_1) {
        var Selector;
        !function(Selector) {
            function filterFromSelector(selectors, isNot) {
                if (!_.isEmpty(selectors)) {
                    for (var exprs = [], i = 0, ilen = selectors.length; ilen > i; i++) {
                        var identity = selectors[i], data_2 = identity.data, exprToAdd = void 0;
                        if (data_2 && data_2.length) for (var j = 0, jlen = data_2.length; jlen > j; j++) exprToAdd = data_1.SQExprBuilder.and(exprToAdd, identity.data[j].expr);
                        exprToAdd && exprs.push(exprToAdd);
                    }
                    return _.isEmpty(exprs) ? void 0 : powerbi.DataViewScopeIdentity.filterFromExprs(exprs, isNot);
                }
            }
            function matchesData(selector, identities) {
                var selectorData = selector.data;
                if (selectorData.length !== identities.length) return !1;
                for (var i = 0, len = selectorData.length; len > i; i++) {
                    var dataItem = selector.data[i], selectorDataItem = dataItem;
                    if (selectorDataItem.expr) {
                        if (!powerbi.DataViewScopeIdentity.equals(selectorDataItem, identities[i])) return !1;
                    } else if (!data_1.DataViewScopeWildcard.matches(dataItem, identities[i])) return !1;
                }
                return !0;
            }
            function matchesKeys(selector, keysList) {
                var selectorData = selector.data, selectorDataLength = selectorData.length;
                if (selectorDataLength !== keysList.length) return !1;
                for (var i = 0; selectorDataLength > i; i++) {
                    var selectorDataItem = selector.data[i], selectorDataExprs = void 0;
                    if (selectorDataExprs = selectorDataItem.expr ? data_1.ScopeIdentityExtractor.getKeys(selectorDataItem.expr) : selectorDataItem.exprs, 
                    selectorDataExprs && !data_1.SQExprUtils.sequenceEqual(keysList[i], selectorDataExprs)) return !1;
                }
                return !0;
            }
            function equals(x, y) {
                return x = x || null, y = y || null, x === y ? !0 : !x != !y ? !1 : x.id !== y.id ? !1 : x.metadata !== y.metadata ? !1 : equalsDataArray(x.data, y.data) ? !0 : !1;
            }
            function equalsDataArray(x, y) {
                if (x = x || null, y = y || null, x === y) return !0;
                if (!x != !y) return !1;
                if (x.length !== y.length) return !1;
                for (var i = 0, len = x.length; len > i; i++) if (!equalsData(x[i], y[i])) return !1;
                return !0;
            }
            function equalsData(x, y) {
                return !x.expr && y.expr ? !1 : powerbi.DataViewScopeIdentity.equals(x, y);
            }
            function getKey(selector) {
                var toStringify = {};
                if (selector.data) {
                    for (var data_3 = [], i = 0, ilen = selector.data.length; ilen > i; i++) data_3.push(selector.data[i].key);
                    toStringify.data = data_3;
                }
                return selector.metadata && (toStringify.metadata = selector.metadata), selector.id && (toStringify.id = selector.id), 
                JSON.stringify(toStringify);
            }
            function containsWildcard(selector) {
                var dataItems = selector.data;
                if (!dataItems) return !1;
                for (var i = 0, len = dataItems.length; len > i; i++) {
                    var wildcard = dataItems[i];
                    if (wildcard.exprs) return !0;
                }
                return !1;
            }
            Selector.filterFromSelector = filterFromSelector, Selector.matchesData = matchesData, 
            Selector.matchesKeys = matchesKeys, Selector.equals = equals, Selector.getKey = getKey, 
            Selector.containsWildcard = containsWildcard;
        }(Selector = data_1.Selector || (data_1.Selector = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        !function(EntitySourceType) {
            EntitySourceType[EntitySourceType.Table = 0] = "Table", EntitySourceType[EntitySourceType.Pod = 1] = "Pod";
        }(data.EntitySourceType || (data.EntitySourceType = {}));
        data.EntitySourceType;
        !function(TimeUnit) {
            TimeUnit[TimeUnit.Day = 0] = "Day", TimeUnit[TimeUnit.Week = 1] = "Week", TimeUnit[TimeUnit.Month = 2] = "Month", 
            TimeUnit[TimeUnit.Year = 3] = "Year", TimeUnit[TimeUnit.Decade = 4] = "Decade", 
            TimeUnit[TimeUnit.Second = 5] = "Second", TimeUnit[TimeUnit.Minute = 6] = "Minute", 
            TimeUnit[TimeUnit.Hour = 7] = "Hour";
        }(data.TimeUnit || (data.TimeUnit = {}));
        data.TimeUnit;
        !function(QueryAggregateFunction) {
            QueryAggregateFunction[QueryAggregateFunction.Sum = 0] = "Sum", QueryAggregateFunction[QueryAggregateFunction.Avg = 1] = "Avg", 
            QueryAggregateFunction[QueryAggregateFunction.Count = 2] = "Count", QueryAggregateFunction[QueryAggregateFunction.Min = 3] = "Min", 
            QueryAggregateFunction[QueryAggregateFunction.Max = 4] = "Max", QueryAggregateFunction[QueryAggregateFunction.CountNonNull = 5] = "CountNonNull", 
            QueryAggregateFunction[QueryAggregateFunction.Median = 6] = "Median", QueryAggregateFunction[QueryAggregateFunction.StandardDeviation = 7] = "StandardDeviation", 
            QueryAggregateFunction[QueryAggregateFunction.Variance = 8] = "Variance";
        }(data.QueryAggregateFunction || (data.QueryAggregateFunction = {}));
        data.QueryAggregateFunction;
        !function(QueryComparisonKind) {
            QueryComparisonKind[QueryComparisonKind.Equal = 0] = "Equal", QueryComparisonKind[QueryComparisonKind.GreaterThan = 1] = "GreaterThan", 
            QueryComparisonKind[QueryComparisonKind.GreaterThanOrEqual = 2] = "GreaterThanOrEqual", 
            QueryComparisonKind[QueryComparisonKind.LessThan = 3] = "LessThan", QueryComparisonKind[QueryComparisonKind.LessThanOrEqual = 4] = "LessThanOrEqual";
        }(data.QueryComparisonKind || (data.QueryComparisonKind = {}));
        data.QueryComparisonKind;
        !function(SemanticType) {
            SemanticType[SemanticType.None = 0] = "None", SemanticType[SemanticType.Number = 1] = "Number", 
            SemanticType[SemanticType.Integer = 3] = "Integer", SemanticType[SemanticType.DateTime = 4] = "DateTime", 
            SemanticType[SemanticType.Time = 8] = "Time", SemanticType[SemanticType.Date = 20] = "Date", 
            SemanticType[SemanticType.Month = 35] = "Month", SemanticType[SemanticType.Year = 67] = "Year", 
            SemanticType[SemanticType.YearAndMonth = 128] = "YearAndMonth", SemanticType[SemanticType.MonthAndDay = 256] = "MonthAndDay", 
            SemanticType[SemanticType.Decade = 515] = "Decade", SemanticType[SemanticType.YearAndWeek = 1024] = "YearAndWeek", 
            SemanticType[SemanticType.String = 2048] = "String", SemanticType[SemanticType.Boolean = 4096] = "Boolean", 
            SemanticType[SemanticType.Table = 8192] = "Table", SemanticType[SemanticType.Range = 16384] = "Range";
        }(data.SemanticType || (data.SemanticType = {}));
        data.SemanticType;
        !function(FilterKind) {
            FilterKind[FilterKind.Default = 0] = "Default", FilterKind[FilterKind.Period = 1] = "Period";
        }(data.FilterKind || (data.FilterKind = {}));
        data.FilterKind;
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var QueryProjectionCollection = function() {
            function QueryProjectionCollection(items, activeProjectionRefs, showAll) {
                this.items = items, this._activeProjectionRefs = activeProjectionRefs, this._showAll = showAll;
            }
            return QueryProjectionCollection.prototype.all = function() {
                return this.items;
            }, Object.defineProperty(QueryProjectionCollection.prototype, "activeProjectionRefs", {
                get: function() {
                    return this._activeProjectionRefs;
                },
                set: function(queryReferences) {
                    if (!_.isEmpty(queryReferences)) {
                        for (var queryRefs = this.items.map(function(val) {
                            return val.queryRef;
                        }), _i = 0; _i < queryReferences.length; _i++) {
                            var queryReference = queryReferences[_i];
                            if (!_.contains(queryRefs, queryReference)) return;
                        }
                        this._activeProjectionRefs = queryReferences;
                    }
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(QueryProjectionCollection.prototype, "showAll", {
                get: function() {
                    return this._showAll;
                },
                set: function(value) {
                    this._showAll = value;
                },
                enumerable: !0,
                configurable: !0
            }), QueryProjectionCollection.prototype.addActiveQueryReference = function(queryRef) {
                this._activeProjectionRefs ? this._activeProjectionRefs.push(queryRef) : this._activeProjectionRefs = [ queryRef ];
            }, QueryProjectionCollection.prototype.getLastActiveQueryReference = function() {
                return _.isEmpty(this._activeProjectionRefs) ? void 0 : this._activeProjectionRefs[this._activeProjectionRefs.length - 1];
            }, QueryProjectionCollection.prototype.clone = function() {
                return new QueryProjectionCollection(_.clone(this.items), _.clone(this._activeProjectionRefs), this._showAll);
            }, QueryProjectionCollection;
        }();
        data.QueryProjectionCollection = QueryProjectionCollection;
        var QueryProjectionsByRole;
        !function(QueryProjectionsByRole) {
            function clone(roles) {
                if (!roles) return roles;
                var clonedRoles = {};
                for (var roleName in roles) clonedRoles[roleName] = roles[roleName].clone();
                return clonedRoles;
            }
            function getRole(roles, name) {
                return roles ? roles[name] : void 0;
            }
            QueryProjectionsByRole.clone = clone, QueryProjectionsByRole.getRole = getRole;
        }(QueryProjectionsByRole = data.QueryProjectionsByRole || (data.QueryProjectionsByRole = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    !function(DisplayUnitSystemType) {
        DisplayUnitSystemType[DisplayUnitSystemType.Default = 0] = "Default", DisplayUnitSystemType[DisplayUnitSystemType.Verbose = 1] = "Verbose", 
        DisplayUnitSystemType[DisplayUnitSystemType.WholeUnits = 2] = "WholeUnits", DisplayUnitSystemType[DisplayUnitSystemType.DataLabels = 3] = "DataLabels";
    }(powerbi.DisplayUnitSystemType || (powerbi.DisplayUnitSystemType = {}));
    powerbi.DisplayUnitSystemType;
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var DataRoleHelper;
        !function(DataRoleHelper) {
            function getMeasureIndexOfRole(grouped, roleName) {
                if (!_.isEmpty(grouped)) {
                    var firstGroup = grouped[0];
                    if (firstGroup.values && firstGroup.values.length > 0) for (var i = 0, len = firstGroup.values.length; len > i; ++i) {
                        var value = firstGroup.values[i];
                        if (value && value.source && hasRole(value.source, roleName)) return i;
                    }
                }
                return -1;
            }
            function getCategoryIndexOfRole(categories, roleName) {
                if (!_.isEmpty(categories)) for (var i = 0, ilen = categories.length; ilen > i; i++) if (hasRole(categories[i].source, roleName)) return i;
                return -1;
            }
            function hasRole(column, name) {
                var roles = column.roles;
                return roles && roles[name];
            }
            function hasRoleInDataView(dataView, name) {
                return null != dataView && null != dataView.metadata && dataView.metadata.columns && _.any(dataView.metadata.columns, function(c) {
                    return c.roles && void 0 !== c.roles[name];
                });
            }
            DataRoleHelper.getMeasureIndexOfRole = getMeasureIndexOfRole, DataRoleHelper.getCategoryIndexOfRole = getCategoryIndexOfRole, 
            DataRoleHelper.hasRole = hasRole, DataRoleHelper.hasRoleInDataView = hasRoleInDataView;
        }(DataRoleHelper = data.DataRoleHelper || (data.DataRoleHelper = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        function createIDataViewCategoricalReader(dataView) {
            return new DataViewCategoricalReader(dataView);
        }
        var DataRoleHelper = powerbi.data.DataRoleHelper;
        data.createIDataViewCategoricalReader = createIDataViewCategoricalReader;
        var DataViewCategoricalReader = function() {
            function DataViewCategoricalReader(dataView) {
                this.dataView = dataView;
                var categorical;
                dataView && (categorical = dataView.categorical);
                var categories;
                categorical && (categories = this.categories = categorical.categories), this.hasValidCategories = !_.isEmpty(categories), 
                this.hasValidCategories && (this.hasCategoryObjects = !!categories[0].objects);
                var values;
                categorical && (values = categorical.values);
                var hasAnyValidValues = this.hasAnyValidValues = !_.isEmpty(values);
                hasAnyValidValues && (this.grouped = dataView.categorical.values.grouped()), this.hasAnyValidValues && (this.dataHasDynamicSeries = !!this.dataView.categorical.values.source);
            }
            return DataViewCategoricalReader.prototype.hasCategories = function() {
                return this.hasValidCategories;
            }, DataViewCategoricalReader.prototype.getCategoryCount = function() {
                return this.hasValidCategories ? this.categories[0].values.length : 0;
            }, DataViewCategoricalReader.prototype.getCategoryValues = function(roleName) {
                if (this.hasValidCategories) {
                    var categories = this.getCategoryFromRole(roleName);
                    return categories ? categories.values : void 0;
                }
            }, DataViewCategoricalReader.prototype.getCategoryValue = function(categoryIndex, roleName) {
                if (this.hasValidCategories) {
                    var categories = this.getCategoryFromRole(roleName);
                    return categories ? categories.values[categoryIndex] : void 0;
                }
            }, DataViewCategoricalReader.prototype.getCategoryColumn = function(roleName) {
                return this.hasValidCategories ? this.getCategoryFromRole(roleName) : void 0;
            }, DataViewCategoricalReader.prototype.getCategoryMetadataColumn = function(roleName) {
                if (this.hasValidCategories) {
                    var categories = this.getCategoryFromRole(roleName);
                    return categories ? categories.source : void 0;
                }
            }, DataViewCategoricalReader.prototype.getCategoryDisplayName = function(roleName) {
                if (this.hasValidCategories) {
                    var targetColumn = this.getCategoryColumn(roleName);
                    if (targetColumn && targetColumn.source) return targetColumn.source.displayName;
                }
            }, DataViewCategoricalReader.prototype.hasCompositeCategories = function() {
                return this.hasValidCategories ? this.categories.length > 1 : void 0;
            }, DataViewCategoricalReader.prototype.hasCategoryWithRole = function(roleName) {
                return -1 !== DataRoleHelper.getCategoryIndexOfRole(this.categories, roleName);
            }, DataViewCategoricalReader.prototype.getCategoryObjects = function(categoryIndex, roleName) {
                return this.hasValidCategories && this.hasCategoryObjects ? this.getCategoryFromRole(roleName).objects[categoryIndex] : void 0;
            }, DataViewCategoricalReader.prototype.getCategoryFromRole = function(roleName) {
                var categories = this.categories;
                return categories[DataRoleHelper.getCategoryIndexOfRole(categories, roleName)];
            }, DataViewCategoricalReader.prototype.hasValues = function(roleName) {
                return -1 !== this.getMeasureIndex(roleName);
            }, DataViewCategoricalReader.prototype.getValues = function(roleName, seriesIndex) {
                void 0 === seriesIndex && (seriesIndex = 0);
                var measureIndex = this.getMeasureIndex(roleName);
                return this.hasAnyValidValues && -1 !== measureIndex ? this.grouped[seriesIndex].values[measureIndex].values : void 0;
            }, DataViewCategoricalReader.prototype.getValue = function(roleName, categoryIndex, seriesIndex) {
                if (this.hasAnyValidValues) {
                    var values = this.getValues(roleName, seriesIndex);
                    return values ? values[categoryIndex] : void 0;
                }
            }, DataViewCategoricalReader.prototype.getFirstNonNullValueForCategory = function(roleName, categoryIndex) {
                if (this.hasAnyValidValues) {
                    if (!this.dataHasDynamicSeries) return this.getValue(roleName, categoryIndex);
                    for (var seriesIndex = 0, seriesCount = this.grouped.length; seriesCount > seriesIndex; seriesIndex++) {
                        var values = this.getValues(roleName, seriesIndex), value = _.isEmpty(values) ? void 0 : values[categoryIndex];
                        if (null != value) return value;
                    }
                }
            }, DataViewCategoricalReader.prototype.getMeasureQueryName = function(roleName) {
                var measureIndex = this.getMeasureIndex(roleName);
                return this.hasAnyValidValues && -1 !== measureIndex ? this.grouped[0].values[measureIndex].source.queryName : void 0;
            }, DataViewCategoricalReader.prototype.getValueColumn = function(roleName, seriesIndex) {
                void 0 === seriesIndex && (seriesIndex = 0);
                var measureIndex = this.getMeasureIndex(roleName);
                return this.hasAnyValidValues && -1 !== measureIndex ? this.grouped[seriesIndex].values[measureIndex] : void 0;
            }, DataViewCategoricalReader.prototype.getValueMetadataColumn = function(roleName, seriesIndex) {
                void 0 === seriesIndex && (seriesIndex = 0);
                var measureIndex = this.getMeasureIndex(roleName);
                return this.hasAnyValidValues && -1 !== measureIndex ? this.grouped[seriesIndex].values[measureIndex].source : void 0;
            }, DataViewCategoricalReader.prototype.getValueDisplayName = function(roleName, seriesIndex) {
                if (this.hasAnyValidValues) {
                    var targetColumn = this.getValueColumn(roleName, seriesIndex);
                    if (targetColumn && targetColumn.source) return targetColumn.source.displayName;
                }
            }, DataViewCategoricalReader.prototype.getMeasureIndex = function(roleName) {
                return DataRoleHelper.getMeasureIndexOfRole(this.grouped, roleName);
            }, DataViewCategoricalReader.prototype.hasDynamicSeries = function() {
                return this.dataHasDynamicSeries;
            }, DataViewCategoricalReader.prototype.getSeriesCount = function() {
                return this.hasAnyValidValues ? this.grouped.length : void 0;
            }, DataViewCategoricalReader.prototype.getSeriesObjects = function(seriesIndex) {
                return this.hasAnyValidValues ? this.grouped[seriesIndex].objects : void 0;
            }, DataViewCategoricalReader.prototype.getSeriesColumn = function(seriesIndex) {
                return this.hasAnyValidValues ? this.dataView.categorical.values[seriesIndex] : void 0;
            }, DataViewCategoricalReader.prototype.getSeriesColumns = function() {
                return this.hasAnyValidValues ? this.dataView.categorical.values : void 0;
            }, DataViewCategoricalReader.prototype.getSeriesMetadataColumn = function() {
                return this.hasAnyValidValues ? this.dataView.categorical.values.source : void 0;
            }, DataViewCategoricalReader.prototype.getSeriesColumnIdentifier = function() {
                return this.hasAnyValidValues ? this.dataView.categorical.values.identityFields : void 0;
            }, DataViewCategoricalReader.prototype.getSeriesName = function(seriesIndex) {
                return this.hasAnyValidValues ? this.grouped[seriesIndex].name : void 0;
            }, DataViewCategoricalReader.prototype.getSeriesDisplayName = function() {
                return this.hasAnyValidValues && this.dataHasDynamicSeries ? this.dataView.categorical.values.source.displayName : void 0;
            }, DataViewCategoricalReader;
        }();
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var DataViewObjectDefinitions, JsonComparer = jsCommon.JsonComparer;
        !function(DataViewObjectDefinitions) {
            function ensure(defns, objectName, selector) {
                var defnsForObject = defns[objectName];
                defnsForObject || (defns[objectName] = defnsForObject = []);
                for (var i = 0, len = defnsForObject.length; len > i; i++) {
                    var defn = defnsForObject[i];
                    if (data.Selector.equals(defn.selector, selector)) return defn;
                }
                var newDefn = {
                    selector: selector,
                    properties: {}
                };
                return defnsForObject.push(newDefn), newDefn;
            }
            function deleteProperty(defns, objectName, selector, propertyName) {
                var defn = getObjectDefinition(defns, objectName, selector);
                defn && DataViewObjectDefinition.deleteSingleProperty(defn, propertyName);
            }
            function setValue(defns, propertyId, selector, value) {
                ensure(defns, propertyId.objectName, selector).properties[propertyId.propertyName] = value;
            }
            function getValue(defns, propertyId, selector) {
                var properties = getPropertyContainer(defns, propertyId, selector);
                if (properties) return properties[propertyId.propertyName];
            }
            function getPropertyContainer(defns, propertyId, selector) {
                var defn = getObjectDefinition(defns, propertyId.objectName, selector);
                if (defn) return defn.properties;
            }
            function getObjectDefinition(defns, objectName, selector) {
                if (defns) {
                    var defnsForObject = defns[objectName];
                    if (defnsForObject) for (var i = 0, len = defnsForObject.length; len > i; i++) {
                        var defn = defnsForObject[i];
                        if (data.Selector.equals(defn.selector, selector)) return defn;
                    }
                }
            }
            function propertiesAreEqual(a, b) {
                return a instanceof data.SemanticFilter && b instanceof data.SemanticFilter ? data.SemanticFilter.isSameFilter(a, b) : JsonComparer.equals(a, b);
            }
            function allPropertiesAreEqual(a, b) {
                if (Object.keys(a).length !== Object.keys(b).length) return !1;
                for (var property in a) if (!propertiesAreEqual(a[property], b[property])) return !1;
                return !0;
            }
            function encodePropertyValue(value, valueTypeDescriptor) {
                if (valueTypeDescriptor.bool) return "boolean" != typeof value && (value = !1), 
                data.SQExprBuilder["boolean"](value);
                if (valueTypeDescriptor.text || valueTypeDescriptor.scripting && valueTypeDescriptor.scripting.source) return data.SQExprBuilder.text(value);
                if (valueTypeDescriptor.numeric) {
                    if ($.isNumeric(value)) return data.SQExprBuilder["double"](+value);
                } else if (valueTypeDescriptor.fill) {
                    if (value) return {
                        solid: {
                            color: data.SQExprBuilder.text(value)
                        }
                    };
                } else {
                    if (valueTypeDescriptor.formatting) return valueTypeDescriptor.formatting.labelDisplayUnits ? data.SQExprBuilder["double"](+value) : data.SQExprBuilder.text(value);
                    if (valueTypeDescriptor.enumeration) return $.isNumeric(value) ? data.SQExprBuilder["double"](+value) : data.SQExprBuilder.text(value);
                    if (valueTypeDescriptor.misc) value = value ? data.SQExprBuilder.text(value) : null; else if (valueTypeDescriptor.image && value) {
                        var imageValue = value, imageDefinition = {
                            name: data.SQExprBuilder.text(imageValue.name),
                            url: data.SQExprBuilder.text(imageValue.url)
                        };
                        return imageValue.scaling && (imageDefinition.scaling = data.SQExprBuilder.text(imageValue.scaling)), 
                        imageDefinition;
                    }
                }
                return value;
            }
            function clone(original) {
                var cloned = {};
                for (var objectName in original) {
                    var originalDefns = original[objectName];
                    if (!_.isEmpty(originalDefns)) {
                        for (var clonedDefns = [], _i = 0; _i < originalDefns.length; _i++) {
                            var originalDefn = originalDefns[_i];
                            clonedDefns.push({
                                properties: cloneProperties(originalDefn.properties),
                                selector: originalDefn.selector
                            });
                        }
                        cloned[objectName] = clonedDefns;
                    }
                }
                return cloned;
            }
            function cloneProperties(original) {
                return _.clone(original);
            }
            DataViewObjectDefinitions.ensure = ensure, DataViewObjectDefinitions.deleteProperty = deleteProperty, 
            DataViewObjectDefinitions.setValue = setValue, DataViewObjectDefinitions.getValue = getValue, 
            DataViewObjectDefinitions.getPropertyContainer = getPropertyContainer, DataViewObjectDefinitions.getObjectDefinition = getObjectDefinition, 
            DataViewObjectDefinitions.propertiesAreEqual = propertiesAreEqual, DataViewObjectDefinitions.allPropertiesAreEqual = allPropertiesAreEqual, 
            DataViewObjectDefinitions.encodePropertyValue = encodePropertyValue, DataViewObjectDefinitions.clone = clone;
        }(DataViewObjectDefinitions = data.DataViewObjectDefinitions || (data.DataViewObjectDefinitions = {}));
        var DataViewObjectDefinition;
        !function(DataViewObjectDefinition) {
            function deleteSingleProperty(defn, propertyName) {
                delete defn.properties[propertyName];
            }
            DataViewObjectDefinition.deleteSingleProperty = deleteSingleProperty;
        }(DataViewObjectDefinition = data.DataViewObjectDefinition || (data.DataViewObjectDefinition = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var DataViewObjectDescriptors;
        !function(DataViewObjectDescriptors) {
            function findFormatString(descriptors) {
                return findProperty(descriptors, function(propDesc) {
                    var formattingTypeDesc = powerbi.ValueType.fromDescriptor(propDesc.type).formatting;
                    return formattingTypeDesc && formattingTypeDesc.formatString;
                });
            }
            function findFilterOutput(descriptors) {
                return findProperty(descriptors, function(propDesc) {
                    var propType = propDesc.type;
                    return propType && !!propType.filter;
                });
            }
            function findDefaultValue(descriptors) {
                return findProperty(descriptors, function(propDesc) {
                    var propType = propDesc.type;
                    return propType && !!propType.expression && propType.expression.defaultValue;
                });
            }
            function findProperty(descriptors, propPredicate) {
                if (descriptors) for (var objectName in descriptors) {
                    var objPropDescs = descriptors[objectName].properties;
                    for (var propertyName in objPropDescs) if (propPredicate(objPropDescs[propertyName])) return {
                        objectName: objectName,
                        propertyName: propertyName
                    };
                }
            }
            DataViewObjectDescriptors.findFormatString = findFormatString, DataViewObjectDescriptors.findFilterOutput = findFilterOutput, 
            DataViewObjectDescriptors.findDefaultValue = findDefaultValue;
        }(DataViewObjectDescriptors = data.DataViewObjectDescriptors || (data.DataViewObjectDescriptors = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var DataViewObjectEvaluationUtils;
        !function(DataViewObjectEvaluationUtils) {
            function evaluateDataViewObjects(evalContext, objectDescriptors, objectDefns) {
                for (var objects, j = 0, jlen = objectDefns.length; jlen > j; j++) {
                    var objectDefinition = objectDefns[j], objectName = objectDefinition.name, evaluatedObject = data.DataViewObjectEvaluator.run(evalContext, objectDescriptors[objectName], objectDefinition.properties);
                    evaluatedObject && (objects || (objects = {}), objects[objectName] = evaluatedObject);
                }
                return objects;
            }
            function groupObjectsBySelector(objectDefinitions) {
                var grouped = {
                    data: []
                };
                if (objectDefinitions) for (var objectName in objectDefinitions) for (var objectDefnList = objectDefinitions[objectName], i = 0, len = objectDefnList.length; len > i; i++) {
                    var objectDefn = objectDefnList[i];
                    ensureDefinitionListForSelector(grouped, objectDefn.selector).objects.push({
                        name: objectName,
                        properties: objectDefn.properties
                    });
                }
                return grouped;
            }
            function ensureDefinitionListForSelector(grouped, selector) {
                if (!selector) return grouped.metadataOnce || (grouped.metadataOnce = {
                    objects: []
                }), grouped.metadataOnce;
                var groupedObjects;
                selector.data ? groupedObjects = grouped.data : selector.metadata ? (grouped.metadata || (grouped.metadata = []), 
                groupedObjects = grouped.metadata) : selector.id && (grouped.userDefined || (grouped.userDefined = []), 
                groupedObjects = grouped.userDefined);
                for (var _i = 0; _i < groupedObjects.length; _i++) {
                    var item_1 = groupedObjects[_i];
                    if (data.Selector.equals(selector, item_1.selector)) return item_1;
                }
                var item = {
                    selector: selector,
                    objects: []
                };
                return groupedObjects.push(item), item;
            }
            function addImplicitObjects(objectsForAllSelectors, objectDescriptors, columns, selectTransforms) {
                selectTransforms && (addDefaultFormatString(objectsForAllSelectors, objectDescriptors, columns, selectTransforms), 
                addDefaultValue(objectsForAllSelectors, objectDescriptors, columns, selectTransforms));
            }
            function addDefaultFormatString(objectsForAllSelectors, objectDescriptors, columns, selectTransforms) {
                var formatStringProp = data.DataViewObjectDescriptors.findFormatString(objectDescriptors);
                if (formatStringProp) for (var selectIdx = 0, selectLen = selectTransforms.length; selectLen > selectIdx; selectIdx++) {
                    var selectTransform = selectTransforms[selectIdx];
                    selectTransform && applyFormatString(objectsForAllSelectors, formatStringProp, selectTransform.queryName, selectTransform.format || getColumnFormatForIndex(columns, selectIdx));
                }
            }
            function addDefaultValue(objectsForAllSelectors, objectDescriptors, columns, selectTransforms) {
                var defaultValueProp = data.DataViewObjectDescriptors.findDefaultValue(objectDescriptors);
                if (defaultValueProp) for (var _i = 0; _i < selectTransforms.length; _i++) {
                    var selectTransform = selectTransforms[_i];
                    selectTransform && applyDefaultValue(objectsForAllSelectors, defaultValueProp, selectTransform.queryName, selectTransform.defaultValue);
                }
            }
            function getColumnFormatForIndex(columns, selectIdx) {
                for (var columnIdx = 0, columnLen = columns.length; columnLen > columnIdx; columnIdx++) {
                    var column = columns[columnIdx];
                    if (column && column.index === selectIdx) return column.format;
                }
            }
            function applyFormatString(objectsForAllSelectors, formatStringProp, queryName, formatStringValue) {
                formatStringValue && applyMetadataProperty(objectsForAllSelectors, formatStringProp, {
                    metadata: queryName
                }, data.SQExprBuilder.text(formatStringValue));
            }
            function applyDefaultValue(objectsForAllSelectors, defaultValueProp, queryName, defaultValue) {
                defaultValue && applyMetadataProperty(objectsForAllSelectors, defaultValueProp, {
                    metadata: queryName
                }, defaultValue);
            }
            function applyMetadataProperty(objectsForAllSelectors, propertyId, selector, value) {
                var objectDefns;
                if (selector) {
                    var metadataObjects = objectsForAllSelectors.metadata;
                    metadataObjects || (metadataObjects = objectsForAllSelectors.metadata = []), objectDefns = metadataObjects;
                } else {
                    var metadataOnce = objectsForAllSelectors.metadataOnce;
                    metadataOnce || (metadataOnce = objectsForAllSelectors.metadataOnce = {
                        selector: selector,
                        objects: []
                    }), objectDefns = [ metadataOnce ];
                }
                var targetObjectDefn, targetMetadataObject = findWithMatchingSelector(objectDefns, selector);
                if (targetMetadataObject) {
                    var targetObjectDefns = targetMetadataObject.objects;
                    if (targetObjectDefn = findExistingObject(targetObjectDefns, propertyId.objectName)) {
                        if (targetObjectDefn.properties[propertyId.propertyName]) return;
                    } else targetObjectDefn = {
                        name: propertyId.objectName,
                        properties: {}
                    }, targetObjectDefns.push(targetObjectDefn);
                } else targetObjectDefn = {
                    name: propertyId.objectName,
                    properties: {}
                }, objectDefns.push({
                    selector: selector,
                    objects: [ targetObjectDefn ]
                });
                targetObjectDefn.properties[propertyId.propertyName] = value;
            }
            function findWithMatchingSelector(objects, selector) {
                for (var i = 0, len = objects.length; len > i; i++) {
                    var object = objects[i];
                    if (data.Selector.equals(object.selector, selector)) return object;
                }
            }
            function findExistingObject(objectDefns, objectName) {
                for (var i = 0, len = objectDefns.length; len > i; i++) {
                    var objectDefn = objectDefns[i];
                    if (objectDefn.name === objectName) return objectDefn;
                }
            }
            DataViewObjectEvaluationUtils.evaluateDataViewObjects = evaluateDataViewObjects, 
            DataViewObjectEvaluationUtils.groupObjectsBySelector = groupObjectsBySelector, DataViewObjectEvaluationUtils.addImplicitObjects = addImplicitObjects;
        }(DataViewObjectEvaluationUtils = data.DataViewObjectEvaluationUtils || (data.DataViewObjectEvaluationUtils = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var DataViewObjectEvaluator;
        !function(DataViewObjectEvaluator) {
            function run(evalContext, objectDescriptor, propertyDefinitions) {
                if (objectDescriptor) {
                    var object, propertyDescriptors = objectDescriptor.properties;
                    for (var propertyName in propertyDefinitions) {
                        var propertyDefinition = propertyDefinitions[propertyName], propertyDescriptor = propertyDescriptors[propertyName];
                        if (propertyDescriptor) {
                            var propertyValue = evaluateProperty(evalContext, propertyDescriptor, propertyDefinition);
                            void 0 !== propertyValue && (object || (object = {}), object[propertyName] = propertyValue);
                        }
                    }
                    return object;
                }
            }
            function evaluateProperty(evalContext, propertyDescriptor, propertyDefinition) {
                var structuralType = propertyDescriptor.type;
                if (structuralType && structuralType.expression) return propertyDefinition;
                var value = evaluateValue(evalContext, propertyDefinition, powerbi.ValueType.fromDescriptor(propertyDescriptor.type));
                return void 0 !== value || propertyDefinition instanceof data.RuleEvaluation ? value : evaluateFill(evalContext, propertyDefinition, structuralType) || evaluateFillRule(evalContext, propertyDefinition, structuralType) || evaluateImage(evalContext, propertyDefinition, structuralType) || evaluateParagraphs(evalContext, propertyDefinition, structuralType) || propertyDefinition;
            }
            function evaluateFill(evalContext, fillDefn, type) {
                var fillType = type.fill;
                if (fillType) return fillType && fillType.solid && fillType.solid.color && fillDefn.solid ? {
                    solid: {
                        color: evaluateValue(evalContext, fillDefn.solid.color, powerbi.ValueType.fromExtendedType(powerbi.ExtendedType.Color))
                    }
                } : void 0;
            }
            function evaluateFillRule(evalContext, fillRuleDefn, type) {
                if (type.fillRule) {
                    if (fillRuleDefn.linearGradient2) {
                        var linearGradient2 = fillRuleDefn.linearGradient2;
                        return {
                            linearGradient2: {
                                min: evaluateColorStop(evalContext, linearGradient2.min),
                                max: evaluateColorStop(evalContext, linearGradient2.max)
                            }
                        };
                    }
                    if (fillRuleDefn.linearGradient3) {
                        var linearGradient3 = fillRuleDefn.linearGradient3;
                        return {
                            linearGradient3: {
                                min: evaluateColorStop(evalContext, linearGradient3.min),
                                mid: evaluateColorStop(evalContext, linearGradient3.mid),
                                max: evaluateColorStop(evalContext, linearGradient3.max)
                            }
                        };
                    }
                }
            }
            function evaluateColorStop(evalContext, colorStop) {
                var step = {
                    color: evaluateValue(evalContext, colorStop.color, colorValueType)
                }, value = evaluateValue(evalContext, colorStop.value, numericType);
                return null != value && (step.value = value), step;
            }
            function evaluateImage(evalContext, definition, type) {
                if (type.image && definition) {
                    var value = {
                        name: evaluateValue(evalContext, definition.name, textType),
                        url: evaluateValue(evalContext, definition.url, powerbi.ValueType.fromDescriptor(powerbi.ImageDefinition.urlType))
                    };
                    return definition.scaling && (value.scaling = evaluateValue(evalContext, definition.scaling, textType)), 
                    value;
                }
            }
            function evaluateParagraphs(evalContext, definition, type) {
                return type.paragraphs && definition ? evaluateArrayCopyOnChange(evalContext, definition, evaluateParagraph) : void 0;
            }
            function evaluateParagraph(evalContext, definition) {
                var evaluated, definitionTextRuns = definition.textRuns, evaluatedTextRuns = evaluateArrayCopyOnChange(evalContext, definitionTextRuns, evaluateTextRun);
                return definitionTextRuns !== evaluatedTextRuns && (evaluated = _.clone(definition), 
                evaluated.textRuns = evaluatedTextRuns), evaluated || definition;
            }
            function evaluateTextRun(evalContext, definition) {
                var evaluated, definitionValue = definition.value, evaluatedValue = evaluateValue(evalContext, definitionValue, textType);
                return void 0 !== evaluatedValue && (evaluated = _.clone(definition), evaluated.value = evaluatedValue), 
                evaluated || definition;
            }
            function evaluateArrayCopyOnChange(evalContext, definitions, evaluator) {
                for (var evaluatedValues, i = 0, len = definitions.length; len > i; i++) {
                    var definition = definitions[i], evaluated = evaluator(evalContext, definition);
                    evaluatedValues || definition === evaluated || (evaluatedValues = _.take(definitions, i)), 
                    evaluatedValues && evaluatedValues.push(evaluated);
                }
                return evaluatedValues || definitions;
            }
            function evaluateValue(evalContext, definition, valueType) {
                return definition instanceof data.SQExpr ? ExpressionEvaluator.evaluate(definition, evalContext) : definition instanceof data.RuleEvaluation ? definition.evaluate(evalContext) : void 0;
            }
            var colorValueType = powerbi.ValueType.fromDescriptor({
                formatting: {
                    color: !0
                }
            }), numericType = powerbi.ValueType.fromDescriptor({
                numeric: !0
            }), textType = powerbi.ValueType.fromDescriptor({
                text: !0
            });
            DataViewObjectEvaluator.run = run, DataViewObjectEvaluator.evaluateProperty = evaluateProperty;
            var ExpressionEvaluator = function(_super) {
                function ExpressionEvaluator() {
                    _super.apply(this, arguments);
                }
                return __extends(ExpressionEvaluator, _super), ExpressionEvaluator.evaluate = function(expr, evalContext) {
                    return null != expr ? expr.accept(ExpressionEvaluator.instance, evalContext) : void 0;
                }, ExpressionEvaluator.prototype.visitColumnRef = function(expr, evalContext) {
                    return evalContext.getExprValue(expr);
                }, ExpressionEvaluator.prototype.visitConstant = function(expr, evalContext) {
                    return expr.value;
                }, ExpressionEvaluator.prototype.visitMeasureRef = function(expr, evalContext) {
                    return evalContext.getExprValue(expr);
                }, ExpressionEvaluator.prototype.visitAggr = function(expr, evalContext) {
                    return evalContext.getExprValue(expr);
                }, ExpressionEvaluator.instance = new ExpressionEvaluator(), ExpressionEvaluator;
            }(data.DefaultSQExprVisitorWithArg);
        }(DataViewObjectEvaluator = data.DataViewObjectEvaluator || (data.DataViewObjectEvaluator = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var DataViewObjects;
    !function(DataViewObjects) {
        function getValue(objects, propertyId, defaultValue) {
            if (!objects) return defaultValue;
            var objectOrMap = objects[propertyId.objectName], object = objectOrMap;
            return DataViewObject.getValue(object, propertyId.propertyName, defaultValue);
        }
        function getObject(objects, objectName, defaultValue) {
            if (objects && objects[objectName]) {
                var object = objects[objectName];
                return object;
            }
            return defaultValue;
        }
        function getUserDefinedObjects(objects, objectName) {
            if (objects && objects[objectName]) {
                var map = objects[objectName];
                return map;
            }
        }
        function getFillColor(objects, propertyId, defaultColor) {
            var value = getValue(objects, propertyId);
            return value && value.solid ? value.solid.color : defaultColor;
        }
        function isUserDefined(objectOrMap) {
            return _.isArray(objectOrMap);
        }
        DataViewObjects.getValue = getValue, DataViewObjects.getObject = getObject, DataViewObjects.getUserDefinedObjects = getUserDefinedObjects, 
        DataViewObjects.getFillColor = getFillColor, DataViewObjects.isUserDefined = isUserDefined;
    }(DataViewObjects = powerbi.DataViewObjects || (powerbi.DataViewObjects = {}));
    var DataViewObject;
    !function(DataViewObject) {
        function getValue(object, propertyName, defaultValue) {
            if (!object) return defaultValue;
            var propertyValue = object[propertyName];
            return void 0 === propertyValue ? defaultValue : propertyValue;
        }
        function getFillColorByPropertyName(objects, propertyName, defaultColor) {
            var value = DataViewObject.getValue(objects, propertyName);
            return value && value.solid ? value.solid.color : defaultColor;
        }
        DataViewObject.getValue = getValue, DataViewObject.getFillColorByPropertyName = getFillColorByPropertyName;
    }(DataViewObject = powerbi.DataViewObject || (powerbi.DataViewObject = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var DataViewPivotCategorical, inherit = powerbi.Prototype.inherit;
        !function(DataViewPivotCategorical) {
            function apply(dataView) {
                var categorical = dataView.categorical;
                if (!categorical) return null;
                var categories = categorical.categories;
                if (!categories || 1 !== categories.length) return null;
                var values = categorical.values;
                if (_.isEmpty(values) || values.source) return null;
                for (var category = categories[0], categoryIdentities = category.identity, categoryValues = category.values, pivotedColumns = [], pivotedValues = [], rowIdx = 0, rowCount = categoryValues.length; rowCount > rowIdx; rowIdx++) for (var categoryValue = categoryValues[rowIdx], categoryIdentity = categoryIdentities[rowIdx], colIdx = 0, colCount = values.length; colCount > colIdx; colIdx++) {
                    var value = values[colIdx], pivotedColumn = inherit(value.source);
                    if (value.identity) return null;
                    pivotedColumn.groupName = categoryValue;
                    var pivotedValue = {
                        source: pivotedColumn,
                        values: [ value.values[rowIdx] ],
                        identity: categoryIdentity,
                        min: value.min,
                        max: value.max,
                        subtotal: value.subtotal
                    }, highlights = value.highlights;
                    highlights && (pivotedValue.highlights = [ highlights[rowIdx] ]), pivotedColumns.push(pivotedColumn), 
                    pivotedValues.push(pivotedValue);
                }
                var pivotedMetadata = inherit(dataView.metadata);
                return pivotedMetadata.columns = pivotedColumns, values = data.DataViewTransform.createValueColumns(pivotedValues, category.identityFields, category.source), 
                {
                    metadata: pivotedMetadata,
                    categorical: {
                        values: values
                    },
                    matrix: dataView.matrix
                };
            }
            DataViewPivotCategorical.apply = apply;
        }(DataViewPivotCategorical = data.DataViewPivotCategorical || (data.DataViewPivotCategorical = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var DataViewPivotMatrix;
        !function(DataViewPivotMatrix) {
            function apply(dataViewMatrix, context) {
                context.columnHierarchyRewritten || (dataViewMatrix.columns = powerbi.Prototype.inherit(dataViewMatrix.columns));
                var columns = dataViewMatrix.columns;
                context.rowHierarchyRewritten || (dataViewMatrix.rows = powerbi.Prototype.inherit(dataViewMatrix.rows));
                var rows = dataViewMatrix.rows;
                if (!(columns.levels.length > 1)) {
                    var pivotedRowNode = {
                        level: 0
                    }, columnLeafNodes = columns.root.children, columnCount = columnLeafNodes.length;
                    if (columnCount > 0) {
                        var index = 0, callback = function(node) {
                            if (node.values) {
                                pivotedRowNode.values || (pivotedRowNode.values = {});
                                for (var i = 0; columnCount > i; i++) pivotedRowNode.values[index++] = node.values[i];
                                delete node.values;
                            }
                            if (columnCount > 1) {
                                var level = node.level + 1;
                                node.children || (node.children = []);
                                for (var j = 0; columnCount > j; j++) {
                                    var measureHeaderLeaf = {
                                        level: level
                                    }, columnLeafNode = columnLeafNodes[j];
                                    measureHeaderLeaf.levelSourceIndex = columnLeafNode.levelSourceIndex, node.isSubtotal && (measureHeaderLeaf.isSubtotal = !0), 
                                    node.children.push(measureHeaderLeaf);
                                }
                            }
                        };
                        context.hierarchyTreesRewritten ? forEachLeaf(rows.root, callback) : dataViewMatrix.columns.root = cloneTreeExecuteOnLeaf(rows.root, callback);
                    } else context.hierarchyTreesRewritten || (dataViewMatrix.columns.root = cloneTree(rows.root));
                    if (columnCount > 1) {
                        var level = {
                            sources: columns.levels[0].sources
                        };
                        rows.levels.push(level), columns.levels.length = 0;
                    }
                    if (context.hierarchyTreesRewritten) dataViewMatrix.columns.root = rows.root, dataViewMatrix.rows.root = {
                        children: [ pivotedRowNode ]
                    }; else {
                        var updatedRowRoot = powerbi.Prototype.inherit(dataViewMatrix.rows.root);
                        updatedRowRoot.children = [ pivotedRowNode ], dataViewMatrix.rows.root = updatedRowRoot;
                    }
                    dataViewMatrix.columns.levels = rows.levels, dataViewMatrix.rows.levels = [];
                }
            }
            function forEachLeaf(root, callback) {
                var children = root.children;
                if (children && children.length > 0) for (var i = 0, ilen = children.length; ilen > i; i++) forEachLeaf(children[i], callback); else callback(root);
            }
            function cloneTree(node) {
                return cloneTreeExecuteOnLeaf(node);
            }
            function cloneTreeExecuteOnLeaf(node, callback) {
                var updatedNode = powerbi.Prototype.inherit(node), children = node.children;
                if (children && children.length > 0) {
                    for (var newChildren = [], i = 0, ilen = children.length; ilen > i; i++) {
                        var updatedChild = cloneTreeExecuteOnLeaf(children[i], callback);
                        newChildren.push(updatedChild);
                    }
                    updatedNode.children = newChildren;
                } else callback && callback(updatedNode);
                return updatedNode;
            }
            DataViewPivotMatrix.apply = apply, DataViewPivotMatrix.cloneTree = cloneTree, DataViewPivotMatrix.cloneTreeExecuteOnLeaf = cloneTreeExecuteOnLeaf;
        }(DataViewPivotMatrix = data.DataViewPivotMatrix || (data.DataViewPivotMatrix = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        function createNullValues(length) {
            for (var array = new Array(length), i = 0; length > i; i++) array[i] = null;
            return array;
        }
        function inheritArrayWithValue(nullValues, original, index) {
            var inherited = powerbi.Prototype.inherit(nullValues);
            return inherited[index] = original[index], inherited;
        }
        var DataViewSelfCrossJoin;
        !function(DataViewSelfCrossJoin) {
            function apply(dataView) {
                if (dataView.categorical) {
                    var dataViewCategorical = dataView.categorical;
                    if (dataViewCategorical.categories && 1 === dataViewCategorical.categories.length && (!dataViewCategorical.values || !dataViewCategorical.values.source)) return applyCategorical(dataView.metadata, dataViewCategorical);
                }
            }
            function applyCategorical(dataViewMetadata, dataViewCategorical) {
                var category = dataViewCategorical.categories[0], categoryValues = category.values, categoryLength = categoryValues.length;
                if (0 !== categoryLength) {
                    var valuesArray = dataViewCategorical.values ? dataViewCategorical.values.grouped()[0].values : [], transformedDataView = data.createCategoricalDataViewBuilder().withCategories(dataViewCategorical.categories).withGroupedValues(createGroupedValues(category, categoryValues, categoryLength, valuesArray)).build();
                    return dataViewMetadata = powerbi.Prototype.inherit(dataViewMetadata), dataViewMetadata.columns = transformedDataView.metadata.columns, 
                    {
                        metadata: dataViewMetadata,
                        categorical: transformedDataView.categorical
                    };
                }
            }
            function createGroupedValues(category, categoryValues, categoryLength, valuesArray) {
                for (var nullValuesArray = createNullValues(categoryLength), valuesArrayLen = valuesArray.length, seriesData = [], i = 0; categoryLength > i; i++) {
                    for (var seriesDataItem = [], j = 0; valuesArrayLen > j; j++) {
                        var originalValueColumn = valuesArray[j], originalHighlightValues = originalValueColumn.highlights, seriesDataItemCategory = {
                            values: inheritArrayWithValue(nullValuesArray, originalValueColumn.values, i)
                        };
                        originalHighlightValues && (seriesDataItemCategory.highlights = inheritArrayWithValue(nullValuesArray, originalHighlightValues, i)), 
                        seriesDataItem.push(seriesDataItemCategory);
                    }
                    seriesData.push(seriesDataItem);
                }
                return {
                    groupColumn: {
                        source: category.source,
                        identityFrom: {
                            fields: category.identityFields,
                            identities: category.identity
                        },
                        values: category.values
                    },
                    valueColumns: _.map(valuesArray, function(v) {
                        return {
                            source: v.source
                        };
                    }),
                    data: seriesData
                };
            }
            DataViewSelfCrossJoin.apply = apply;
        }(DataViewSelfCrossJoin = data.DataViewSelfCrossJoin || (data.DataViewSelfCrossJoin = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var DataViewPivotCategoricalToPrimaryGroups, ArrayExtensions = jsCommon.ArrayExtensions, DataShapeBindingDataReduction = powerbi.data.DataShapeBindingDataReduction;
        !function(DataViewPivotCategoricalToPrimaryGroups) {
            function pivotBinding(binding, allMappings, finalMapping, defaultDataVolume) {
                allMappings && 1 === allMappings.length && finalMapping.categorical && finalMapping.categorical.dataReductionAlgorithm && binding && canPivotCategorical(binding, finalMapping) && (binding.Primary.Groupings = [ binding.Secondary.Groupings[0], binding.Primary.Groupings[0] ], 
                binding.Secondary = void 0, binding.DataReduction = {
                    Primary: DataShapeBindingDataReduction.createFrom(finalMapping.categorical.dataReductionAlgorithm),
                    DataVolume: finalMapping.categorical.dataVolume || defaultDataVolume
                });
            }
            function isPivotableAxis(axis) {
                return axis && axis.Groupings && 1 === axis.Groupings.length && !_.isEmpty(axis.Groupings[0].Projections) && !axis.Groupings[0].Subtotal && _.isEmpty(axis.Groupings[0].SuppressedProjections);
            }
            function canPivotCategorical(binding, mapping) {
                return isPivotableAxis(binding.Primary) && isPivotableAxis(binding.Secondary) && 1 === binding.Secondary.Groupings[0].Projections.length ? binding.DataReduction && (binding.DataReduction.Primary || binding.DataReduction.Secondary) ? !1 : !0 : !1;
            }
            function unpivotResult(oldDataView, selects, dataViewMappings) {
                if (!inferUnpivotTransform(selects, dataViewMappings, oldDataView)) return oldDataView;
                var newDataView = {
                    metadata: {
                        columns: ArrayExtensions.copy(oldDataView.metadata.columns)
                    }
                };
                if (oldDataView.single && (newDataView.single = oldDataView.single), oldDataView.table && (newDataView.table = oldDataView.table), 
                oldDataView.matrix) {
                    var newDataViewMatrix = unpivotMatrix(oldDataView.matrix);
                    _.isEmpty(newDataViewMatrix.valueSources) || (newDataView.categorical = categoricalFromUnpivotedMatrix(newDataViewMatrix, newDataView.metadata.columns));
                }
                return newDataView;
            }
            function getRolesInRoleMapping(role, roleMapping) {
                roleMapping && (roleMapping.bind && role(roleMapping.bind.to), roleMapping["for"] && role(roleMapping["for"]["in"]), 
                roleMapping.group && (role(roleMapping.group.by), getRolesInRoleMappings(role, roleMapping.group.select)), 
                getRolesInRoleMappings(role, roleMapping.select));
            }
            function getRolesInRoleMappings(role, roleMappings) {
                if (!_.isEmpty(roleMappings)) for (var _i = 0; _i < roleMappings.length; _i++) {
                    var roleMapping = roleMappings[_i];
                    getRolesInRoleMapping(role, roleMapping);
                }
            }
            function inferUnpivotTransform(selects, dataViewMappings, dataView) {
                if (!selects || !dataViewMappings || !dataView) return !1;
                var roleKinds = data.DataViewSelectTransform.createRoleKindFromMetadata(selects, dataView.metadata), projections = data.DataViewSelectTransform.projectionsFromSelects(selects, null);
                if (dataViewMappings = powerbi.DataViewAnalysis.chooseDataViewMappings(projections, dataViewMappings, roleKinds).supportedMappings, 
                !dataViewMappings || 1 !== dataViewMappings.length) return !1;
                var categoricalMapping = dataViewMappings[0].categorical;
                if (!categoricalMapping) return !1;
                var matrixDataview = dataView.matrix;
                if (!matrixDataview) return !1;
                if (!matrixDataview.rows || !matrixDataview.rows.levels || 2 !== matrixDataview.rows.levels.length) return !1;
                var categoryGroups = [], valueGroups = [], addGroupingRole = function(roleName, groups) {
                    var roleProjections = projections[roleName];
                    if (roleProjections) for (var _i = 0, _a = roleProjections.all(); _i < _a.length; _i++) {
                        var roleProjection = _a[_i];
                        roleKinds[roleProjection.queryRef] === powerbi.VisualDataRoleKind.Grouping && groups.push(roleProjection.queryRef);
                    }
                };
                if (getRolesInRoleMapping(function(roleName) {
                    addGroupingRole(roleName, categoryGroups);
                }, categoricalMapping.categories), getRolesInRoleMapping(function(roleName) {
                    addGroupingRole(roleName, valueGroups);
                }, categoricalMapping.values), _.isEmpty(categoryGroups) || _.isEmpty(valueGroups)) return !1;
                for (var _i = 0, _a = matrixDataview.columns.levels; _i < _a.length; _i++) for (var level = _a[_i], _b = 0, _c = level.sources; _b < _c.length; _b++) {
                    var source = _c[_b];
                    if (!source.isMeasure) return !1;
                }
                return !0;
            }
            function unpivotMatrix(oldMatrix) {
                for (var oldRows = oldMatrix.rows, oldRoot = oldRows.root, oldChildren = oldRoot.children, series = [], seriesIdLevel = oldRows.levels[0], seriesIdFields = oldRoot.childIdentityFields, categories = [], categoryIdLevel = oldRows.levels[1], categoryIdFields = oldChildren[0].childIdentityFields, measureCount = oldMatrix.valueSources.length, findcat = function(identity) {
                    return _.findIndex(categories, function(pair) {
                        return powerbi.DataViewScopeIdentity.equals(pair.identity, identity);
                    });
                }, _i = 0; _i < oldChildren.length; _i++) {
                    var seriesNode = oldChildren[_i];
                    series.push({
                        value: seriesNode.value,
                        identity: seriesNode.identity
                    });
                    for (var _a = 0, _b = seriesNode.children; _a < _b.length; _a++) {
                        var categoryNode = _b[_a], catindex = findcat(categoryNode.identity);
                        -1 === catindex && categories.push({
                            value: categoryNode.value,
                            identity: categoryNode.identity
                        });
                    }
                }
                for (var matrixValues = new Array(categories.length), j = 0; j < series.length; ++j) for (var seriesNode = oldChildren[j], _c = 0, _d = seriesNode.children; _c < _d.length; _c++) {
                    var categoryNode = _d[_c], i = findcat(categoryNode.identity);
                    matrixValues[i] || (matrixValues[i] = new Array(series.length)), matrixValues[i][j] = categoryNode.values;
                }
                var newColumns = {
                    root: {
                        children: _.map(series, function(s) {
                            return {
                                level: 0,
                                value: s.value,
                                identity: s.identity
                            };
                        }),
                        childIdentityFields: seriesIdFields
                    },
                    levels: [ seriesIdLevel ]
                };
                if (measureCount > 0) {
                    for (var newColChildren = _.map(oldMatrix.columns.root.children, function(srcnode) {
                        var dstnode = {
                            level: 1
                        };
                        return srcnode.levelSourceIndex && (dstnode.levelSourceIndex = srcnode.levelSourceIndex), 
                        dstnode;
                    }), i = 0; i < newColumns.root.children.length; ++i) newColumns.root.children[i].children = newColChildren;
                    newColumns.levels.push(oldMatrix.columns.levels[0]);
                }
                var newRows = {
                    root: {
                        children: _.map(categories, function(s) {
                            return {
                                level: 0,
                                value: s.value,
                                identity: s.identity
                            };
                        }),
                        childIdentityFields: categoryIdFields
                    },
                    levels: [ categoryIdLevel ]
                };
                if (measureCount > 0) for (var i = 0; i < categories.length; ++i) {
                    for (var row = newRows.root.children[i], rowValues = {}, j = 0; j < series.length; ++j) for (var mvalues = matrixValues[i][j], k = 0; measureCount > k; ++k) {
                        var l = j * measureCount + k;
                        rowValues[l] = mvalues ? mvalues[k] : 0 === k ? {
                            value: null
                        } : {
                            value: null,
                            valueSourceIndex: k
                        };
                    }
                    row.values = rowValues;
                }
                var newMatrix = {
                    rows: newRows,
                    columns: newColumns,
                    valueSources: oldMatrix.valueSources
                };
                return newMatrix;
            }
            function categoricalFromUnpivotedMatrix(matrix, columnMetadata) {
                for (var seriesCount = matrix.columns.root.children.length, measureMetadata = matrix.valueSources, measureCount = measureMetadata.length, categories = [ {
                    source: matrix.rows.levels[0].sources[0],
                    values: _.map(matrix.rows.root.children, function(x) {
                        return x.value;
                    }),
                    identity: _.map(matrix.rows.root.children, function(x) {
                        return x.identity;
                    }),
                    identityFields: matrix.rows.root.childIdentityFields
                } ], groups = [], j = 0; seriesCount > j; ++j) {
                    var seriesColumn = matrix.columns.root.children[j], group = {
                        values: [],
                        identity: seriesColumn.identity,
                        name: seriesColumn.value || null
                    };
                    groups.push(group);
                    for (var k = 0; measureCount > k; ++k) {
                        var valueColumnMetadataSrc = measureMetadata[k], valueColumnMetadataDst = {};
                        for (var key in valueColumnMetadataSrc) valueColumnMetadataDst[key] = valueColumnMetadataSrc[key];
                        valueColumnMetadataDst.groupName = group.name, columnMetadata.push(valueColumnMetadataDst);
                        var valueColumn = {
                            source: valueColumnMetadataDst,
                            values: [],
                            identity: group.identity
                        };
                        group.values.push(valueColumn);
                        for (var index = k + j * measureCount, _i = 0, _a = matrix.rows.root.children; _i < _a.length; _i++) {
                            var categoryNode = _a[_i], value = categoryNode.values[index].value;
                            valueColumn.values.push(value);
                        }
                    }
                }
                for (var values = [], _b = 0; _b < groups.length; _b++) for (var group = groups[_b], k = 0; measureCount > k; ++k) values.push(group.values[k]);
                values.grouped = function() {
                    return groups;
                }, values.identityFields = matrix.columns.root.childIdentityFields, values.source = matrix.columns.levels[0].sources[0];
                var categorical = {
                    categories: categories,
                    values: values
                };
                return categorical;
            }
            DataViewPivotCategoricalToPrimaryGroups.pivotBinding = pivotBinding, DataViewPivotCategoricalToPrimaryGroups.unpivotResult = unpivotResult;
        }(DataViewPivotCategoricalToPrimaryGroups = data.DataViewPivotCategoricalToPrimaryGroups || (data.DataViewPivotCategoricalToPrimaryGroups = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var DataViewTransform, inherit = powerbi.Prototype.inherit, inheritSingle = powerbi.Prototype.inheritSingle, ArrayExtensions = jsCommon.ArrayExtensions, EnumExtensions = jsCommon.EnumExtensions;
        !function(DataViewTransform) {
            function apply(options) {
                var prototype = options.prototype, objectDescriptors = options.objectDescriptors, dataViewMappings = options.dataViewMappings, transforms = options.transforms, colorAllocatorFactory = options.colorAllocatorFactory, dataRoles = options.dataRoles;
                if (!prototype) return transformEmptyDataView(objectDescriptors, transforms, colorAllocatorFactory);
                if (!transforms) return [ prototype ];
                prototype = data.DataViewPivotCategoricalToPrimaryGroups.unpivotResult(prototype, transforms.selects, dataViewMappings);
                var transformedDataViews = transformQueryToVisualDataView(prototype, transforms, objectDescriptors, dataViewMappings, colorAllocatorFactory, dataRoles);
                return transformedDataViews = data.DataViewRegression.run({
                    dataViewMappings: dataViewMappings,
                    transformedDataViews: transformedDataViews,
                    dataRoles: dataRoles,
                    objectDescriptors: objectDescriptors,
                    objectDefinitions: transforms.objects,
                    colorAllocatorFactory: colorAllocatorFactory,
                    transformSelects: transforms.selects,
                    dataView: prototype
                });
            }
            function transformQueryToVisualDataView(prototype, transforms, objectDescriptors, dataViewMappings, colorAllocatorFactory, dataRoles) {
                var transformedDataViews = [], splits = transforms.splits;
                if (_.isEmpty(splits)) transformedDataViews.push(transformDataView(prototype, objectDescriptors, dataViewMappings, transforms, colorAllocatorFactory, dataRoles)); else for (var _i = 0; _i < splits.length; _i++) {
                    var split = splits[_i], transformed = transformDataView(prototype, objectDescriptors, dataViewMappings, transforms, colorAllocatorFactory, dataRoles, split.selects);
                    transformedDataViews.push(transformed);
                }
                return transformedDataViews;
            }
            function transformEmptyDataView(objectDescriptors, transforms, colorAllocatorFactory) {
                if (transforms && transforms.objects) {
                    var emptyDataView = {
                        metadata: {
                            columns: []
                        }
                    };
                    return transformObjects(emptyDataView, 0, objectDescriptors, transforms.objects, transforms.selects, colorAllocatorFactory), 
                    [ emptyDataView ];
                }
                return [];
            }
            function transformDataView(prototype, objectDescriptors, roleMappings, transforms, colorAllocatorFactory, dataRoles, selectsToInclude) {
                var targetKinds = getTargetKinds(roleMappings), transformed = inherit(prototype);
                transformed.metadata = inherit(prototype.metadata);
                var projectionOrdering = transforms.roles && transforms.roles.ordering, projectionActiveItems = transforms.roles && transforms.roles.activeItems;
                return transformed = transformSelects(transformed, roleMappings, transforms.selects, projectionOrdering, selectsToInclude), 
                transformObjects(transformed, targetKinds, objectDescriptors, transforms.objects, transforms.selects, colorAllocatorFactory), 
                transformed = data.DataViewConcatenateCategoricalColumns.detectAndApply(transformed, roleMappings, projectionOrdering, transforms.selects, projectionActiveItems), 
                data.DataViewNormalizeValues.apply({
                    dataview: transformed,
                    dataViewMappings: roleMappings,
                    dataRoles: dataRoles
                }), transformed;
            }
            function getTargetKinds(roleMappings) {
                if (!roleMappings) return 0;
                for (var result = 0, _i = 0; _i < roleMappings.length; _i++) {
                    var roleMapping = roleMappings[_i];
                    roleMapping.categorical && (result |= 1), roleMapping.matrix && (result |= 2), roleMapping.single && (result |= 4), 
                    roleMapping.table && (result |= 8), roleMapping.tree && (result |= 16);
                }
                return result;
            }
            function transformSelects(dataView, roleMappings, selectTransforms, projectionOrdering, selectsToInclude) {
                var columnRewrites = [];
                if (selectTransforms && (dataView.metadata.columns = applyTransformsToColumns(dataView.metadata.columns, selectTransforms, columnRewrites)), 
                dataView.categorical && (dataView.categorical = applyRewritesToCategorical(dataView.categorical, columnRewrites, selectsToInclude), 
                dataView = pivotIfNecessary(dataView, roleMappings)), dataView.matrix) {
                    var matrixTransformationContext = {
                        rowHierarchyRewritten: !1,
                        columnHierarchyRewritten: !1,
                        hierarchyTreesRewritten: !1
                    };
                    dataView.matrix = applyRewritesToMatrix(dataView.matrix, columnRewrites, roleMappings, projectionOrdering, matrixTransformationContext), 
                    shouldPivotMatrix(dataView.matrix, roleMappings) && data.DataViewPivotMatrix.apply(dataView.matrix, matrixTransformationContext);
                }
                return dataView.table && (dataView.table = applyRewritesToTable(dataView.table, columnRewrites, roleMappings, projectionOrdering)), 
                dataView;
            }
            function applyTransformsToColumns(prototypeColumns, selects, rewrites) {
                if (!selects) return prototypeColumns;
                for (var columns = inherit(prototypeColumns), i = 0, len = prototypeColumns.length; len > i; i++) {
                    var prototypeColumn = prototypeColumns[i], select = selects[prototypeColumn.index];
                    if (select) {
                        var column = columns[i] = inherit(prototypeColumn);
                        select.roles && (column.roles = select.roles), select.type && (column.type = select.type), 
                        column.format = getFormatForColumn(select, column), select.displayName && (column.displayName = select.displayName), 
                        select.queryName && (column.queryName = select.queryName), select.kpi && (column.kpi = select.kpi), 
                        select.sort && (column.sort = select.sort), select.discourageAggregationAcrossGroups && (column.discourageAggregationAcrossGroups = select.discourageAggregationAcrossGroups), 
                        rewrites.push({
                            from: prototypeColumn,
                            to: column
                        });
                    }
                }
                return columns;
            }
            function getFormatForColumn(select, column) {
                return select.format || column.format;
            }
            function applyRewritesToCategorical(prototype, columnRewrites, selectsToInclude) {
                function override(value) {
                    var rewrittenSource = findOverride(value.source, columnRewrites);
                    if (rewrittenSource) {
                        var rewritten = inherit(value);
                        return rewritten.source = rewrittenSource, rewritten;
                    }
                }
                var categorical = inherit(prototype), categories = powerbi.Prototype.overrideArray(prototype.categories, override);
                categories && (categorical.categories = categories);
                var values = powerbi.Prototype.overrideArray(prototype.values, override);
                if (values) {
                    if (selectsToInclude) for (var i = values.length - 1; i >= 0; i--) selectsToInclude[values[i].source.index] || values.splice(i, 1);
                    if (values.source) if (selectsToInclude && !selectsToInclude[values.source.index]) values.source = void 0; else {
                        var rewrittenValuesSource = findOverride(values.source, columnRewrites);
                        rewrittenValuesSource && (values.source = rewrittenValuesSource);
                    }
                    categorical.values = values, setGrouped(values);
                }
                return categorical;
            }
            function applyRewritesToTable(prototype, columnRewrites, roleMappings, projectionOrdering) {
                if (!roleMappings || 1 !== roleMappings.length || !roleMappings[0].table) return prototype;
                var table = inherit(prototype), override = function(metadata) {
                    return findOverride(metadata, columnRewrites);
                }, columns = powerbi.Prototype.overrideArray(prototype.columns, override);
                if (columns && (table.columns = columns), !projectionOrdering) return table;
                var newToOldPositions = createTableColumnPositionMapping(projectionOrdering, columnRewrites);
                if (!newToOldPositions) return table;
                for (var columnsClone = columns.slice(0), keys = Object.keys(newToOldPositions), i = 0, len = keys.length; len > i; i++) {
                    var sourceColumn = columnsClone[newToOldPositions[keys[i]]];
                    i === columns.length ? columns.push(sourceColumn) : columns[i] = sourceColumn;
                }
                var rows = powerbi.Prototype.overrideArray(table.rows, function(row) {
                    for (var newRow = [], i = 0, len = keys.length; len > i; ++i) newRow[i] = row[newToOldPositions[keys[i]]];
                    return newRow;
                });
                return rows && (table.rows = rows), table;
            }
            function createTableColumnPositionMapping(projectionOrdering, columnRewrites) {
                var roles = Object.keys(projectionOrdering);
                if (1 === roles.length) {
                    var role = roles[0], originalOrder = _.map(columnRewrites, function(rewrite) {
                        return rewrite.from.index;
                    }), newOrder = projectionOrdering[role];
                    if (!ArrayExtensions.sequenceEqual(originalOrder, newOrder, function(x, y) {
                        return x === y;
                    })) return createOrderMapping(originalOrder, newOrder);
                }
            }
            function applyRewritesToMatrix(prototype, columnRewrites, roleMappings, projectionOrdering, context) {
                function override(metadata) {
                    return findOverride(metadata, columnRewrites);
                }
                function overrideHierarchy(hierarchy) {
                    var rewrittenHierarchy = null, newLevels = powerbi.Prototype.overrideArray(hierarchy.levels, function(level) {
                        var newLevel = null, levelSources = powerbi.Prototype.overrideArray(level.sources, override);
                        return levelSources && (newLevel = ensureRewritten(newLevel, level, function(h) {
                            return h.sources = levelSources;
                        })), newLevel;
                    });
                    return newLevels && (rewrittenHierarchy = ensureRewritten(rewrittenHierarchy, hierarchy, function(r) {
                        return r.levels = newLevels;
                    })), rewrittenHierarchy;
                }
                if (!roleMappings || roleMappings.length < 1 || !(roleMappings[0].matrix || roleMappings[1] && roleMappings[1].matrix)) return prototype;
                var matrixMapping = roleMappings[0].matrix || roleMappings[1].matrix, matrix = inherit(prototype), rows = overrideHierarchy(matrix.rows);
                rows && (matrix.rows = rows, context.rowHierarchyRewritten = !0);
                var columns = overrideHierarchy(matrix.columns);
                columns && (matrix.columns = columns, context.columnHierarchyRewritten = !0);
                var valueSources = powerbi.Prototype.overrideArray(matrix.valueSources, override);
                if (valueSources) {
                    matrix.valueSources = valueSources;
                    var matrixValues = matrixMapping.values;
                    if (projectionOrdering && valueSources.length > 1 && matrixValues && matrixValues["for"]) {
                        var columnLevels = columns.levels.length;
                        if (columnLevels > 0) {
                            var newToOldPositions = createMatrixValuesPositionMapping(matrixValues, projectionOrdering, valueSources, columnRewrites);
                            if (newToOldPositions) {
                                var keys = Object.keys(newToOldPositions), numKeys = keys.length;
                                columns.root = data.DataViewPivotMatrix.cloneTree(columns.root), 1 === columnLevels ? reorderChildNodes(columns.root, newToOldPositions) : forEachNodeAtLevel(columns.root, columnLevels - 2, function(node) {
                                    return reorderChildNodes(node, newToOldPositions);
                                }), matrix.rows.root = data.DataViewPivotMatrix.cloneTreeExecuteOnLeaf(matrix.rows.root, function(node) {
                                    if (node.values) {
                                        for (var newValues = {}, iterations = Object.keys(node.values).length / numKeys, i = 0, len = iterations; len > i; i++) for (var offset = i * numKeys, keysIndex = 0; numKeys > keysIndex; keysIndex++) newValues[offset + keysIndex] = node.values[offset + newToOldPositions[keys[keysIndex]]];
                                        node.values = newValues;
                                    }
                                }), context.hierarchyTreesRewritten = !0;
                            }
                        }
                    }
                }
                return matrix;
            }
            function reorderChildNodes(node, newToOldPositions) {
                for (var keys = Object.keys(newToOldPositions), numKeys = keys.length, children = node.children, childrenClone = children.slice(0), i = 0, len = numKeys; len > i; i++) {
                    var sourceColumn = childrenClone[newToOldPositions[keys[i]]];
                    i === children.length ? children.push(sourceColumn) : children[i] = sourceColumn;
                }
            }
            function createMatrixValuesPositionMapping(matrixValues, projectionOrdering, valueSources, columnRewrites) {
                function matchValueSource(columnRewrite) {
                    for (var i = 0, len = valueSources.length; len > i; i++) {
                        var valueSource = valueSources[i];
                        if (valueSource === columnRewrite.to) return columnRewrite;
                    }
                }
                for (var role = matrixValues["for"]["in"], valueRewrites = [], i = 0, len = columnRewrites.length; len > i; i++) {
                    var columnRewrite = columnRewrites[i];
                    matchValueSource(columnRewrite) && valueRewrites.push(columnRewrite);
                }
                var newOrder = projectionOrdering[role], originalOrder = _.map(valueRewrites, function(rewrite) {
                    return rewrite.from.index;
                });
                return ArrayExtensions.sequenceEqual(originalOrder, newOrder, function(x, y) {
                    return x === y;
                }) ? void 0 : createOrderMapping(originalOrder, newOrder);
            }
            function createOrderMapping(originalOrder, newOrder) {
                for (var mapping = {}, i = 0, len = newOrder.length; len > i; ++i) {
                    var newPosition = newOrder[i];
                    mapping[i] = originalOrder.indexOf(newPosition);
                }
                return mapping;
            }
            function forEachNodeAtLevel(node, targetLevel, callback) {
                if (node.level === targetLevel) return void callback(node);
                var children = node.children;
                if (children && children.length > 0) for (var i = 0, ilen = children.length; ilen > i; i++) forEachNodeAtLevel(children[i], targetLevel, callback);
            }
            function findOverride(source, columnRewrites) {
                for (var i = 0, len = columnRewrites.length; len > i; i++) {
                    var columnRewrite = columnRewrites[i];
                    if (columnRewrite.from === source) return columnRewrite.to;
                }
            }
            function ensureRewritten(rewritten, prototype, callback) {
                return rewritten || (rewritten = inherit(prototype)), callback && callback(rewritten), 
                rewritten;
            }
            function transformObjects(dataView, targetDataViewKinds, objectDescriptors, objectDefinitions, selectTransforms, colorAllocatorFactory) {
                if (objectDescriptors) {
                    var objectsForAllSelectors = data.DataViewObjectEvaluationUtils.groupObjectsBySelector(objectDefinitions);
                    data.DataViewObjectEvaluationUtils.addImplicitObjects(objectsForAllSelectors, objectDescriptors, dataView.metadata.columns, selectTransforms);
                    var metadataOnce = objectsForAllSelectors.metadataOnce, dataObjects = objectsForAllSelectors.data;
                    metadataOnce && evaluateMetadataObjects(dataView, selectTransforms, objectDescriptors, metadataOnce.objects, dataObjects, colorAllocatorFactory);
                    var metadataObjects = objectsForAllSelectors.metadata;
                    if (metadataObjects) for (var i = 0, len = metadataObjects.length; len > i; i++) {
                        var metadataObject = metadataObjects[i];
                        evaluateMetadataRepetition(dataView, selectTransforms, objectDescriptors, metadataObject.selector, metadataObject.objects);
                    }
                    for (var i = 0, len = dataObjects.length; len > i; i++) {
                        var dataObject = dataObjects[i];
                        evaluateDataRepetition(dataView, targetDataViewKinds, selectTransforms, objectDescriptors, dataObject.selector, dataObject.rules, dataObject.objects);
                    }
                    var userDefined = objectsForAllSelectors.userDefined;
                    userDefined && evaluateUserDefinedObjects(dataView, selectTransforms, objectDescriptors, userDefined);
                }
            }
            function evaluateUserDefinedObjects(dataView, selectTransforms, objectDescriptors, objectDefns) {
                var dataViewObjects = dataView.metadata.objects;
                dataViewObjects || (dataViewObjects = dataView.metadata.objects = {});
                for (var evalContext = data.createStaticEvalContext(dataView, selectTransforms), _i = 0; _i < objectDefns.length; _i++) {
                    var objectDefn = objectDefns[_i], id = objectDefn.selector.id, objects = data.DataViewObjectEvaluationUtils.evaluateDataViewObjects(evalContext, objectDescriptors, objectDefn.objects);
                    for (var objectName in objects) {
                        var object = objects[objectName], map = dataViewObjects[objectName];
                        map || (map = dataViewObjects[objectName] = []), map.push({
                            id: id,
                            object: object
                        });
                    }
                }
            }
            function evaluateMetadataObjects(dataView, selectTransforms, objectDescriptors, objectDefns, dataObjects, colorAllocatorFactory) {
                var evalContext = data.createStaticEvalContext(dataView, selectTransforms), objects = data.DataViewObjectEvaluationUtils.evaluateDataViewObjects(evalContext, objectDescriptors, objectDefns);
                if (objects) {
                    dataView.metadata.objects = objects;
                    for (var objectName in objects) {
                        var object = objects[objectName], objectDesc = objectDescriptors[objectName];
                        for (var propertyName in object) {
                            var propertyDesc = objectDesc.properties[propertyName], ruleDesc = propertyDesc.rule;
                            if (ruleDesc) {
                                var definition = createRuleEvaluationInstance(dataView, colorAllocatorFactory, ruleDesc, objectName, object[propertyName], propertyDesc.type);
                                definition && dataObjects.push(definition);
                            }
                        }
                    }
                }
            }
            function createRuleEvaluationInstance(dataView, colorAllocatorFactory, ruleDesc, objectName, propertyValue, ruleType) {
                var ruleOutput = ruleDesc.output;
                if (ruleOutput) {
                    var selectorToCreate = findSelectorForRuleInput(dataView, ruleOutput.selector);
                    if (selectorToCreate) return ruleType.fillRule ? createRuleEvaluationInstanceFillRule(dataView, colorAllocatorFactory, ruleDesc, selectorToCreate, objectName, propertyValue) : void 0;
                }
            }
            function createRuleEvaluationInstanceFillRule(dataView, colorAllocatorFactory, ruleDesc, selectorToCreate, objectName, propertyValue) {
                var colorAllocator;
                if (propertyValue.linearGradient2 ? colorAllocator = createColorAllocatorLinearGradient2(dataView, colorAllocatorFactory, ruleDesc, propertyValue, propertyValue.linearGradient2) : propertyValue.linearGradient3 && (colorAllocator = createColorAllocatorLinearGradient3(dataView, colorAllocatorFactory, ruleDesc, propertyValue, propertyValue.linearGradient3)), 
                colorAllocator) {
                    var rule = new data.ColorRuleEvaluation(ruleDesc.inputRole, colorAllocator), fillRuleProperties = {};
                    return fillRuleProperties[ruleDesc.output.property] = {
                        solid: {
                            color: rule
                        }
                    }, {
                        selector: selectorToCreate,
                        rules: [ rule ],
                        objects: [ {
                            name: objectName,
                            properties: fillRuleProperties
                        } ]
                    };
                }
            }
            function createColorAllocatorLinearGradient2(dataView, colorAllocatorFactory, ruleDesc, propertyValueFillRule, linearGradient2) {
                if (linearGradient2 = propertyValueFillRule.linearGradient2, void 0 === linearGradient2.min.value || void 0 === linearGradient2.max.value) {
                    var inputRange = findRuleInputColumnNumberRange(dataView, ruleDesc.inputRole);
                    if (!inputRange) return;
                    void 0 === linearGradient2.min.value && (linearGradient2.min.value = inputRange.min), 
                    void 0 === linearGradient2.max.value && (linearGradient2.max.value = inputRange.max);
                }
                return colorAllocatorFactory.linearGradient2(propertyValueFillRule.linearGradient2);
            }
            function createColorAllocatorLinearGradient3(dataView, colorAllocatorFactory, ruleDesc, propertyValueFillRule, linearGradient3) {
                var splitScales = void 0;
                if (linearGradient3 = propertyValueFillRule.linearGradient3, void 0 === linearGradient3.min.value || void 0 === linearGradient3.mid.value || void 0 === linearGradient3.max.value) {
                    var inputRange = findRuleInputColumnNumberRange(dataView, ruleDesc.inputRole);
                    if (!inputRange) return;
                    if (splitScales = void 0 === linearGradient3.min.value && void 0 === linearGradient3.max.value && void 0 !== linearGradient3.mid.value, 
                    void 0 === linearGradient3.min.value && (linearGradient3.min.value = inputRange.min), 
                    void 0 === linearGradient3.max.value && (linearGradient3.max.value = inputRange.max), 
                    void 0 === linearGradient3.mid.value) {
                        var midValue = (linearGradient3.max.value + linearGradient3.min.value) / 2;
                        linearGradient3.mid.value = midValue;
                    }
                }
                return colorAllocatorFactory.linearGradient3(propertyValueFillRule.linearGradient3, splitScales);
            }
            function evaluateDataRepetition(dataView, targetDataViewKinds, selectTransforms, objectDescriptors, selector, rules, objectDefns) {
                var containsWildcard = data.Selector.containsWildcard(selector), dataViewCategorical = dataView.categorical;
                dataViewCategorical && EnumExtensions.hasFlag(targetDataViewKinds, 1) && (evaluateDataRepetitionCategoricalCategory(dataViewCategorical, objectDescriptors, selector, rules, containsWildcard, objectDefns), 
                evaluateDataRepetitionCategoricalValueGrouping(dataViewCategorical, objectDescriptors, selector, rules, containsWildcard, objectDefns));
                var dataViewMatrix = dataView.matrix;
                if (dataViewMatrix && EnumExtensions.hasFlag(targetDataViewKinds, 2)) {
                    var rewrittenMatrix = evaluateDataRepetitionMatrix(dataViewMatrix, objectDescriptors, selector, rules, containsWildcard, objectDefns);
                    rewrittenMatrix && (dataView.matrix = rewrittenMatrix);
                }
                var dataViewTable = dataView.table;
                if (dataViewTable && EnumExtensions.hasFlag(targetDataViewKinds, 8)) {
                    var rewrittenTable = evaluateDataRepetitionTable(dataViewTable, selectTransforms, objectDescriptors, selector, rules, containsWildcard, objectDefns);
                    rewrittenTable && (dataView.table = rewrittenTable);
                }
            }
            function evaluateDataRepetitionCategoricalCategory(dataViewCategorical, objectDescriptors, selector, rules, containsWildcard, objectDefns) {
                if (dataViewCategorical.categories && 0 !== dataViewCategorical.categories.length) {
                    var targetColumn = findSelectedCategoricalColumn(dataViewCategorical, selector);
                    if (targetColumn) {
                        var foundMatch, identities = targetColumn.identities, evalContext = data.createCategoricalEvalContext(dataViewCategorical);
                        if (identities) {
                            for (var i = 0, len = identities.length; len > i; i++) {
                                var identity = identities[i];
                                if (containsWildcard || data.Selector.matchesData(selector, [ identity ])) {
                                    evalContext.setCurrentRowIndex(i);
                                    var objects = data.DataViewObjectEvaluationUtils.evaluateDataViewObjects(evalContext, objectDescriptors, objectDefns);
                                    if (objects && (targetColumn.column.objects || (targetColumn.column.objects = [], 
                                    targetColumn.column.objects.length = len), targetColumn.column.objects[i] = objects), 
                                    !containsWildcard) return !0;
                                    foundMatch = !0;
                                }
                            }
                            return foundMatch;
                        }
                    }
                }
            }
            function evaluateDataRepetitionCategoricalValueGrouping(dataViewCategorical, objectDescriptors, selector, rules, containsWildcard, objectDefns) {
                var dataViewCategoricalValues = dataViewCategorical.values;
                if (dataViewCategoricalValues && dataViewCategoricalValues.identityFields && data.Selector.matchesKeys(selector, [ dataViewCategoricalValues.identityFields ])) {
                    var valuesGrouped = dataViewCategoricalValues.grouped();
                    if (valuesGrouped) {
                        for (var foundMatch, evalContext = data.createCategoricalEvalContext(dataViewCategorical), i = 0, len = valuesGrouped.length; len > i; i++) {
                            var valueGroup = valuesGrouped[i], selectorMetadata = selector.metadata, valuesInGroup = valueGroup.values;
                            if (containsWildcard || data.Selector.matchesData(selector, [ valueGroup.identity ])) {
                                var objects = data.DataViewObjectEvaluationUtils.evaluateDataViewObjects(evalContext, objectDescriptors, objectDefns);
                                if (objects) if (selectorMetadata) for (var j = 0, jlen = valuesInGroup.length; jlen > j; j++) {
                                    var valueColumn = valuesInGroup[j], valueSource = valueColumn.source;
                                    if (valueSource.queryName === selectorMetadata) {
                                        var valueSourceOverwrite = powerbi.Prototype.inherit(valueSource);
                                        valueSourceOverwrite.objects = objects, valueColumn.source = valueSourceOverwrite, 
                                        foundMatch = !0;
                                        break;
                                    }
                                } else valueGroup.objects = objects, setGrouped(dataViewCategoricalValues, valuesGrouped), 
                                foundMatch = !0;
                                if (!containsWildcard) return !0;
                            }
                        }
                        return foundMatch;
                    }
                }
            }
            function evaluateDataRepetitionMatrix(dataViewMatrix, objectDescriptors, selector, rules, containsWildcard, objectDefns) {
                var evalContext = data.createMatrixEvalContext(dataViewMatrix), rewrittenRows = evaluateDataRepetitionMatrixHierarchy(evalContext, dataViewMatrix.rows, objectDescriptors, selector, rules, containsWildcard, objectDefns), rewrittenCols = evaluateDataRepetitionMatrixHierarchy(evalContext, dataViewMatrix.columns, objectDescriptors, selector, rules, containsWildcard, objectDefns);
                if (rewrittenRows || rewrittenCols) {
                    var rewrittenMatrix = inheritSingle(dataViewMatrix);
                    return rewrittenRows && (rewrittenMatrix.rows = rewrittenRows), rewrittenCols && (rewrittenMatrix.columns = rewrittenCols), 
                    rewrittenMatrix;
                }
            }
            function evaluateDataRepetitionMatrixHierarchy(evalContext, dataViewMatrixHierarchy, objectDescriptors, selector, rules, containsWildcard, objectDefns) {
                if (dataViewMatrixHierarchy) {
                    var root = dataViewMatrixHierarchy.root;
                    if (root) {
                        var rewrittenRoot = evaluateDataRepetitionMatrixNode(evalContext, root, objectDescriptors, selector, rules, containsWildcard, objectDefns);
                        if (rewrittenRoot) {
                            var rewrittenHierarchy = inheritSingle(dataViewMatrixHierarchy);
                            return rewrittenHierarchy.root = rewrittenRoot, rewrittenHierarchy;
                        }
                    }
                }
            }
            function evaluateDataRepetitionMatrixNode(evalContext, dataViewNode, objectDescriptors, selector, rules, containsWildcard, objectDefns) {
                var childNodes = dataViewNode.children;
                if (childNodes) {
                    var rewrittenNode, shouldSearchChildren, childIdentityFields = dataViewNode.childIdentityFields;
                    childIdentityFields && (shouldSearchChildren = data.Selector.matchesKeys(selector, [ childIdentityFields ]));
                    for (var i = 0, len = childNodes.length; len > i; i++) {
                        var childNode = childNodes[i], identity = childNode.identity, rewrittenChildNode = null;
                        if (shouldSearchChildren) {
                            if (containsWildcard || data.Selector.matchesData(selector, [ identity ])) {
                                var objects = data.DataViewObjectEvaluationUtils.evaluateDataViewObjects(evalContext, objectDescriptors, objectDefns);
                                objects && (rewrittenChildNode = inheritSingle(childNode), rewrittenChildNode.objects = objects);
                            }
                        } else rewrittenChildNode = evaluateDataRepetitionMatrixNode(evalContext, childNode, objectDescriptors, selector, rules, containsWildcard, objectDefns);
                        if (rewrittenChildNode && (rewrittenNode || (rewrittenNode = inheritNodeAndChildren(dataViewNode)), 
                        rewrittenNode.children[i] = rewrittenChildNode, !containsWildcard)) break;
                    }
                    return rewrittenNode;
                }
            }
            function inheritNodeAndChildren(node) {
                if (Object.getPrototypeOf(node) !== Object.prototype) return node;
                var inherited = inheritSingle(node);
                return inherited.children = inherit(node.children), inherited;
            }
            function evaluateDataRepetitionTable(dataViewTable, selectTransforms, objectDescriptors, selector, rules, containsWildcard, objectDefns) {
                var evalContext = data.createTableEvalContext(dataViewTable, selectTransforms), rewrittenRows = evaluateDataRepetitionTableRows(evalContext, dataViewTable.columns, dataViewTable.rows, dataViewTable.identity, dataViewTable.identityFields, objectDescriptors, selector, rules, containsWildcard, objectDefns);
                if (rewrittenRows) {
                    var rewrittenTable = inheritSingle(dataViewTable);
                    return rewrittenTable.rows = rewrittenRows, rewrittenTable;
                }
            }
            function evaluateDataRepetitionTableRows(evalContext, columns, rows, identities, identityFields, objectDescriptors, selector, rules, containsWildcard, objectDefns) {
                if (!_.isEmpty(identities) && !_.isEmpty(identityFields) && (selector.metadata || data.Selector.matchesKeys(selector, [ identityFields ]))) {
                    var colIdx = _.findIndex(columns, function(col) {
                        return col.queryName === selector.metadata;
                    });
                    if (!(0 > colIdx)) {
                        for (var inheritedRows, colLen = columns.length, rowIdx = 0, rowLen = identities.length; rowLen > rowIdx; rowIdx++) {
                            var identity = identities[rowIdx];
                            if (containsWildcard || data.Selector.matchesData(selector, [ identity ])) {
                                evalContext.setCurrentRowIndex(rowIdx);
                                var objects = data.DataViewObjectEvaluationUtils.evaluateDataViewObjects(evalContext, objectDescriptors, objectDefns);
                                if (objects) {
                                    inheritedRows || (inheritedRows = inheritSingle(rows));
                                    var inheritedRow = inheritedRows[rowIdx] = inheritSingle(inheritedRows[rowIdx]), objectsForColumns = inheritedRow.objects;
                                    objectsForColumns || (inheritedRow.objects = objectsForColumns = new Array(colLen)), 
                                    objectsForColumns[colIdx] = objects;
                                }
                                if (!containsWildcard) break;
                            }
                        }
                        return inheritedRows;
                    }
                }
            }
            function evaluateMetadataRepetition(dataView, selectTransforms, objectDescriptors, selector, objectDefns) {
                for (var columns = dataView.metadata.columns, metadataId = selector.metadata, evalContext = data.createStaticEvalContext(dataView, selectTransforms), i = 0, len = columns.length; len > i; i++) {
                    var column = columns[i];
                    if (column.queryName === metadataId) {
                        var objects = data.DataViewObjectEvaluationUtils.evaluateDataViewObjects(evalContext, objectDescriptors, objectDefns);
                        objects && (column.objects = objects);
                    }
                }
            }
            function findSelectedCategoricalColumn(dataViewCategorical, selector) {
                var categoricalColumn = dataViewCategorical.categories[0];
                if (categoricalColumn.identityFields && data.Selector.matchesKeys(selector, [ categoricalColumn.identityFields ])) {
                    var identities = categoricalColumn.identity, targetColumn = categoricalColumn, selectedMetadataId = selector.metadata;
                    if (selectedMetadataId) {
                        var valueColumns = dataViewCategorical.values;
                        if (valueColumns) for (var i = 0, len = valueColumns.length; len > i; i++) {
                            var valueColumn = valueColumns[i];
                            if (valueColumn.source.queryName === selectedMetadataId) {
                                targetColumn = valueColumn;
                                break;
                            }
                        }
                    }
                    return {
                        column: targetColumn,
                        identities: identities
                    };
                }
            }
            function findSelectorForRuleInput(dataView, selectorRoles) {
                if (1 === selectorRoles.length) {
                    var dataViewCategorical = dataView.categorical;
                    if (dataViewCategorical) {
                        var categories = dataViewCategorical.categories;
                        if (categories && 1 === categories.length) {
                            var categoryColumn = categories[0], categoryRoles = categoryColumn.source.roles, categoryIdentityFields = categoryColumn.identityFields;
                            if (categoryRoles && categoryIdentityFields && categoryRoles[selectorRoles[0]]) return {
                                data: [ data.DataViewScopeWildcard.fromExprs(categoryIdentityFields) ]
                            };
                        }
                    }
                }
            }
            function findRuleInputColumnNumberRange(dataView, inputRole) {
                var dataViewCategorical = dataView.categorical;
                if (dataViewCategorical) {
                    var values = dataViewCategorical.values;
                    if (values) for (var i = 0, len = values.length; len > i; i++) {
                        var valueCol = values[i], valueColRoles = valueCol.source.roles;
                        if (valueColRoles && valueColRoles[inputRole]) {
                            var min = valueCol.min;
                            if (void 0 === min && (min = valueCol.minLocal), void 0 !== min) {
                                var max = valueCol.max;
                                if (void 0 === max && (max = valueCol.maxLocal), void 0 !== max) return {
                                    min: min,
                                    max: max
                                };
                            }
                        }
                    }
                }
            }
            function createValueColumns(values, valueIdentityFields, source) {
                void 0 === values && (values = []);
                var result = values;
                return setGrouped(values), valueIdentityFields && (result.identityFields = valueIdentityFields), 
                source && (result.source = source), result;
            }
            function setGrouped(values, groupedResult) {
                values.grouped = groupedResult ? function() {
                    return groupedResult;
                } : function() {
                    return groupValues(values);
                };
            }
            function groupValues(values) {
                for (var currentGroup, groups = [], i = 0, len = values.length; len > i; i++) {
                    var value = values[i];
                    if (!currentGroup || currentGroup.identity !== value.identity) {
                        if (currentGroup = {
                            values: []
                        }, value.identity) {
                            currentGroup.identity = value.identity;
                            var source = value.source;
                            void 0 !== source.groupName ? currentGroup.name = source.groupName : source.displayName && (currentGroup.name = source.displayName);
                        }
                        groups.push(currentGroup);
                    }
                    currentGroup.values.push(value);
                }
                return groups;
            }
            function pivotIfNecessary(dataView, dataViewMappings) {
                var transformedDataView;
                switch (determineCategoricalTransformation(dataView.categorical, dataViewMappings)) {
                  case 1:
                    transformedDataView = data.DataViewPivotCategorical.apply(dataView);
                    break;

                  case 2:
                    transformedDataView = data.DataViewSelfCrossJoin.apply(dataView);
                }
                return transformedDataView || dataView;
            }
            function determineCategoricalTransformation(categorical, dataViewMappings) {
                if (categorical && !_.isEmpty(dataViewMappings)) {
                    var categories = categorical.categories;
                    if (categories && 1 === categories.length) {
                        var values = categorical.values;
                        if (!_.isEmpty(values) && !values.grouped().some(function(vg) {
                            return !!vg.identity;
                        })) for (var categoryRoles = categories[0].source.roles, i = 0, len = dataViewMappings.length; len > i; i++) {
                            var roleMappingCategorical = dataViewMappings[i].categorical;
                            if (roleMappingCategorical && hasRolesGrouped(categoryRoles, roleMappingCategorical.values)) {
                                var categoriesMapping = roleMappingCategorical.categories, hasCategoryRole = hasRolesBind(categoryRoles, categoriesMapping) || hasRolesFor(categoryRoles, categoriesMapping);
                                return hasCategoryRole ? 2 : 1;
                            }
                        }
                    }
                }
            }
            function shouldPivotMatrix(matrix, dataViewMappings) {
                if (matrix && !_.isEmpty(dataViewMappings)) {
                    var rowLevels = matrix.rows.levels;
                    if (!(rowLevels.length < 1)) {
                        var rows = matrix.rows.root.children;
                        if (rows && 0 !== rows.length) for (var rowRoles = rowLevels[0].sources[0].roles, i = 0, len = dataViewMappings.length; len > i; i++) {
                            var roleMappingMatrix = dataViewMappings[i].matrix;
                            if (roleMappingMatrix && !hasRolesFor(rowRoles, roleMappingMatrix.rows) && hasRolesFor(rowRoles, roleMappingMatrix.columns)) return !0;
                        }
                    }
                }
            }
            function hasRolesBind(roles, roleMapping) {
                return roles && roleMapping && roleMapping.bind ? roles[roleMapping.bind.to] : void 0;
            }
            function hasRolesFor(roles, roleMapping) {
                return roles && roleMapping && roleMapping["for"] ? roles[roleMapping["for"]["in"]] : void 0;
            }
            function hasRolesGrouped(roles, roleMapping) {
                return roles && roleMapping && roleMapping.group ? roles[roleMapping.group.by] : void 0;
            }
            DataViewTransform.apply = apply, DataViewTransform.transformObjects = transformObjects, 
            DataViewTransform.createValueColumns = createValueColumns;
        }(DataViewTransform = data.DataViewTransform || (data.DataViewTransform = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var DataViewRegression;
        !function(DataViewRegression) {
            function run(options) {
                var dataViewMappings = options.dataViewMappings, transformedDataViews = options.transformedDataViews, dataRoles = options.dataRoles, objectDescriptors = options.objectDescriptors, objectDefinitions = options.objectDefinitions, colorAllocatorFactory = options.colorAllocatorFactory, transformSelects = options.transformSelects, dataView = options.dataView;
                if (1 === transformedDataViews.length && transformSelects && dataView.metadata) {
                    var roleKindByQueryRef = data.DataViewSelectTransform.createRoleKindFromMetadata(transformSelects, dataView.metadata), projections = data.DataViewSelectTransform.projectionsFromSelects(transformSelects, null);
                    if (!(roleKindByQueryRef && projections && dataViewMappings && objectDescriptors && objectDefinitions)) return transformedDataViews;
                    var applicableDataViewMappings = powerbi.DataViewAnalysis.chooseDataViewMappings(projections, dataViewMappings, roleKindByQueryRef, objectDescriptors, objectDefinitions).supportedMappings;
                    if (applicableDataViewMappings) {
                        var regressionDataViewMapping = _.find(applicableDataViewMappings, function(dataViewMapping) {
                            return dataViewMapping.usage && dataViewMapping.usage.regression;
                        });
                        if (regressionDataViewMapping) {
                            var regressionSource = transformedDataViews[0], regressionDataView = this.linearRegressionTransform(regressionSource, dataRoles, regressionDataViewMapping, objectDescriptors, objectDefinitions, colorAllocatorFactory);
                            regressionDataView && transformedDataViews.push(regressionDataView);
                        }
                    }
                }
                return transformedDataViews;
            }
            function linearRegressionTransform(sourceDataView, dataRoles, regressionDataViewMapping, objectDescriptors, objectDefinitions, colorAllocatorFactory) {
                var xRole = findRoleWithCartesianAxis(0, dataRoles), yRole = findRoleWithCartesianAxis(1, dataRoles);
                if (xRole && yRole) {
                    var xColumn = getColumnForCategoricalRole(xRole, sourceDataView.categorical), yColumn = getColumnForCategoricalRole(yRole, sourceDataView.categorical);
                    if (xColumn && yColumn) {
                        var unsortedXValues = xColumn.values, unsortedYValues = yColumn.values;
                        if (!_.isEmpty(unsortedXValues) && !_.isEmpty(unsortedYValues)) {
                            var xDataType = getDataType(unsortedXValues);
                            if (xDataType) {
                                var yDataType = getDataType(unsortedYValues);
                                if (yDataType) {
                                    var _a = sortValues(unsortedXValues, unsortedYValues), xValues = _a.xValues, yValues = _a.yValues, minCategoryValue = xValues[0], maxCategoryValue = xValues[xValues.length - 1];
                                    "Date" === xDataType && (xValues = normalizeDateValues(xValues));
                                    var _b = computeRegressionLine(xValues, yValues), slope = _b.slope, intercept = _b.intercept, minXValue = xValues[0], maxXValue = xValues[xValues.length - 1], newCategories = [ minCategoryValue, maxCategoryValue ], newValues = [ minXValue * slope + intercept, maxXValue * slope + intercept ], regressionDataView = createRegressionDataView(xColumn, yColumn, newCategories, newValues, sourceDataView, regressionDataViewMapping, objectDescriptors, objectDefinitions, colorAllocatorFactory);
                                    return regressionDataView;
                                }
                            }
                        }
                    }
                }
            }
            function findRoleWithCartesianAxis(cartesianRole, dataRoles) {
                for (var _i = 0; _i < dataRoles.length; _i++) {
                    var dataRole = dataRoles[_i];
                    if (dataRole.cartesianKind === cartesianRole) return dataRole.name;
                }
            }
            function getColumnForCategoricalRole(roleName, categorical) {
                var categoryColumn = getRoleFromColumn(roleName, categorical.categories);
                if (categoryColumn) return categoryColumn;
                if (categorical.values.source) return null;
                var valueColumn = getRoleFromColumn(roleName, categorical.values);
                return valueColumn ? valueColumn : null;
            }
            function getRoleFromColumn(roleName, columns) {
                return _.find(columns, function(column) {
                    return column.source.roles[roleName];
                });
            }
            function getDataType(values) {
                if (!_.isEmpty(values) && null != values[0]) {
                    var dataType = typeof values[0];
                    if (!_.some(values, function(value) {
                        return null === value || typeof value !== dataType;
                    })) return dataType;
                }
            }
            function sortValues(unsortedXValues, unsortedYValues) {
                var zippedValues = _.zip(unsortedXValues, unsortedYValues), sortedValues = _.sortBy(zippedValues, function(valuePair) {
                    return valuePair[0];
                }), _a = _.unzip(sortedValues), xValues = _a[0], yValues = _a[1];
                return {
                    xValues: xValues,
                    yValues: yValues
                };
            }
            function normalizeDateValues(xValues) {
                for (var initialTime = xValues[0].getTime(), i = 0; i < xValues.length; i++) xValues[i] = xValues[i].getTime() - initialTime;
                return xValues;
            }
            function computeRegressionLine(xValues, yValues) {
                var xBar = _.sum(xValues) / xValues.length, yBar = _.sum(yValues) / yValues.length, ssXX = _.chain(xValues).map(function(x) {
                    return Math.pow(x - xBar, 2);
                }).sum(), ssXY = _.chain(xValues).map(function(x, i) {
                    return (x - xBar) * (yValues[i] - yBar);
                }).sum(), slope = ssXY / ssXX, intercept = yBar - xBar * slope;
                return {
                    slope: slope,
                    intercept: intercept
                };
            }
            function createRegressionDataView(xColumn, yColumn, newCategories, newValues, sourceDataView, regressionDataViewMapping, objectDescriptors, objectDefinitions, colorAllocatorFactory) {
                var xRole = regressionDataViewMapping.categorical.categories["for"]["in"], yRole = regressionDataViewMapping.categorical.values["for"]["in"], categoricalRoles = {};
                categoricalRoles[xRole] = !0;
                var valueRoles = {};
                valueRoles[yRole] = !0;
                var regressionDataView = data.createCategoricalDataViewBuilder().withCategories([ {
                    source: {
                        displayName: xColumn.source.displayName,
                        queryName: regressionXQueryName,
                        type: xColumn.source.type,
                        isMeasure: xColumn.source.isMeasure,
                        roles: categoricalRoles
                    },
                    values: newCategories
                } ]).withValues({
                    columns: [ {
                        source: {
                            displayName: yColumn.source.displayName,
                            queryName: DataViewRegression.regressionYQueryName,
                            type: yColumn.source.type,
                            isMeasure: yColumn.source.isMeasure,
                            roles: valueRoles
                        },
                        values: newValues
                    } ]
                }).build();
                return data.DataViewTransform.transformObjects(regressionDataView, 1, objectDescriptors, objectDefinitions, [], colorAllocatorFactory), 
                regressionDataView;
            }
            var regressionXQueryName = "RegressionX";
            DataViewRegression.regressionYQueryName = "RegressionY", DataViewRegression.run = run, 
            DataViewRegression.linearRegressionTransform = linearRegressionTransform;
        }(DataViewRegression = data.DataViewRegression || (data.DataViewRegression = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var DataViewSelectTransform;
        !function(DataViewSelectTransform) {
            function projectionsFromSelects(selects, projectionActiveItems) {
                for (var projections = {}, _i = 0; _i < selects.length; _i++) {
                    var select = selects[_i], roles = select.roles;
                    if (roles) for (var roleName in roles) if (roles[roleName]) {
                        var qp = projections[roleName];
                        qp || (qp = projections[roleName] = new data.QueryProjectionCollection([])), qp.all().push({
                            queryRef: select.queryName
                        }), projectionActiveItems && projectionActiveItems[roleName] && (qp.activeProjectionRefs = projectionActiveItems[roleName]);
                    }
                }
                return projections;
            }
            function createRoleKindFromMetadata(selects, metadata) {
                for (var roleKindByQueryRef = {}, _i = 0, _a = metadata.columns; _i < _a.length; _i++) {
                    var column = _a[_i];
                    if (!(!column.index && 0 !== column.index || column.index < 0 || column.index >= selects.length)) {
                        var select = selects[column.index];
                        if (select) {
                            var queryRef = select.queryName;
                            queryRef && void 0 === roleKindByQueryRef[queryRef] && (roleKindByQueryRef[queryRef] = column.isMeasure ? powerbi.VisualDataRoleKind.Measure : powerbi.VisualDataRoleKind.Grouping);
                        }
                    }
                }
                return roleKindByQueryRef;
            }
            DataViewSelectTransform.projectionsFromSelects = projectionsFromSelects, DataViewSelectTransform.createRoleKindFromMetadata = createRoleKindFromMetadata;
        }(DataViewSelectTransform = data.DataViewSelectTransform || (data.DataViewSelectTransform = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var DataViewNormalizeValues, inheritSingle = powerbi.Prototype.inheritSingle;
        !function(DataViewNormalizeValues) {
            function apply(options) {
                var rolesToNormalize = _.filter(options.dataRoles, function(role) {
                    return !_.isEmpty(role.requiredTypes);
                });
                filterVariantMeasures(options.dataview, options.dataViewMappings, rolesToNormalize);
            }
            function filterVariantMeasures(dataview, dataViewMappings, rolesToNormalize) {
                if (!_.isEmpty(dataViewMappings) && !_.isEmpty(rolesToNormalize)) {
                    for (var columnFilter = generateMetadataColumnFilter(dataview.metadata.columns, rolesToNormalize), valueFilter = generateValueFilter(dataview.metadata.columns, rolesToNormalize), usedMappings = {}, _i = 0; _i < dataViewMappings.length; _i++) {
                        var dataViewMapping = dataViewMappings[_i];
                        for (var dataViewMappingProp in dataViewMapping) null != dataview[dataViewMappingProp] && (usedMappings[dataViewMappingProp] = !0);
                    }
                    usedMappings.categorical && filterVariantMeasuresCategorical(dataview.categorical, columnFilter, valueFilter), 
                    usedMappings.table && filterVariantMeasuresTable(dataview.table, columnFilter, valueFilter), 
                    usedMappings.tree && filterVariantMeasuresTreeNode(dataview.tree.root, columnFilter, valueFilter), 
                    usedMappings.matrix && filterVariantMeasuresMatrix(dataview.matrix, columnFilter, valueFilter), 
                    usedMappings.single && filterVariantMeasuresSingle(dataview, dataViewMappings, rolesToNormalize, valueFilter);
                }
            }
            function generateMetadataColumnFilter(columns, rolesToNormalize) {
                if (!columns || !rolesToNormalize) return function() {
                    return !1;
                };
                for (var columnsToNormalize = {}, _i = 0; _i < columns.length; _i++) {
                    var column = columns[_i], roles = column.roles;
                    if (roles) for (var _a = 0; _a < rolesToNormalize.length; _a++) {
                        var role = rolesToNormalize[_a];
                        if (roles[role.name]) {
                            columnsToNormalize[column.index] = !0;
                            break;
                        }
                    }
                }
                return function(columnIndex) {
                    return isNaN(columnIndex) ? !1 : !!columnsToNormalize[columnIndex];
                };
            }
            function generateValueFilter(columns, rolesToNormalize) {
                if (!columns || !rolesToNormalize) return function() {
                    return !0;
                };
                for (var columnValueFilters = [], _i = 0; _i < columns.length; _i++) {
                    var column = columns[_i], columnValueFilter = generateColumnValueFilter(column, rolesToNormalize);
                    columnValueFilter && (columnValueFilters[column.index] = columnValueFilter);
                }
                return function(columnIndex, value) {
                    return columnValueFilters[columnIndex] ? columnValueFilters[columnIndex](value) : !0;
                };
            }
            function generateColumnValueFilter(column, rolesToNormalize) {
                var requiredTypes = getColumnRequiredTypes(column, rolesToNormalize);
                if (!_.isEmpty(requiredTypes)) return function(value) {
                    return doesValueMatchTypes(value, requiredTypes);
                };
            }
            function getColumnRequiredTypes(column, rolesToNormalize) {
                var requiredTypes = [], columnRoles = column && column.roles;
                if (!columnRoles) return requiredTypes;
                for (var _i = 0; _i < rolesToNormalize.length; _i++) {
                    var role = rolesToNormalize[_i];
                    if (columnRoles[role.name]) for (var _a = 0, _b = role.requiredTypes; _a < _b.length; _a++) {
                        var typeDescriptor = _b[_a], type = powerbi.ValueType.fromDescriptor(typeDescriptor);
                        requiredTypes.push(type);
                    }
                }
                return requiredTypes;
            }
            function filterVariantMeasuresCategorical(dataview, columnFilter, valueFilter) {
                var values = dataview && dataview.values;
                if (values) {
                    var valuesGrouped = values.grouped();
                    if (valuesGrouped) for (var _i = 0; _i < valuesGrouped.length; _i++) for (var valueGroup = valuesGrouped[_i], valuesInGroup = valueGroup.values, _a = 0; _a < valuesInGroup.length; _a++) {
                        var valueColumn = valuesInGroup[_a], columnIndex = valueColumn.source.index;
                        if (columnFilter(columnIndex)) for (var i = 0, ilen = valueColumn.values.length; ilen > i; i++) valueColumn.values = normalizeVariant(valueColumn.values, i, columnIndex, valueFilter);
                    }
                }
            }
            function filterVariantMeasuresTable(dataview, columnFilter, valueFilter) {
                var columns = dataview && dataview.columns;
                if (columns) {
                    for (var filteredColumns = [], _i = 0; _i < columns.length; _i++) {
                        var column = columns[_i];
                        columnFilter(column.index) && filteredColumns.push(column.index);
                    }
                    for (var rows = dataview.rows, i = 0, ilen = rows.length; ilen > i; i++) for (var _a = 0; _a < filteredColumns.length; _a++) {
                        var index = filteredColumns[_a];
                        rows[i] = normalizeVariant(rows[i], index, index, valueFilter);
                    }
                }
            }
            function filterVariantMeasuresTreeNode(node, columnFilter, valueFilter) {
                if (node.values) for (var columnIndex in node.values) columnFilter(columnIndex) && ("object" == typeof node.values[columnIndex] && "value" in node.values[columnIndex] ? node.values[columnIndex] = normalizeVariant(node.values[columnIndex], "value", columnIndex, valueFilter) : node.values = normalizeVariant(node.values, columnIndex, columnIndex, valueFilter)); else if (node.children) for (var _i = 0, _a = node.children; _i < _a.length; _i++) {
                    var child = _a[_i];
                    filterVariantMeasuresTreeNode(child, columnFilter, valueFilter);
                }
            }
            function filterVariantMeasuresMatrix(dataview, columnFilter, valueFilter) {
                var root = dataview && dataview.rows && dataview.rows.root;
                root && filterVariantMeasuresMatrixRecursive(dataview, root, columnFilter, valueFilter);
            }
            function filterVariantMeasuresMatrixRecursive(dataviewMatrix, node, columnFilter, valueFilter) {
                if (node.values) for (var id in node.values) {
                    var nodeValue = node.values[id], valueSourceIndex = nodeValue.valueSourceIndex || 0, columnIndex = dataviewMatrix.valueSources[valueSourceIndex].index;
                    _.isNumber(columnIndex) && columnFilter(columnIndex) && (node.values[id] = normalizeVariant(nodeValue, "value", columnIndex, valueFilter));
                } else if (node.children) for (var _i = 0, _a = node.children; _i < _a.length; _i++) {
                    var child = _a[_i];
                    filterVariantMeasuresMatrixRecursive(dataviewMatrix, child, columnFilter, valueFilter);
                }
            }
            function filterVariantMeasuresSingle(dataview, dataViewMappings, rolesToNormalize, valueFilter) {
                if (dataview.single) {
                    for (var roleNames = [], _i = 0; _i < rolesToNormalize.length; _i++) {
                        var role = rolesToNormalize[_i];
                        role.name && roleNames.push(role.name);
                    }
                    for (var columns = dataview.metadata.columns, _a = 0; _a < dataViewMappings.length; _a++) {
                        var dataViewMapping = dataViewMappings[_a], roleName = dataViewMapping.single.role;
                        if (-1 !== roleNames.indexOf(roleName)) {
                            var column = firstColumnByRoleName(columns, roleName);
                            return void (column && (dataview.single = normalizeVariant(dataview.single, "value", column.index, valueFilter)));
                        }
                    }
                }
            }
            function normalizeVariant(object, key, columnIndex, valueFilter) {
                if (object) {
                    var value = object[key];
                    return null === value || valueFilter(columnIndex, value) || (object = inheritSingle(object), 
                    object[key] = null), object;
                }
            }
            function doesValueMatchTypes(value, types) {
                for (var _i = 0; _i < types.length; _i++) {
                    var type = types[_i];
                    if (type.numeric || type.integer) return "number" == typeof value;
                }
                return !1;
            }
            function firstColumnByRoleName(columns, roleName) {
                for (var _i = 0; _i < columns.length; _i++) {
                    var column = columns[_i], columnRoles = column && column.roles;
                    if (columnRoles && columnRoles[roleName]) return column;
                }
            }
            DataViewNormalizeValues.apply = apply, DataViewNormalizeValues.filterVariantMeasures = filterVariantMeasures, 
            DataViewNormalizeValues.generateMetadataColumnFilter = generateMetadataColumnFilter, 
            DataViewNormalizeValues.generateValueFilter = generateValueFilter, DataViewNormalizeValues.getColumnRequiredTypes = getColumnRequiredTypes, 
            DataViewNormalizeValues.normalizeVariant = normalizeVariant;
        }(DataViewNormalizeValues = data.DataViewNormalizeValues || (data.DataViewNormalizeValues = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        function createDisplayNameGetter(displayNameKey) {
            return function(resourceProvider) {
                return resourceProvider.get(displayNameKey);
            };
        }
        function getDisplayName(displayNameGetter, resourceProvider) {
            return "function" == typeof displayNameGetter ? displayNameGetter(resourceProvider) : "string" == typeof displayNameGetter ? displayNameGetter : void 0;
        }
        data.createDisplayNameGetter = createDisplayNameGetter, data.getDisplayName = getDisplayName;
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    !function(DateTimeUnit) {
        DateTimeUnit[DateTimeUnit.Year = 0] = "Year", DateTimeUnit[DateTimeUnit.Month = 1] = "Month", 
        DateTimeUnit[DateTimeUnit.Week = 2] = "Week", DateTimeUnit[DateTimeUnit.Day = 3] = "Day", 
        DateTimeUnit[DateTimeUnit.Hour = 4] = "Hour", DateTimeUnit[DateTimeUnit.Minute = 5] = "Minute", 
        DateTimeUnit[DateTimeUnit.Second = 6] = "Second", DateTimeUnit[DateTimeUnit.Millisecond = 7] = "Millisecond";
    }(powerbi.DateTimeUnit || (powerbi.DateTimeUnit = {}));
    powerbi.DateTimeUnit;
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var SQExprBuilder;
        !function(SQExprBuilder) {
            function fieldExpr(fieldExpr) {
                return wrapColumnAggr(fieldExpr) || wrapColumn(fieldExpr) || wrapMeasure(fieldExpr) || wrapHierarchyLevel(fieldExpr) || wrapHierarchy(fieldExpr) || wrapEntityAggr(fieldExpr) || wrapPropertyVariationSource(fieldExpr) || wrapEntity(fieldExpr);
            }
            function wrapColumnAggr(fieldExpr) {
                var aggr = fieldExpr.columnAggr;
                if (aggr) {
                    var entityExpr = wrapEntity(fieldExpr.columnAggr);
                    return SQExprBuilder.aggregate(SQExprBuilder.columnRef(entityExpr, aggr.name), aggr.aggregate);
                }
            }
            function wrapHierarchyLevel(fieldExpr) {
                var hierarchyLevelPattern = fieldExpr.hierarchyLevel;
                if (hierarchyLevelPattern) {
                    var hierarchyExpr = SQExprBuilder.hierarchy(wrapEntity(hierarchyLevelPattern), hierarchyLevelPattern.name);
                    return SQExprBuilder.hierarchyLevel(hierarchyExpr, hierarchyLevelPattern.level);
                }
            }
            function wrapHierarchy(fieldExpr) {
                var hierarchyExprPattern = fieldExpr.hierarchy;
                if (hierarchyExprPattern) {
                    var entityExpr = wrapEntity(hierarchyExprPattern);
                    return SQExprBuilder.hierarchy(entityExpr, hierarchyExprPattern.name);
                }
            }
            function wrapPropertyVariationSource(fieldExpr) {
                var variation = fieldExpr.columnHierarchyLevelVariation;
                if (variation) {
                    var entitiyExpr = wrapEntity(variation.source);
                    return SQExprBuilder.propertyVariationSource(entitiyExpr, variation.source.name, variation.level.name);
                }
            }
            function wrapColumn(fieldExpr) {
                var column = fieldExpr.column;
                if (column) {
                    var entityExpr = wrapEntity(fieldExpr.column);
                    return SQExprBuilder.columnRef(entityExpr, column.name);
                }
            }
            function wrapMeasure(fieldExpr) {
                var measure = fieldExpr.measure;
                if (measure) {
                    var entityExpr = wrapEntity(fieldExpr.measure);
                    return SQExprBuilder.measureRef(entityExpr, measure.name);
                }
            }
            function wrapEntityAggr(fieldExpr) {
                var entityAggregate = fieldExpr.entityAggr;
                if (entityAggregate) {
                    var entityExpr = wrapEntity(fieldExpr.entityAggr);
                    return SQExprBuilder.aggregate(entityExpr, entityAggregate.aggregate);
                }
            }
            function wrapEntity(fieldExpr) {
                var fieldExprEntityItemPattern = FieldExprPattern.toFieldExprEntityItemPattern(fieldExpr);
                return SQExprBuilder.entity(fieldExprEntityItemPattern.schema, fieldExprEntityItemPattern.entity, fieldExprEntityItemPattern.entityVar);
            }
            SQExprBuilder.fieldExpr = fieldExpr;
        }(SQExprBuilder = data.SQExprBuilder || (data.SQExprBuilder = {}));
        var SQExprConverter;
        !function(SQExprConverter) {
            function asFieldPattern(sqExpr) {
                return sqExpr instanceof data.SQEntityExpr ? {
                    entity: sqExpr.entity,
                    schema: sqExpr.schema
                } : sqExpr.accept(FieldExprPatternBuilder.instance);
            }
            SQExprConverter.asFieldPattern = asFieldPattern;
        }(SQExprConverter = data.SQExprConverter || (data.SQExprConverter = {}));
        var FieldExprPattern, FieldExprPatternBuilder = function(_super) {
            function FieldExprPatternBuilder() {
                _super.apply(this, arguments);
            }
            return __extends(FieldExprPatternBuilder, _super), FieldExprPatternBuilder.prototype.visitColumnRef = function(expr) {
                var sourceRef = expr.source.accept(SourceExprPatternBuilder.instance);
                if (sourceRef && sourceRef.entity) {
                    var columnRef = sourceRef.entity;
                    return columnRef.name = expr.ref, {
                        column: columnRef
                    };
                }
            }, FieldExprPatternBuilder.prototype.visitMeasureRef = function(expr) {
                var sourceRef = expr.source.accept(SourceExprPatternBuilder.instance);
                if (sourceRef && sourceRef.entity) {
                    var measureRef = sourceRef.entity;
                    return measureRef.name = expr.ref, {
                        measure: measureRef
                    };
                }
            }, FieldExprPatternBuilder.prototype.visitAggr = function(expr) {
                var fieldPattern = expr.arg.accept(this);
                if (fieldPattern && fieldPattern.column) {
                    var argAggr = fieldPattern.column;
                    return argAggr.aggregate = expr.func, {
                        columnAggr: argAggr
                    };
                }
                if (fieldPattern && fieldPattern.columnAggr) {
                    var argAggr = fieldPattern.columnAggr;
                    return argAggr.aggregate = expr.func, {
                        columnAggr: argAggr
                    };
                }
                if (fieldPattern && fieldPattern.hierarchyLevel) {
                    var argAggr = fieldPattern.hierarchyLevel;
                    return argAggr.aggregate = expr.func, {
                        hierarchyLevelAggr: argAggr
                    };
                }
                var sourcePattern = expr.arg.accept(SourceExprPatternBuilder.instance);
                if (sourcePattern && sourcePattern.entity) {
                    var argAggr = sourcePattern.entity;
                    return argAggr.aggregate = expr.func, {
                        entityAggr: argAggr
                    };
                }
            }, FieldExprPatternBuilder.prototype.visitHierarchy = function(expr) {
                var sourcePattern = expr.arg.accept(SourceExprPatternBuilder.instance);
                if (sourcePattern && sourcePattern.entity) {
                    var hierarchyRef = sourcePattern.entity;
                    return hierarchyRef.name = expr.hierarchy, {
                        hierarchy: hierarchyRef
                    };
                }
            }, FieldExprPatternBuilder.prototype.visitHierarchyLevel = function(expr) {
                var hierarchySourceExprPattern = expr.arg.accept(HierarchyExprPatternBuiler.instance);
                if (hierarchySourceExprPattern) {
                    var hierarchyLevel;
                    return hierarchySourceExprPattern.hierarchy && (hierarchyLevel = {
                        entity: hierarchySourceExprPattern.hierarchy.entity,
                        schema: hierarchySourceExprPattern.hierarchy.schema,
                        name: hierarchySourceExprPattern.hierarchy.name,
                        level: expr.level
                    }), hierarchySourceExprPattern.variation ? {
                        columnHierarchyLevelVariation: {
                            source: {
                                entity: hierarchySourceExprPattern.variation.column.entity,
                                schema: hierarchySourceExprPattern.variation.column.schema,
                                name: hierarchySourceExprPattern.variation.column.name
                            },
                            level: hierarchyLevel,
                            variationName: hierarchySourceExprPattern.variation.variationName
                        }
                    } : {
                        hierarchyLevel: hierarchyLevel
                    };
                }
            }, FieldExprPatternBuilder.instance = new FieldExprPatternBuilder(), FieldExprPatternBuilder;
        }(data.DefaultSQExprVisitor), SourceExprPatternBuilder = function(_super) {
            function SourceExprPatternBuilder() {
                _super.apply(this, arguments);
            }
            return __extends(SourceExprPatternBuilder, _super), SourceExprPatternBuilder.prototype.visitEntity = function(expr) {
                var entityRef = {
                    schema: expr.schema,
                    entity: expr.entity
                };
                return expr.variable && (entityRef.entityVar = expr.variable), {
                    entity: entityRef
                };
            }, SourceExprPatternBuilder.prototype.visitPropertyVariationSource = function(expr) {
                var entityExpr = expr.arg;
                if (entityExpr instanceof data.SQEntityExpr) {
                    var propertyVariationSource = {
                        schema: entityExpr.schema,
                        entity: entityExpr.entity,
                        name: expr.property
                    };
                    return entityExpr.variable && (propertyVariationSource.entityVar = entityExpr.variable), 
                    {
                        variation: {
                            column: propertyVariationSource,
                            variationName: expr.name
                        }
                    };
                }
            }, SourceExprPatternBuilder.instance = new SourceExprPatternBuilder(), SourceExprPatternBuilder;
        }(data.DefaultSQExprVisitor), HierarchyExprPatternBuiler = function(_super) {
            function HierarchyExprPatternBuiler() {
                _super.apply(this, arguments);
            }
            return __extends(HierarchyExprPatternBuiler, _super), HierarchyExprPatternBuiler.prototype.visitHierarchy = function(expr) {
                var hierarchyRef, variationRef, exprPattern = expr.arg.accept(SourceExprPatternBuilder.instance);
                return exprPattern.variation ? (hierarchyRef = {
                    name: expr.hierarchy,
                    schema: exprPattern.variation.column.schema,
                    entity: exprPattern.variation.column.entity
                }, variationRef = exprPattern.variation) : hierarchyRef = {
                    name: expr.hierarchy,
                    schema: exprPattern.entity.schema,
                    entity: exprPattern.entity.entity
                }, {
                    hierarchy: hierarchyRef,
                    variation: variationRef
                };
            }, HierarchyExprPatternBuiler.instance = new HierarchyExprPatternBuiler(), HierarchyExprPatternBuiler;
        }(data.DefaultSQExprVisitor);
        !function(FieldExprPattern) {
            function hasFieldExprName(fieldExpr) {
                return void 0 !== (fieldExpr.column || fieldExpr.columnAggr || fieldExpr.measure);
            }
            function getPropertyName(fieldExpr) {
                var column = fieldExpr.column || fieldExpr.columnAggr || fieldExpr.measure;
                return column ? column.name : void 0;
            }
            function getHierarchyName(fieldExpr) {
                var hierarchy = fieldExpr.hierarchy;
                return hierarchy ? hierarchy.name : void 0;
            }
            function getColumnRef(fieldExpr) {
                return fieldExpr.columnHierarchyLevelVariation ? fieldExpr.columnHierarchyLevelVariation.source : fieldExpr.column || fieldExpr.measure || fieldExpr.columnAggr;
            }
            function getFieldExprName(fieldExpr) {
                var name = getPropertyName(fieldExpr);
                return name ? name : toFieldExprEntityItemPattern(fieldExpr).entity;
            }
            function toFieldExprEntityItemPattern(fieldExpr) {
                var field = fieldExpr.column || fieldExpr.columnAggr || fieldExpr.entityAggr || fieldExpr.hierarchy || fieldExpr.hierarchyLevel || fieldExpr.hierarchyLevelAggr || fieldExpr.measure || fieldExpr.columnHierarchyLevelVariation && fieldExpr.columnHierarchyLevelVariation.source || fieldExpr;
                return {
                    schema: field.schema,
                    entity: field.entity,
                    entityVar: field.entityVar
                };
            }
            FieldExprPattern.hasFieldExprName = hasFieldExprName, FieldExprPattern.getPropertyName = getPropertyName, 
            FieldExprPattern.getHierarchyName = getHierarchyName, FieldExprPattern.getColumnRef = getColumnRef, 
            FieldExprPattern.getFieldExprName = getFieldExprName, FieldExprPattern.toFieldExprEntityItemPattern = toFieldExprEntityItemPattern;
        }(FieldExprPattern = data.FieldExprPattern || (data.FieldExprPattern = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var DataViewAnalysis;
    !function(DataViewAnalysis) {
        function validateAndReshape(dataView, dataViewMappings) {
            if (!dataViewMappings || 0 === dataViewMappings.length) return {
                dataView: dataView,
                isValid: !0
            };
            if (dataView) for (var _i = 0; _i < dataViewMappings.length; _i++) {
                var dataViewMapping = dataViewMappings[_i];
                if (supports(dataView, dataViewMapping)) return {
                    dataView: dataView,
                    isValid: !0
                };
                if (dataViewMapping.categorical && dataView.categorical) return reshapeCategorical(dataView, dataViewMapping);
                if (dataViewMapping.tree && dataView.tree) return reshapeTree(dataView, dataViewMapping.tree);
                if (dataViewMapping.single && dataView.single) return reshapeSingle(dataView, dataViewMapping.single);
                if (dataViewMapping.table && dataView.table) return reshapeTable(dataView, dataViewMapping.table);
            } else if (powerbi.ScriptResultUtil.findScriptResult(dataViewMappings)) return {
                dataView: dataView,
                isValid: !0
            };
            return {
                isValid: !1
            };
        }
        function reshapeCategorical(dataView, dataViewMapping) {
            var categoryRoleMapping = dataViewMapping.categorical, categorical = dataView.categorical;
            if (!categorical) return {
                isValid: !1
            };
            var rowCount;
            if (categoryRoleMapping.rowCount && (rowCount = categoryRoleMapping.rowCount.supported, 
            rowCount && rowCount.max)) {
                var updated, categories = categorical.categories, maxRowCount = rowCount.max, originalLength = void 0;
                if (categories) for (var i = 0, len = categories.length; len > i; i++) {
                    var category = categories[i];
                    if (originalLength = category.values.length, void 0 !== maxRowCount && originalLength > maxRowCount) {
                        var updatedCategories = ArrayExtensions.range(category.values, 0, maxRowCount - 1);
                        updated = updated || {
                            categories: []
                        }, updated.categories.push({
                            source: category.source,
                            values: updatedCategories
                        });
                    }
                }
                if (categorical.values && categorical.values.length > 0 && maxRowCount && (originalLength || (originalLength = categorical.values[0].values.length), 
                void 0 !== maxRowCount && originalLength > maxRowCount)) {
                    updated = updated || {}, updated.values = powerbi.data.DataViewTransform.createValueColumns();
                    for (var i = 0, len = categorical.values.length; len > i; i++) {
                        var column = categorical.values[i], updatedColumn = {
                            source: column.source,
                            values: ArrayExtensions.range(column.values, 0, maxRowCount - 1)
                        };
                        void 0 !== column.min && (updatedColumn.min = column.min), void 0 !== column.max && (updatedColumn.max = column.max), 
                        void 0 !== column.subtotal && (updatedColumn.subtotal = column.subtotal), updated.values.push(updatedColumn);
                    }
                }
                updated && (dataView = {
                    metadata: dataView.metadata,
                    categorical: updated
                });
            }
            return supportsCategorical(dataView, dataViewMapping) ? {
                dataView: dataView,
                isValid: !0
            } : null;
        }
        function reshapeSingle(dataView, singleRoleMapping) {
            return dataView.single ? {
                dataView: dataView,
                isValid: !0
            } : {
                isValid: !1
            };
        }
        function reshapeTree(dataView, treeRoleMapping) {
            var metadata = dataView.metadata;
            return null == validateRange(countGroups(metadata.columns), treeRoleMapping.depth) ? {
                dataView: dataView,
                isValid: !0
            } : {
                isValid: !1
            };
        }
        function reshapeTable(dataView, tableRoleMapping) {
            return dataView.table ? {
                dataView: dataView,
                isValid: !0
            } : {
                isValid: !1
            };
        }
        function countGroups(columns) {
            for (var count = 0, i = 0, len = columns.length; len > i; i++) columns[i].isMeasure || ++count;
            return count;
        }
        function countMeasures(columns) {
            for (var count = 0, i = 0, len = columns.length; len > i; i++) columns[i].isMeasure && ++count;
            return count;
        }
        function supports(dataView, roleMapping, usePreferredDataViewSchema) {
            return roleMapping && dataView ? roleMapping.scriptResult && !supportsScriptResult(dataView.scriptResult, roleMapping.scriptResult) ? !1 : roleMapping.categorical && !supportsCategorical(dataView, roleMapping.categorical, usePreferredDataViewSchema) ? !1 : roleMapping.tree && !supportsTree(dataView, roleMapping.tree) ? !1 : roleMapping.single && !supportsSingle(dataView.single, roleMapping.single) ? !1 : roleMapping.table && !supportsTable(dataView.table, roleMapping.table, usePreferredDataViewSchema) ? !1 : !0 : !1;
        }
        function supportsCategorical(dataView, categoryRoleMapping, usePreferredDataViewSchema) {
            var dataViewCategorical = dataView.categorical;
            if (!dataViewCategorical) return !1;
            if (categoryRoleMapping.rowCount) {
                var rowCount = categoryRoleMapping.rowCount.supported;
                if (usePreferredDataViewSchema && categoryRoleMapping.rowCount.preferred && (rowCount = categoryRoleMapping.rowCount.preferred), 
                rowCount) {
                    var len = 0;
                    if (dataViewCategorical.values && dataViewCategorical.values.length ? len = dataViewCategorical.values[0].values.length : dataViewCategorical.categories && dataViewCategorical.categories.length && (len = dataViewCategorical.categories[0].values.length), 
                    null != validateRange(len, rowCount)) return !1;
                }
            }
            return !0;
        }
        function supportsSingle(dataViewSingle, singleRoleMapping) {
            return dataViewSingle ? !0 : !1;
        }
        function supportsTree(dataView, treeRoleMapping) {
            var metadata = dataView.metadata;
            return null == validateRange(countGroups(metadata.columns), treeRoleMapping.depth);
        }
        function supportsTable(dataViewTable, tableRoleMapping, usePreferredDataViewSchema) {
            if (!dataViewTable) return !1;
            if (tableRoleMapping.rowCount) {
                var rowCount = tableRoleMapping.rowCount.supported;
                if (usePreferredDataViewSchema && tableRoleMapping.rowCount.preferred && (rowCount = tableRoleMapping.rowCount.preferred), 
                rowCount) {
                    var len = 0;
                    if (dataViewTable.rows && dataViewTable.rows.length && (len = dataViewTable.rows.length), 
                    null != validateRange(len, rowCount)) return !1;
                }
            }
            return !0;
        }
        function supportsScriptResult(dataView, scriptResultRoleMapping) {
            return dataView && dataView.imageBase64 ? !0 : !1;
        }
        function validateRange(value, roleCondition, ignoreMin) {
            return roleCondition ? !ignoreMin && void 0 !== roleCondition.min && roleCondition.min > value ? DataViewMappingMatchErrorCode.conditionRangeTooSmall : void 0 !== roleCondition.max && roleCondition.max < value ? DataViewMappingMatchErrorCode.conditionRangeTooLarge : void 0 : void 0;
        }
        function validateKind(roleCondition, roleName, projections, roleKindByQueryRef) {
            if (roleCondition && void 0 !== roleCondition.kind) {
                var expectedKind = roleCondition.kind, roleCollection = projections[roleName];
                if (roleCollection) for (var roleProjections = roleCollection.all(), _i = 0; _i < roleProjections.length; _i++) {
                    var roleProjection = roleProjections[_i];
                    if (roleKindByQueryRef[roleProjection.queryRef] !== expectedKind) switch (expectedKind) {
                      case powerbi.VisualDataRoleKind.Measure:
                        return DataViewMappingMatchErrorCode.conditionKindExpectedMeasure;

                      case powerbi.VisualDataRoleKind.Grouping:
                        return DataViewMappingMatchErrorCode.conditionKindExpectedGrouping;

                      case powerbi.VisualDataRoleKind.GroupingOrMeasure:
                        return DataViewMappingMatchErrorCode.conditionKindExpectedGroupingOrMeasure;
                    }
                }
            }
        }
        function chooseDataViewMappings(projections, mappings, roleKindByQueryRef, objectDescriptors, objectDefinitions) {
            for (var supportedMappings = [], errors = [], mappingIndex = 0, mappingCount = mappings.length; mappingCount > mappingIndex; mappingIndex++) {
                var mapping = mappings[mappingIndex], mappingConditions = mapping.conditions, requiredProperties = mapping.requiredProperties, allPropertiesValid = areAllPropertiesValid(requiredProperties, objectDescriptors, objectDefinitions), conditionsMet = [];
                if (_.isEmpty(mappingConditions)) conditionsMet.push({}); else for (var conditionIndex = 0, conditionCount = mappingConditions.length; conditionCount > conditionIndex; conditionIndex++) {
                    var condition = mappingConditions[conditionIndex], currentConditionErrors = checkForConditionErrors(projections, condition, roleKindByQueryRef);
                    if (_.isEmpty(currentConditionErrors)) conditionsMet.push(condition); else for (var _i = 0; _i < currentConditionErrors.length; _i++) {
                        var error = currentConditionErrors[_i];
                        error.mappingIndex = mappingIndex, error.conditionIndex = conditionIndex, errors.push(error);
                    }
                }
                if (!_.isEmpty(conditionsMet) && allPropertiesValid) {
                    var supportedMapping = _.cloneDeep(mapping), updatedConditions = _.filter(conditionsMet, function(condition) {
                        return Object.keys(condition).length > 0;
                    });
                    _.isEmpty(updatedConditions) || (supportedMapping.conditions = updatedConditions), 
                    supportedMappings.push(supportedMapping);
                }
            }
            return {
                supportedMappings: ArrayExtensions.emptyToNull(supportedMappings),
                mappingErrors: ArrayExtensions.emptyToNull(errors)
            };
        }
        function checkForConditionErrors(projections, condition, roleKindByQueryRef) {
            for (var conditionRoles = Object.keys(condition), errors = [], i = 0, len = conditionRoles.length; len > i; i++) {
                var roleName = conditionRoles[i], isDrillable = projections[roleName] && !_.isEmpty(projections[roleName].activeProjectionRefs), roleCondition = condition[roleName], roleCount = getPropertyCount(roleName, projections, isDrillable), rangeError = validateRange(roleCount, roleCondition);
                null != rangeError && errors.push({
                    code: rangeError,
                    roleName: roleName
                });
                var kindError = validateKind(roleCondition, roleName, projections, roleKindByQueryRef);
                null != kindError && errors.push({
                    code: kindError,
                    roleName: roleName
                });
            }
            return errors;
        }
        function areAllPropertiesValid(requiredProperties, objectDescriptors, objectDefinitions) {
            if (_.isEmpty(requiredProperties)) return !0;
            if (!objectDescriptors || !objectDefinitions) return !1;
            var staticEvalContext = powerbi.data.createStaticEvalContext();
            return _.every(requiredProperties, function(requiredProperty) {
                var objectDescriptorValue = null, objectDescriptorProperty = objectDescriptors[requiredProperty.objectName];
                objectDescriptorProperty && (objectDescriptorValue = objectDescriptorProperty.properties[requiredProperty.propertyName]);
                var objectDefinitionValue = DataViewObjectDefinitions.getValue(objectDefinitions, requiredProperty, null);
                return objectDescriptorValue && objectDefinitionValue ? powerbi.data.DataViewObjectEvaluator.evaluateProperty(staticEvalContext, objectDescriptorValue, objectDefinitionValue) : !1;
            });
        }
        function getPropertyCount(roleName, projections, useActiveIfAvailable) {
            var projectionsForRole = projections[roleName];
            return projectionsForRole ? useActiveIfAvailable ? 1 : projectionsForRole.all().length : 0;
        }
        function hasSameCategoryIdentity(dataView1, dataView2) {
            if (dataView1 && dataView2 && dataView1.categorical && dataView2.categorical) {
                var dv1Categories = dataView1.categorical.categories, dv2Categories = dataView2.categorical.categories;
                if (dv1Categories && dv2Categories && dv1Categories.length === dv2Categories.length) {
                    for (var i = 0, len = dv1Categories.length; len > i; i++) {
                        var dv1Identity = dv1Categories[i].identity, dv2Identity = dv2Categories[i].identity, dv1Length = getLengthOptional(dv1Identity);
                        if (dv1Length !== getLengthOptional(dv2Identity)) return !1;
                        for (var j = 0; dv1Length > j; j++) if (!powerbi.DataViewScopeIdentity.equals(dv1Identity[j], dv2Identity[j])) return !1;
                    }
                    return !0;
                }
            }
            return !1;
        }
        function getLengthOptional(identity) {
            return identity ? identity.length : 0;
        }
        function areMetadataColumnsEquivalent(column1, column2) {
            return column1 || column2 ? column1 && column2 ? column1.displayName !== column2.displayName ? !1 : column1.queryName !== column2.queryName ? !1 : column1.isMeasure !== column2.isMeasure ? !1 : column1.type !== column2.type ? !1 : column1.sort !== column2.sort ? !1 : !0 : !1 : !0;
        }
        function isMetadataEquivalent(metadata1, metadata2) {
            if (!metadata1 && !metadata2) return !0;
            if (!metadata1 || !metadata2) return !1;
            var previousColumnsLength = metadata1.columns.length, newColumnsLength = metadata2.columns.length;
            if (previousColumnsLength !== newColumnsLength) return !1;
            for (var i = 0; newColumnsLength > i; i++) if (!DataViewAnalysis.areMetadataColumnsEquivalent(metadata1.columns[i], metadata2.columns[i])) return !1;
            return !0;
        }
        var ArrayExtensions = jsCommon.ArrayExtensions, DataViewObjectDefinitions = powerbi.data.DataViewObjectDefinitions;
        !function(DataViewMappingMatchErrorCode) {
            DataViewMappingMatchErrorCode[DataViewMappingMatchErrorCode.conditionRangeTooLarge = 0] = "conditionRangeTooLarge", 
            DataViewMappingMatchErrorCode[DataViewMappingMatchErrorCode.conditionRangeTooSmall = 1] = "conditionRangeTooSmall", 
            DataViewMappingMatchErrorCode[DataViewMappingMatchErrorCode.conditionKindExpectedMeasure = 2] = "conditionKindExpectedMeasure", 
            DataViewMappingMatchErrorCode[DataViewMappingMatchErrorCode.conditionKindExpectedGrouping = 3] = "conditionKindExpectedGrouping", 
            DataViewMappingMatchErrorCode[DataViewMappingMatchErrorCode.conditionKindExpectedGroupingOrMeasure = 4] = "conditionKindExpectedGroupingOrMeasure";
        }(DataViewAnalysis.DataViewMappingMatchErrorCode || (DataViewAnalysis.DataViewMappingMatchErrorCode = {}));
        var DataViewMappingMatchErrorCode = DataViewAnalysis.DataViewMappingMatchErrorCode;
        DataViewAnalysis.validateAndReshape = validateAndReshape, DataViewAnalysis.countGroups = countGroups, 
        DataViewAnalysis.countMeasures = countMeasures, DataViewAnalysis.supports = supports, 
        DataViewAnalysis.validateRange = validateRange, DataViewAnalysis.chooseDataViewMappings = chooseDataViewMappings, 
        DataViewAnalysis.getPropertyCount = getPropertyCount, DataViewAnalysis.hasSameCategoryIdentity = hasSameCategoryIdentity, 
        DataViewAnalysis.areMetadataColumnsEquivalent = areMetadataColumnsEquivalent, DataViewAnalysis.isMetadataEquivalent = isMetadataEquivalent;
    }(DataViewAnalysis = powerbi.DataViewAnalysis || (powerbi.DataViewAnalysis = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var DataViewScopeIdentity;
    !function(DataViewScopeIdentity) {
        function equals(x, y, ignoreCase) {
            return x = x || null, y = y || null, x === y ? !0 : !x != !y ? !1 : data.SQExpr.equals(x.expr, y.expr, ignoreCase);
        }
        function filterFromIdentity(identities, isNot) {
            if (!_.isEmpty(identities)) {
                for (var exprs = [], _i = 0; _i < identities.length; _i++) {
                    var identity = identities[_i];
                    exprs.push(identity.expr);
                }
                return filterFromExprs(exprs, isNot);
            }
        }
        function filterFromExprs(orExprs, isNot) {
            if (!_.isEmpty(orExprs)) {
                for (var resultExpr, _i = 0; _i < orExprs.length; _i++) {
                    var orExpr = orExprs[_i], inExpr = data.ScopeIdentityExtractor.getInExpr(orExpr);
                    resultExpr = resultExpr ? data.SQExprBuilder.or(resultExpr, inExpr) : inExpr || orExpr;
                }
                return resultExpr && isNot && (resultExpr = powerbi.data.SQExprBuilder.not(resultExpr)), 
                powerbi.data.SemanticFilter.fromSQExpr(resultExpr);
            }
        }
        DataViewScopeIdentity.equals = equals, DataViewScopeIdentity.filterFromIdentity = filterFromIdentity, 
        DataViewScopeIdentity.filterFromExprs = filterFromExprs;
    }(DataViewScopeIdentity = powerbi.DataViewScopeIdentity || (powerbi.DataViewScopeIdentity = {}));
    var data;
    !function(data) {
        function createDataViewScopeIdentity(expr) {
            return new DataViewScopeIdentityImpl(expr);
        }
        var Lazy = jsCommon.Lazy;
        data.createDataViewScopeIdentity = createDataViewScopeIdentity;
        var DataViewScopeIdentityImpl = function() {
            function DataViewScopeIdentityImpl(expr) {
                this._expr = expr, this._key = new Lazy(function() {
                    return data.SQExprShortSerializer.serialize(expr);
                });
            }
            return Object.defineProperty(DataViewScopeIdentityImpl.prototype, "expr", {
                get: function() {
                    return this._expr;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(DataViewScopeIdentityImpl.prototype, "key", {
                get: function() {
                    return this._key.getValue();
                },
                enumerable: !0,
                configurable: !0
            }), DataViewScopeIdentityImpl;
        }();
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var DataViewScopeWildcard, Lazy = jsCommon.Lazy;
        !function(DataViewScopeWildcard) {
            function matches(wildcard, instance) {
                var instanceExprs = data.ScopeIdentityExtractor.getKeys(instance.expr);
                return instanceExprs ? data.SQExprUtils.sequenceEqual(wildcard.exprs, instanceExprs) : !1;
            }
            function fromExprs(exprs) {
                return new DataViewScopeWildcardImpl(exprs);
            }
            DataViewScopeWildcard.matches = matches, DataViewScopeWildcard.fromExprs = fromExprs;
            var DataViewScopeWildcardImpl = function() {
                function DataViewScopeWildcardImpl(exprs) {
                    this._exprs = exprs, this._key = new Lazy(function() {
                        return data.SQExprShortSerializer.serializeArray(exprs);
                    });
                }
                return Object.defineProperty(DataViewScopeWildcardImpl.prototype, "exprs", {
                    get: function() {
                        return this._exprs;
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(DataViewScopeWildcardImpl.prototype, "key", {
                    get: function() {
                        return this._key.getValue();
                    },
                    enumerable: !0,
                    configurable: !0
                }), DataViewScopeWildcardImpl;
            }();
        }(DataViewScopeWildcard = data.DataViewScopeWildcard || (data.DataViewScopeWildcard = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        function createCategoricalEvalContext(dataViewCategorical) {
            return new CategoricalEvalContext(dataViewCategorical);
        }
        function findRuleInputColumn(dataViewCategorical, inputRole) {
            return findRuleInputInColumns(dataViewCategorical.values, inputRole) || findRuleInputInColumns(dataViewCategorical.categories, inputRole);
        }
        function findRuleInputInColumns(columns, inputRole) {
            if (columns) for (var _i = 0; _i < columns.length; _i++) {
                var column = columns[_i], roles = column.source.roles;
                if (roles && roles[inputRole]) return column;
            }
        }
        data.createCategoricalEvalContext = createCategoricalEvalContext;
        var CategoricalEvalContext = function() {
            function CategoricalEvalContext(dataView) {
                this.dataView = dataView, this.columnsByRole = {};
            }
            return CategoricalEvalContext.prototype.getExprValue = function(expr) {}, CategoricalEvalContext.prototype.getRoleValue = function(roleName) {
                var columnsByRole = this.columnsByRole, column = columnsByRole[roleName];
                if (column || (column = columnsByRole[roleName] = findRuleInputColumn(this.dataView, roleName)), 
                column) {
                    var index = this.index;
                    return null != index ? column.values[this.index] : void 0;
                }
            }, CategoricalEvalContext.prototype.setCurrentRowIndex = function(index) {
                this.index = index;
            }, CategoricalEvalContext;
        }();
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var RuleEvaluation = function() {
            function RuleEvaluation() {}
            return RuleEvaluation.prototype.evaluate = function(evalContext) {}, RuleEvaluation;
        }();
        data.RuleEvaluation = RuleEvaluation;
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var ColorRuleEvaluation = function(_super) {
            function ColorRuleEvaluation(inputRole, allocator) {
                _super.call(this), this.inputRole = inputRole, this.allocator = allocator;
            }
            return __extends(ColorRuleEvaluation, _super), ColorRuleEvaluation.prototype.evaluate = function(evalContext) {
                var value = evalContext.getRoleValue(this.inputRole);
                return void 0 !== value ? this.allocator.color(value) : void 0;
            }, ColorRuleEvaluation;
        }(data.RuleEvaluation);
        data.ColorRuleEvaluation = ColorRuleEvaluation;
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var ScriptResultUtil, StringExtensions = jsCommon.StringExtensions, DefaultSQExprVisitor = powerbi.data.DefaultSQExprVisitor, SQExprConverter = powerbi.data.SQExprConverter, FieldExprPattern = powerbi.data.FieldExprPattern;
    !function(ScriptResultUtil) {
        function findScriptResult(dataViewMappings) {
            return dataViewMappings && 1 === dataViewMappings.length ? dataViewMappings[0].scriptResult : void 0;
        }
        function extractScriptResult(dataViewMappings) {
            var scriptResult = findScriptResult(dataViewMappings);
            if (scriptResult) {
                var objects = dataViewMappings[0].metadata.objects, source = powerbi.DataViewObjects.getValue(objects, scriptResult.script.source), provider = powerbi.DataViewObjects.getValue(objects, scriptResult.script.provider);
                return {
                    source: source,
                    provider: provider
                };
            }
        }
        function extractScriptResultFromVisualConfig(dataViewMappings, objects) {
            var scriptResult = findScriptResult(dataViewMappings);
            if (scriptResult && objects) {
                var scriptSource = powerbi.data.DataViewObjectDefinitions.getValue(objects, scriptResult.script.source, null), provider = powerbi.data.DataViewObjectDefinitions.getValue(objects, scriptResult.script.provider, null);
                return {
                    source: scriptSource ? scriptSource.value : null,
                    provider: provider ? provider.value : null
                };
            }
        }
        function getScriptInput(projections, selects, schema) {
            var scriptInput = {
                VariableName: "dataset",
                Columns: []
            };
            if (projections && selects && !_.isEmpty(selects)) {
                var scriptInputColumnNames = [], scriptInputColumns = [];
                for (var role in projections) for (var _i = 0, _a = projections[role].all(); _i < _a.length; _i++) {
                    var projection = _a[_i], select = selects.withName(projection.queryRef);
                    if (select) {
                        var scriptInputColumn = {
                            QueryName: select.name,
                            Name: select.expr.accept(new ScriptInputColumnNameVisitor(schema))
                        };
                        scriptInputColumns.push(scriptInputColumn), scriptInputColumnNames.push(scriptInputColumn.Name);
                    }
                }
                scriptInputColumnNames = StringExtensions.ensureUniqueNames(scriptInputColumnNames);
                for (var i = 0; i < scriptInputColumnNames.length; i++) {
                    var scriptInputColumn = scriptInputColumns[i];
                    scriptInputColumn.Name = scriptInputColumnNames[i];
                }
                scriptInput.Columns = scriptInputColumns;
            }
            return scriptInput;
        }
        ScriptResultUtil.findScriptResult = findScriptResult, ScriptResultUtil.extractScriptResult = extractScriptResult, 
        ScriptResultUtil.extractScriptResultFromVisualConfig = extractScriptResultFromVisualConfig, 
        ScriptResultUtil.getScriptInput = getScriptInput;
        var ScriptInputColumnNameVisitor = function(_super) {
            function ScriptInputColumnNameVisitor(federatedSchema) {
                _super.call(this), this.federatedSchema = federatedSchema;
            }
            return __extends(ScriptInputColumnNameVisitor, _super), ScriptInputColumnNameVisitor.prototype.visitEntity = function(expr) {
                return expr.entity;
            }, ScriptInputColumnNameVisitor.prototype.visitColumnRef = function(expr) {
                return ScriptInputColumnNameVisitor.getNameForProperty(expr, this.federatedSchema);
            }, ScriptInputColumnNameVisitor.prototype.visitMeasureRef = function(expr) {
                return ScriptInputColumnNameVisitor.getNameForProperty(expr, this.federatedSchema);
            }, ScriptInputColumnNameVisitor.prototype.visitAggr = function(expr) {
                return ScriptInputColumnNameVisitor.getNameForAggregate(expr, this.federatedSchema);
            }, ScriptInputColumnNameVisitor.prototype.visitHierarchy = function(expr) {
                return ScriptInputColumnNameVisitor.getNameForHierarchy(expr, this.federatedSchema);
            }, ScriptInputColumnNameVisitor.prototype.visitHierarchyLevel = function(expr) {
                return ScriptInputColumnNameVisitor.getNameForHierarchyLevel(expr, this.federatedSchema);
            }, ScriptInputColumnNameVisitor.getNameForProperty = function(expr, federatedSchema) {
                var fieldExpr = SQExprConverter.asFieldPattern(expr), fieldExprItem = fieldExpr.column || fieldExpr.measure, schema = federatedSchema.schema(fieldExprItem.schema), property = schema.findProperty(fieldExprItem.entity, fieldExprItem.name);
                return property ? property.name : void 0;
            }, ScriptInputColumnNameVisitor.getNameForAggregate = function(expr, federatedSchema) {
                var field = SQExprConverter.asFieldPattern(expr), fieldAggregate = field.columnAggr || field.entityAggr, entity = federatedSchema.schema(fieldAggregate.schema).entities.withName(fieldAggregate.entity);
                if (entity) {
                    var backingProperty = entity.properties.withName(FieldExprPattern.getFieldExprName(field));
                    return backingProperty.name;
                }
            }, ScriptInputColumnNameVisitor.getNameForHierarchy = function(expr, federatedScheam) {
                var fieldExpr = SQExprConverter.asFieldPattern(expr), fieldExprItem = fieldExpr.hierarchy;
                if (fieldExprItem) {
                    var schema = federatedScheam.schema(fieldExprItem.schema), hierarchy = schema.findHierarchy(fieldExprItem.entity, fieldExprItem.name);
                    if (hierarchy) return hierarchy.name;
                }
            }, ScriptInputColumnNameVisitor.getNameForHierarchyLevel = function(expr, federatedScheam) {
                var field = SQExprConverter.asFieldPattern(expr);
                return field.columnHierarchyLevelVariation ? ScriptInputColumnNameVisitor.getVariationLevelName(expr, federatedScheam) : void 0;
            }, ScriptInputColumnNameVisitor.getVariationLevelName = function(expr, federatedSchema) {
                var field = SQExprConverter.asFieldPattern(expr), fieldEntity = FieldExprPattern.toFieldExprEntityItemPattern(field);
                if (field.columnHierarchyLevelVariation) {
                    var prop = federatedSchema.schema(fieldEntity.schema).findProperty(fieldEntity.entity, field.columnHierarchyLevelVariation.source.name);
                    if (!prop) return;
                    for (var variations = prop.column.variations, _i = 0; _i < variations.length; _i++) {
                        var variation = variations[_i];
                        if (variation.name === field.columnHierarchyLevelVariation.variationName) for (var _a = 0, _b = variation.defaultHierarchy.levels; _a < _b.length; _a++) {
                            var level = _b[_a];
                            if (level.name === field.columnHierarchyLevelVariation.level.level) return level.column.name;
                        }
                    }
                }
            }, ScriptInputColumnNameVisitor;
        }(DefaultSQExprVisitor);
    }(ScriptResultUtil = powerbi.ScriptResultUtil || (powerbi.ScriptResultUtil = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var segmentation;
        !function(segmentation) {
            var DataViewMerger;
            !function(DataViewMerger) {
                function mergeDataViews(source, segment) {
                    !powerbi.DataViewAnalysis.isMetadataEquivalent(source.metadata, segment.metadata), 
                    segment.metadata.segment || delete source.metadata.segment, source.table && segment.table && mergeTables(source.table, segment.table), 
                    source.categorical && segment.categorical && mergeCategorical(source.categorical, segment.categorical), 
                    source.tree && segment.tree && mergeTreeNodes(source.tree.root, segment.tree.root, !0), 
                    source.matrix && segment.matrix && mergeTreeNodes(source.matrix.rows.root, segment.matrix.rows.root, !1);
                }
                function mergeTables(source, segment) {
                    0 !== segment.rows.length && merge(source.rows, segment.rows, segment.lastMergeIndex + 1);
                }
                function mergeCategorical(source, segment) {
                    if (source.categories && segment.categories) for (var segmentCategoriesLength = segment.categories.length, categoryIndex = 0; segmentCategoriesLength > categoryIndex; categoryIndex++) {
                        var segmentCategory = segment.categories[categoryIndex], sourceCategory = source.categories[categoryIndex];
                        !sourceCategory.values && segmentCategory.values && (sourceCategory.values = []), 
                        segmentCategory.values && merge(sourceCategory.values, segmentCategory.values, segment.lastMergeIndex + 1), 
                        !sourceCategory.identity && segmentCategory.identity && (sourceCategory.identity = []), 
                        segmentCategory.identity && merge(sourceCategory.identity, segmentCategory.identity, segment.lastMergeIndex + 1);
                    }
                    if (source.values && segment.values) for (var segmentValuesLength = segment.values.length, valueIndex = 0; segmentValuesLength > valueIndex; valueIndex++) {
                        var segmentValue = segment.values[valueIndex], sourceValue = source.values[valueIndex];
                        !sourceValue.values && segmentValue.values && (sourceValue.values = []), segmentValue.values && merge(sourceValue.values, segmentValue.values, segment.lastMergeIndex + 1), 
                        segmentValue.highlights && merge(sourceValue.highlights, segmentValue.highlights, segment.lastMergeIndex + 1);
                    }
                }
                function merge(source, segment, index) {
                    if (index >= segment.length) return segment;
                    var result = [];
                    return void 0 !== index && (result = segment.splice(0, index)), Array.prototype.push.apply(source, segment), 
                    result;
                }
                function mergeTreeNodes(sourceRoot, segmentRoot, allowDifferentStructure) {
                    if (segmentRoot.children && 0 !== segmentRoot.children.length) {
                        if (allowDifferentStructure && (!sourceRoot.children || 0 === sourceRoot.children.length)) return void (sourceRoot.children = segmentRoot.children);
                        var firstAppendIndex = findFirstAppendIndex(segmentRoot.children), lastSourceChild = sourceRoot.children[sourceRoot.children.length - 1], mergedChildren = merge(sourceRoot.children, segmentRoot.children, firstAppendIndex);
                        mergedChildren.length > 0 && mergeTreeNodes(lastSourceChild, mergedChildren[mergedChildren.length - 1], allowDifferentStructure);
                    }
                }
                function findFirstAppendIndex(children) {
                    if (0 === children.length) return 0;
                    for (var i = 0; i < children.length; i++) {
                        var childSegment = children[i];
                        if (!childSegment.isMerge) break;
                    }
                    return i;
                }
                DataViewMerger.mergeDataViews = mergeDataViews, DataViewMerger.mergeTables = mergeTables, 
                DataViewMerger.mergeCategorical = mergeCategorical, DataViewMerger.mergeTreeNodes = mergeTreeNodes;
            }(DataViewMerger = segmentation.DataViewMerger || (segmentation.DataViewMerger = {}));
        }(segmentation = data.segmentation || (data.segmentation = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var ArrayExtensions = jsCommon.ArrayExtensions, SQExprRewriter = function() {
            function SQExprRewriter() {}
            return SQExprRewriter.prototype.visitColumnRef = function(expr) {
                var origArg = expr.source, rewrittenArg = origArg.accept(this);
                return origArg === rewrittenArg ? expr : new data.SQColumnRefExpr(rewrittenArg, expr.ref);
            }, SQExprRewriter.prototype.visitMeasureRef = function(expr) {
                var origArg = expr.source, rewrittenArg = origArg.accept(this);
                return origArg === rewrittenArg ? expr : new data.SQMeasureRefExpr(rewrittenArg, expr.ref);
            }, SQExprRewriter.prototype.visitAggr = function(expr) {
                var origArg = expr.arg, rewrittenArg = origArg.accept(this);
                return origArg === rewrittenArg ? expr : new data.SQAggregationExpr(rewrittenArg, expr.func);
            }, SQExprRewriter.prototype.visitHierarchy = function(expr) {
                var origArg = expr.arg, rewrittenArg = origArg.accept(this);
                return origArg === rewrittenArg ? expr : new data.SQHierarchyExpr(rewrittenArg, expr.hierarchy);
            }, SQExprRewriter.prototype.visitHierarchyLevel = function(expr) {
                var origArg = expr.arg, rewrittenArg = origArg.accept(this);
                return origArg === rewrittenArg ? expr : new data.SQHierarchyLevelExpr(rewrittenArg, expr.level);
            }, SQExprRewriter.prototype.visitPropertyVariationSource = function(expr) {
                var origArg = expr.arg, rewrittenArg = origArg.accept(this);
                return origArg === rewrittenArg ? expr : new data.SQPropertyVariationSourceExpr(rewrittenArg, expr.name, expr.property);
            }, SQExprRewriter.prototype.visitEntity = function(expr) {
                return expr;
            }, SQExprRewriter.prototype.visitAnd = function(orig) {
                var origLeft = orig.left, rewrittenLeft = origLeft.accept(this), origRight = orig.right, rewrittenRight = origRight.accept(this);
                return origLeft === rewrittenLeft && origRight === rewrittenRight ? orig : new data.SQAndExpr(rewrittenLeft, rewrittenRight);
            }, SQExprRewriter.prototype.visitBetween = function(orig) {
                var origArg = orig.arg, rewrittenArg = origArg.accept(this), origLower = orig.lower, rewrittenLower = origLower.accept(this), origUpper = orig.upper, rewrittenUpper = origUpper.accept(this);
                return origArg === rewrittenArg && origLower === rewrittenLower && origUpper === rewrittenUpper ? orig : new data.SQBetweenExpr(rewrittenArg, rewrittenLower, rewrittenUpper);
            }, SQExprRewriter.prototype.visitIn = function(orig) {
                for (var rewrittenValues, origArgs = orig.args, rewrittenArgs = this.rewriteAll(origArgs), origValues = orig.values, i = 0, len = origValues.length; len > i; i++) {
                    var origValueTuple = origValues[i], rewrittenValueTuple = this.rewriteAll(origValueTuple);
                    origValueTuple === rewrittenValueTuple || rewrittenValues || (rewrittenValues = ArrayExtensions.take(origValues, i)), 
                    rewrittenValues && rewrittenValues.push(rewrittenValueTuple);
                }
                return origArgs !== rewrittenArgs || rewrittenValues ? new data.SQInExpr(rewrittenArgs, rewrittenValues || origValues) : orig;
            }, SQExprRewriter.prototype.rewriteAll = function(origExprs) {
                for (var rewrittenResult, i = 0, len = origExprs.length; len > i; i++) {
                    var origExpr = origExprs[i], rewrittenExpr = origExpr.accept(this);
                    origExpr === rewrittenExpr || rewrittenResult || (rewrittenResult = ArrayExtensions.take(origExprs, i)), 
                    rewrittenResult && rewrittenResult.push(rewrittenExpr);
                }
                return rewrittenResult || origExprs;
            }, SQExprRewriter.prototype.visitOr = function(orig) {
                var origLeft = orig.left, rewrittenLeft = origLeft.accept(this), origRight = orig.right, rewrittenRight = origRight.accept(this);
                return origLeft === rewrittenLeft && origRight === rewrittenRight ? orig : new data.SQOrExpr(rewrittenLeft, rewrittenRight);
            }, SQExprRewriter.prototype.visitCompare = function(orig) {
                var origLeft = orig.left, rewrittenLeft = origLeft.accept(this), origRight = orig.right, rewrittenRight = origRight.accept(this);
                return origLeft === rewrittenLeft && origRight === rewrittenRight ? orig : new data.SQCompareExpr(orig.comparison, rewrittenLeft, rewrittenRight);
            }, SQExprRewriter.prototype.visitContains = function(orig) {
                var origLeft = orig.left, rewrittenLeft = origLeft.accept(this), origRight = orig.right, rewrittenRight = origRight.accept(this);
                return origLeft === rewrittenLeft && origRight === rewrittenRight ? orig : new data.SQContainsExpr(rewrittenLeft, rewrittenRight);
            }, SQExprRewriter.prototype.visitExists = function(orig) {
                var origArg = orig.arg, rewrittenArg = origArg.accept(this);
                return origArg === rewrittenArg ? orig : new data.SQExistsExpr(rewrittenArg);
            }, SQExprRewriter.prototype.visitNot = function(orig) {
                var origArg = orig.arg, rewrittenArg = origArg.accept(this);
                return origArg === rewrittenArg ? orig : new data.SQNotExpr(rewrittenArg);
            }, SQExprRewriter.prototype.visitStartsWith = function(orig) {
                var origLeft = orig.left, rewrittenLeft = origLeft.accept(this), origRight = orig.right, rewrittenRight = origRight.accept(this);
                return origLeft === rewrittenLeft && origRight === rewrittenRight ? orig : new data.SQStartsWithExpr(rewrittenLeft, rewrittenRight);
            }, SQExprRewriter.prototype.visitConstant = function(expr) {
                return expr;
            }, SQExprRewriter.prototype.visitDateSpan = function(orig) {
                var origArg = orig.arg, rewrittenArg = origArg.accept(this);
                return origArg === rewrittenArg ? orig : new data.SQDateSpanExpr(orig.unit, rewrittenArg);
            }, SQExprRewriter.prototype.visitDateAdd = function(orig) {
                var origArg = orig.arg, rewrittenArg = origArg.accept(this);
                return origArg === rewrittenArg ? orig : new data.SQDateAddExpr(orig.unit, orig.amount, rewrittenArg);
            }, SQExprRewriter.prototype.visitNow = function(orig) {
                return orig;
            }, SQExprRewriter.prototype.visitDefaultValue = function(orig) {
                return orig;
            }, SQExprRewriter.prototype.visitAnyValue = function(orig) {
                return orig;
            }, SQExprRewriter;
        }();
        data.SQExprRewriter = SQExprRewriter;
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var EqualsToInRewriter;
        !function(EqualsToInRewriter) {
            function run(expr) {
                return expr.accept(new Rewriter());
            }
            EqualsToInRewriter.run = run;
            var Rewriter = function(_super) {
                function Rewriter() {
                    _super.call(this);
                }
                return __extends(Rewriter, _super), Rewriter.prototype.visitCompare = function(expr) {
                    if (expr.comparison !== data.QueryComparisonKind.Equal) return this.visitUnsupported(expr);
                    if (!this.isSupported(expr.left) || !this.isSupported(expr.right)) return this.visitUnsupported(expr);
                    var leftIsComparand = this.isComparand(expr.left), rightIsComparand = this.isComparand(expr.right);
                    if (leftIsComparand === rightIsComparand) return this.visitUnsupported(expr);
                    var operand = leftIsComparand ? expr.left : expr.right, value = leftIsComparand ? expr.right : expr.left, current = this.current;
                    return current ? (current.add(operand, value), expr) : data.SQExprBuilder.inExpr([ operand ], [ [ value ] ]);
                }, Rewriter.prototype.visitOr = function(expr) {
                    if (!this.isSupported(expr.left) || !this.isSupported(expr.right)) return this.visitUnsupported(expr);
                    var current;
                    return this.current || (current = this.current = new InBuilder()), expr.left.accept(this), 
                    expr.right.accept(this), current ? (this.current = null, current.complete() || expr) : expr;
                }, Rewriter.prototype.visitAnd = function(expr) {
                    if (!this.isSupported(expr.left) || !this.isSupported(expr.right)) return this.visitUnsupported(expr);
                    var current = this.current;
                    return current ? (current.cancel(), expr) : _super.prototype.visitAnd.call(this, expr);
                }, Rewriter.prototype.visitUnsupported = function(expr) {
                    var current = this.current;
                    return current && current.cancel(), expr;
                }, Rewriter.prototype.isSupported = function(expr) {
                    return expr instanceof data.SQCompareExpr || expr instanceof data.SQColumnRefExpr || expr instanceof data.SQConstantExpr || expr instanceof data.SQHierarchyLevelExpr || expr instanceof data.SQOrExpr || expr instanceof data.SQAndExpr;
                }, Rewriter.prototype.isComparand = function(expr) {
                    return expr instanceof data.SQColumnRefExpr || expr instanceof data.SQHierarchyLevelExpr;
                }, Rewriter;
            }(data.SQExprRewriter), InBuilder = function() {
                function InBuilder() {}
                return InBuilder.prototype.add = function(operand, value) {
                    if (!this.cancelled) {
                        if (this.operand && !data.SQExpr.equals(operand, this.operand)) return void this.cancel();
                        this.operand = operand;
                        var values = this.values;
                        values || (values = this.values = []), values.push(value);
                    }
                }, InBuilder.prototype.cancel = function() {
                    this.cancelled = !0;
                }, InBuilder.prototype.complete = function() {
                    return !this.cancelled && this.operand ? data.SQExprBuilder.inExpr([ this.operand ], _.map(this.values, function(v) {
                        return [ v ];
                    })) : void 0;
                }, InBuilder;
            }();
        }(EqualsToInRewriter = data.EqualsToInRewriter || (data.EqualsToInRewriter = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var SQExprConverter;
        !function(SQExprConverter) {
            function asScopeIdsContainer(filter, fieldSQExprs) {
                var filterItems = filter.conditions(), filterItem = filterItems[0];
                if (filterItem) {
                    var visitor = new FilterScopeIdsCollectorVisitor(fieldSQExprs);
                    if (filterItem.accept(visitor)) return visitor.getResult();
                }
            }
            function getFirstComparandValue(identity) {
                var comparandExpr = identity.expr.accept(new FindComparandVisitor());
                return comparandExpr ? comparandExpr.value : void 0;
            }
            SQExprConverter.asScopeIdsContainer = asScopeIdsContainer, SQExprConverter.getFirstComparandValue = getFirstComparandValue;
        }(SQExprConverter = data.SQExprConverter || (data.SQExprConverter = {}));
        var FilterScopeIdsCollectorVisitor = function(_super) {
            function FilterScopeIdsCollectorVisitor(fieldSQExprs) {
                _super.call(this), this.isRoot = !0, this.isNot = !1, this.keyExprsCount = null, 
                this.valueExprs = [], this.fieldExprs = [];
                for (var _i = 0; _i < fieldSQExprs.length; _i++) {
                    var field = fieldSQExprs[_i];
                    this.fieldExprs.push(data.SQExprBuilder.removeEntityVariables(field));
                }
            }
            return __extends(FilterScopeIdsCollectorVisitor, _super), FilterScopeIdsCollectorVisitor.prototype.getResult = function() {
                for (var valueExprs = this.valueExprs, scopeIds = [], valueCount = this.keyExprsCount || 1, startIndex = 0, endIndex = valueCount, len = valueExprs.length; len > startIndex && len >= endIndex; ) {
                    var values = valueExprs.slice(startIndex, endIndex), scopeId = FilterScopeIdsCollectorVisitor.getScopeIdentity(this.fieldExprs, values);
                    jsCommon.ArrayExtensions.isInArray(scopeIds, scopeId, powerbi.DataViewScopeIdentity.equals) || scopeIds.push(scopeId), 
                    startIndex += valueCount, endIndex += valueCount;
                }
                return {
                    isNot: this.isNot,
                    scopeIds: scopeIds
                };
            }, FilterScopeIdsCollectorVisitor.getScopeIdentity = function(fieldExprs, valueExprs) {
                for (var compoundSQExpr, i = 0, len = fieldExprs.length; len > i; i++) {
                    var equalsExpr = data.SQExprBuilder.equal(fieldExprs[i], valueExprs[i]);
                    compoundSQExpr = compoundSQExpr ? data.SQExprBuilder.and(compoundSQExpr, equalsExpr) : equalsExpr;
                }
                return data.createDataViewScopeIdentity(compoundSQExpr);
            }, FilterScopeIdsCollectorVisitor.prototype.visitOr = function(expr) {
                return null !== this.keyExprsCount ? this.unsupportedSQExpr() : (this.isRoot = !1, 
                expr.left.accept(this) && expr.right.accept(this));
            }, FilterScopeIdsCollectorVisitor.prototype.visitNot = function(expr) {
                return this.isRoot ? (this.isNot = !0, expr.arg.accept(this)) : this.unsupportedSQExpr();
            }, FilterScopeIdsCollectorVisitor.prototype.visitConstant = function(expr) {
                return this.isRoot && expr.type.primitiveType === powerbi.PrimitiveType.Null ? this.unsupportedSQExpr() : (this.valueExprs.push(expr), 
                !0);
            }, FilterScopeIdsCollectorVisitor.prototype.visitCompare = function(expr) {
                return null !== this.keyExprsCount ? this.unsupportedSQExpr() : (this.isRoot = !1, 
                expr.comparison !== data.QueryComparisonKind.Equal ? this.unsupportedSQExpr() : expr.left.accept(this) && expr.right.accept(this));
            }, FilterScopeIdsCollectorVisitor.prototype.visitIn = function(expr) {
                this.keyExprsCount = 0;
                var result;
                this.isRoot = !1;
                for (var _i = 0, _a = expr.args; _i < _a.length; _i++) {
                    var arg = _a[_i];
                    if (result = arg.accept(this), !result) return this.unsupportedSQExpr();
                    this.keyExprsCount++;
                }
                if (this.keyExprsCount !== this.fieldExprs.length) return this.unsupportedSQExpr();
                for (var values = expr.values, _b = 0; _b < values.length; _b++) for (var valueTuple = values[_b], _c = (valueTuple.length, 
                0); _c < valueTuple.length; _c++) {
                    var value = valueTuple[_c];
                    if (result = value.accept(this), !result) return this.unsupportedSQExpr();
                }
                return result;
            }, FilterScopeIdsCollectorVisitor.prototype.visitColumnRef = function(expr) {
                if (this.isRoot) return this.unsupportedSQExpr();
                var fixedExpr = data.SQExprBuilder.removeEntityVariables(expr);
                return null !== this.keyExprsCount ? data.SQExpr.equals(this.fieldExprs[this.keyExprsCount], fixedExpr) : data.SQExpr.equals(this.fieldExprs[0], fixedExpr);
            }, FilterScopeIdsCollectorVisitor.prototype.visitDefaultValue = function(expr) {
                return this.isRoot || null !== this.keyExprsCount ? this.unsupportedSQExpr() : (this.valueExprs.push(expr), 
                !0);
            }, FilterScopeIdsCollectorVisitor.prototype.visitAnyValue = function(expr) {
                return this.isRoot || null !== this.keyExprsCount ? this.unsupportedSQExpr() : (this.valueExprs.push(expr), 
                !0);
            }, FilterScopeIdsCollectorVisitor.prototype.visitDefault = function(expr) {
                return this.unsupportedSQExpr();
            }, FilterScopeIdsCollectorVisitor.prototype.unsupportedSQExpr = function() {
                return !1;
            }, FilterScopeIdsCollectorVisitor;
        }(data.DefaultSQExprVisitor), FindComparandVisitor = function(_super) {
            function FindComparandVisitor() {
                _super.apply(this, arguments);
            }
            return __extends(FindComparandVisitor, _super), FindComparandVisitor.prototype.visitAnd = function(expr) {
                return expr.left.accept(this) || expr.right.accept(this);
            }, FindComparandVisitor.prototype.visitCompare = function(expr) {
                if (expr.comparison === data.QueryComparisonKind.Equal) {
                    if (expr.right instanceof data.SQConstantExpr) return expr.right;
                    if (expr.left instanceof data.SQConstantExpr) return expr.left;
                }
            }, FindComparandVisitor;
        }(data.DefaultSQExprVisitor);
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var ScopeIdentityExtractor, ArrayExtensions = jsCommon.ArrayExtensions;
        !function(ScopeIdentityExtractor) {
            function getKeys(expr) {
                var extractor = new ScopeIdExtractorImpl();
                return expr.accept(extractor), extractor.malformed ? null : ArrayExtensions.emptyToNull(extractor.keys);
            }
            function getInExpr(expr) {
                var extractor = new ScopeIdExtractorImpl();
                if (expr.accept(extractor), !extractor.malformed) {
                    var keys = ArrayExtensions.emptyToNull(extractor.keys), keyValues = ArrayExtensions.emptyToNull(extractor.values);
                    return keys && keyValues ? data.SQExprBuilder.inExpr(keys, [ keyValues ]) : void 0;
                }
            }
            ScopeIdentityExtractor.getKeys = getKeys, ScopeIdentityExtractor.getInExpr = getInExpr;
            var ScopeIdExtractorImpl = function(_super) {
                function ScopeIdExtractorImpl() {
                    _super.apply(this, arguments), this.keys = [], this.values = [];
                }
                return __extends(ScopeIdExtractorImpl, _super), ScopeIdExtractorImpl.prototype.visitAnd = function(expr) {
                    expr.left.accept(this), expr.right.accept(this);
                }, ScopeIdExtractorImpl.prototype.visitCompare = function(expr) {
                    return expr.comparison !== data.QueryComparisonKind.Equal ? void this.visitDefault(expr) : (expr.left.accept(this), 
                    void expr.right.accept(this));
                }, ScopeIdExtractorImpl.prototype.visitColumnRef = function(expr) {
                    this.keys.push(expr);
                }, ScopeIdExtractorImpl.prototype.visitHierarchyLevel = function(expr) {
                    this.keys.push(expr);
                }, ScopeIdExtractorImpl.prototype.visitConstant = function(expr) {
                    this.values.push(expr);
                }, ScopeIdExtractorImpl.prototype.visitDefault = function(expr) {
                    this.malformed = !0;
                }, ScopeIdExtractorImpl;
            }(data.DefaultSQExprVisitor);
        }(ScopeIdentityExtractor = data.ScopeIdentityExtractor || (data.ScopeIdentityExtractor = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var PrimitiveValueEncoding;
        !function(PrimitiveValueEncoding) {
            function decimal(value) {
                return value + "M";
            }
            function double(value) {
                return value + "D";
            }
            function integer(value) {
                return value + "L";
            }
            function dateTime(value) {
                var date = new Date(value.getTime() - 6e4 * value.getTimezoneOffset()), dateTimeString = date.toISOString();
                return jsCommon.StringExtensions.endsWith(dateTimeString, "Z") && (dateTimeString = dateTimeString.substr(0, dateTimeString.length - 1)), 
                "datetime'" + dateTimeString + "'";
            }
            function text(value) {
                return "'" + value.replace(SingleQuoteRegex, "''") + "'";
            }
            function nullEncoding() {
                return "null";
            }
            function boolean(value) {
                return value ? "true" : "false";
            }
            var SingleQuoteRegex = /'/g;
            PrimitiveValueEncoding.decimal = decimal, PrimitiveValueEncoding["double"] = double, 
            PrimitiveValueEncoding.integer = integer, PrimitiveValueEncoding.dateTime = dateTime, 
            PrimitiveValueEncoding.text = text, PrimitiveValueEncoding.nullEncoding = nullEncoding, 
            PrimitiveValueEncoding["boolean"] = boolean;
        }(PrimitiveValueEncoding = data.PrimitiveValueEncoding || (data.PrimitiveValueEncoding = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var SQHierarchyExprUtils;
        !function(SQHierarchyExprUtils) {
            function getConceptualHierarchyLevelFromExpr(conceptualSchema, fieldExpr) {
                var fieldExprItem = data.FieldExprPattern.toFieldExprEntityItemPattern(fieldExpr), hierarchyLevel = fieldExpr.hierarchyLevel || fieldExpr.hierarchyLevelAggr;
                return hierarchyLevel ? SQHierarchyExprUtils.getConceptualHierarchyLevel(conceptualSchema, fieldExprItem.schema, fieldExprItem.entity, hierarchyLevel.name, hierarchyLevel.level) : void 0;
            }
            function getConceptualHierarchyLevel(conceptualSchema, schemaName, entity, hierarchy, hierarchyLevel) {
                var schema = conceptualSchema.schema(schemaName), conceptualHierarchy = schema.findHierarchy(entity, hierarchy);
                return conceptualHierarchy ? conceptualHierarchy.levels.withName(hierarchyLevel) : void 0;
            }
            function getConceptualHierarchy(sqExpr, federatedSchema) {
                if (sqExpr instanceof data.SQHierarchyExpr) {
                    var hierarchy = sqExpr;
                    if (sqExpr.arg instanceof data.SQEntityExpr) {
                        var entityExpr = sqExpr.arg;
                        return federatedSchema.schema(entityExpr.schema).findHierarchy(entityExpr.entity, hierarchy.hierarchy);
                    }
                    if (sqExpr.arg instanceof data.SQPropertyVariationSourceExpr) {
                        var variationExpr = sqExpr.arg, sourceEntityExpr = variationExpr.arg;
                        return federatedSchema.schema(sourceEntityExpr.schema).findHierarchyByVariation(sourceEntityExpr.entity, variationExpr.property, variationExpr.name, hierarchy.hierarchy);
                    }
                }
            }
            function expandExpr(schema, expr, suppressHierarchyLevelExpansion) {
                return SQExprHierarchyToHierarchyLevelConverter.convert(expr, schema) || SQExprVariationConverter.expand(expr, schema) || !suppressHierarchyLevelExpansion && SQExprHierarchyLevelConverter.expand(expr, schema) || expr;
            }
            function isHierarchyOrVariation(schema, expr) {
                if (expr instanceof data.SQHierarchyExpr || expr instanceof data.SQHierarchyLevelExpr) return !0;
                var conceptualProperty = expr.getConceptualProperty(schema);
                if (conceptualProperty) {
                    var column = conceptualProperty.column;
                    if (column && column.variations && column.variations.length > 0) return !0;
                }
                return !1;
            }
            function getSourceVariationExpr(hierarchyLevelExpr) {
                var fieldExprPattern = data.SQExprConverter.asFieldPattern(hierarchyLevelExpr);
                if (fieldExprPattern.columnHierarchyLevelVariation) {
                    var entity = data.SQExprBuilder.entity(fieldExprPattern.columnHierarchyLevelVariation.source.schema, fieldExprPattern.columnHierarchyLevelVariation.source.entity);
                    return data.SQExprBuilder.columnRef(entity, fieldExprPattern.columnHierarchyLevelVariation.source.name);
                }
            }
            function getSourceHierarchy(hierarchyLevelExpr) {
                var fieldExprPattern = data.SQExprConverter.asFieldPattern(hierarchyLevelExpr), hierarchyLevel = fieldExprPattern.hierarchyLevel;
                if (hierarchyLevel) {
                    var entity = data.SQExprBuilder.entity(hierarchyLevel.schema, hierarchyLevel.entity, hierarchyLevel.entityVar);
                    return data.SQExprBuilder.hierarchy(entity, hierarchyLevel.name);
                }
            }
            function getHierarchySourceAsVariationSource(hierarchyLevelExpr) {
                if (hierarchyLevelExpr.arg instanceof data.SQHierarchyExpr) {
                    var hierarchyRef = hierarchyLevelExpr.arg;
                    return hierarchyRef.arg instanceof data.SQPropertyVariationSourceExpr ? hierarchyRef.arg : void 0;
                }
            }
            function areHierarchyLevelsOrdered(allLevels, firstExpr, secondExpr) {
                if (!(firstExpr instanceof data.SQHierarchyLevelExpr && secondExpr instanceof data.SQHierarchyLevelExpr)) return !1;
                var firstLevel = firstExpr, secondLevel = secondExpr;
                if (!data.SQExpr.equals(firstLevel.arg, secondLevel.arg)) return !1;
                var firstIndex = data.SQExprUtils.indexOfExpr(allLevels, firstLevel), secondIndex = data.SQExprUtils.indexOfExpr(allLevels, secondLevel);
                return -1 !== firstIndex && -1 !== secondIndex && secondIndex > firstIndex;
            }
            function getInsertionIndex(allLevels, orderedSubsetOfLevels, expr) {
                for (var insertIndex = 0; insertIndex < orderedSubsetOfLevels.length && areHierarchyLevelsOrdered(allLevels, orderedSubsetOfLevels[insertIndex], expr); ) insertIndex++;
                return insertIndex;
            }
            SQHierarchyExprUtils.getConceptualHierarchyLevelFromExpr = getConceptualHierarchyLevelFromExpr, 
            SQHierarchyExprUtils.getConceptualHierarchyLevel = getConceptualHierarchyLevel, 
            SQHierarchyExprUtils.getConceptualHierarchy = getConceptualHierarchy, SQHierarchyExprUtils.expandExpr = expandExpr, 
            SQHierarchyExprUtils.isHierarchyOrVariation = isHierarchyOrVariation, SQHierarchyExprUtils.getSourceVariationExpr = getSourceVariationExpr, 
            SQHierarchyExprUtils.getSourceHierarchy = getSourceHierarchy, SQHierarchyExprUtils.getHierarchySourceAsVariationSource = getHierarchySourceAsVariationSource, 
            SQHierarchyExprUtils.areHierarchyLevelsOrdered = areHierarchyLevelsOrdered, SQHierarchyExprUtils.getInsertionIndex = getInsertionIndex;
        }(SQHierarchyExprUtils = data.SQHierarchyExprUtils || (data.SQHierarchyExprUtils = {}));
        var SQExprHierarchyToHierarchyLevelConverter;
        !function(SQExprHierarchyToHierarchyLevelConverter) {
            function convert(sqExpr, federatedSchema) {
                if (sqExpr instanceof data.SQHierarchyExpr) {
                    var hierarchyExpr = sqExpr, conceptualHierarchy = SQHierarchyExprUtils.getConceptualHierarchy(hierarchyExpr, federatedSchema);
                    if (conceptualHierarchy) return _.map(conceptualHierarchy.levels, function(hierarchyLevel) {
                        return data.SQExprBuilder.hierarchyLevel(sqExpr, hierarchyLevel.name);
                    });
                }
            }
            SQExprHierarchyToHierarchyLevelConverter.convert = convert;
        }(SQExprHierarchyToHierarchyLevelConverter = data.SQExprHierarchyToHierarchyLevelConverter || (data.SQExprHierarchyToHierarchyLevelConverter = {}));
        var SQExprHierarchyLevelConverter;
        !function(SQExprHierarchyLevelConverter) {
            function expand(expr, schema) {
                var exprs = [];
                if (expr instanceof data.SQHierarchyLevelExpr) {
                    var fieldExpr = data.SQExprConverter.asFieldPattern(expr);
                    if (fieldExpr.hierarchyLevel) {
                        var fieldExprItem = data.FieldExprPattern.toFieldExprEntityItemPattern(fieldExpr), hierarchy = schema.schema(fieldExprItem.schema).findHierarchy(fieldExprItem.entity, fieldExpr.hierarchyLevel.name);
                        if (hierarchy) for (var hierarchyLevels = hierarchy.levels, _i = 0; _i < hierarchyLevels.length; _i++) {
                            var hierarchyLevel = hierarchyLevels[_i];
                            if (hierarchyLevel.name === fieldExpr.hierarchyLevel.level) {
                                exprs.push(expr);
                                break;
                            }
                            exprs.push(data.SQExprBuilder.hierarchyLevel(data.SQExprBuilder.hierarchy(data.SQExprBuilder.entity(fieldExprItem.schema, fieldExprItem.entity, fieldExprItem.entityVar), hierarchy.name), hierarchyLevel.name));
                        }
                    }
                }
                return _.isEmpty(exprs) ? void 0 : exprs;
            }
            SQExprHierarchyLevelConverter.expand = expand;
        }(SQExprHierarchyLevelConverter || (SQExprHierarchyLevelConverter = {}));
        var SQExprVariationConverter;
        !function(SQExprVariationConverter) {
            function expand(expr, schema) {
                var exprs, conceptualProperty = expr.getConceptualProperty(schema);
                if (conceptualProperty) {
                    var column = conceptualProperty.column;
                    if (column && column.variations && column.variations.length > 0) {
                        var variations = column.variations, variation = variations[0], fieldExpr = data.SQExprConverter.asFieldPattern(expr), fieldExprItem = data.FieldExprPattern.toFieldExprEntityItemPattern(fieldExpr);
                        if (exprs = [], variation.defaultHierarchy) for (var hierarchyExpr = data.SQExprBuilder.hierarchy(data.SQExprBuilder.propertyVariationSource(data.SQExprBuilder.entity(fieldExprItem.schema, fieldExprItem.entity, fieldExprItem.entityVar), variation.name, conceptualProperty.name), variation.defaultHierarchy.name), _i = 0, _a = variation.defaultHierarchy.levels; _i < _a.length; _i++) {
                            var level = _a[_i];
                            exprs.push(data.SQExprBuilder.hierarchyLevel(hierarchyExpr, level.name));
                        }
                    }
                }
                return exprs;
            }
            SQExprVariationConverter.expand = expand;
        }(SQExprVariationConverter || (SQExprVariationConverter = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var SQExprGroupUtils;
        !function(SQExprGroupUtils) {
            function groupExprs(schema, exprs) {
                for (var groups = [], i = 0, len = exprs.length; len > i; i++) {
                    var expr = exprs[i];
                    expr instanceof data.SQHierarchyLevelExpr ? addChildToGroup(schema, groups, expr, i) : groups.push({
                        expr: expr,
                        children: null,
                        selectQueryIndex: i
                    });
                }
                return groups;
            }
            function addChildToGroup(schema, groups, expr, selectQueryIndex) {
                var shouldAddExpressionToNewGroup = !0, exprSource = data.SQHierarchyExprUtils.getSourceVariationExpr(expr) || data.SQHierarchyExprUtils.getSourceHierarchy(expr), lastGroup = _.last(groups);
                if (lastGroup && lastGroup.children && data.SQExpr.equals(lastGroup.expr, exprSource)) {
                    var expandedExpr = data.SQHierarchyExprUtils.expandExpr(schema, expr.arg);
                    if (expandedExpr instanceof Array) {
                        var allHierarchyLevels = expandedExpr;
                        shouldAddExpressionToNewGroup = !data.SQHierarchyExprUtils.areHierarchyLevelsOrdered(allHierarchyLevels, _.last(lastGroup.children), expr);
                    }
                }
                shouldAddExpressionToNewGroup ? groups.push({
                    expr: exprSource,
                    children: [ expr ],
                    selectQueryIndex: selectQueryIndex
                }) : lastGroup.children.push(expr);
            }
            SQExprGroupUtils.groupExprs = groupExprs;
        }(SQExprGroupUtils = data.SQExprGroupUtils || (data.SQExprGroupUtils = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        function defaultAggregateForDataType(type) {
            return type.integer || type.numeric ? data.QueryAggregateFunction.Sum : data.QueryAggregateFunction.Count;
        }
        function defaultAggregateToQueryAggregateFunction(aggregate) {
            switch (aggregate) {
              case 6:
                return data.QueryAggregateFunction.Avg;

              case 3:
                return data.QueryAggregateFunction.CountNonNull;

              case 7:
                return data.QueryAggregateFunction.Count;

              case 5:
                return data.QueryAggregateFunction.Max;

              case 4:
                return data.QueryAggregateFunction.Min;

              case 2:
                return data.QueryAggregateFunction.Sum;

              default:
                return;
            }
        }
        var StringExtensions = jsCommon.StringExtensions, SQExpr = function() {
            function SQExpr(kind) {
                this._kind = kind;
            }
            return SQExpr.equals = function(x, y, ignoreCase) {
                return SQExprEqualityVisitor.run(x, y, ignoreCase);
            }, SQExpr.prototype.validate = function(schema, errors) {
                var validator = new SQExprValidationVisitor(schema, errors);
                return this.accept(validator), validator.errors;
            }, SQExpr.prototype.accept = function(visitor, arg) {}, Object.defineProperty(SQExpr.prototype, "kind", {
                get: function() {
                    return this._kind;
                },
                enumerable: !0,
                configurable: !0
            }), SQExpr.isColumn = function(expr) {
                return 1 === expr.kind;
            }, SQExpr.isConstant = function(expr) {
                return 16 === expr.kind;
            }, SQExpr.isEntity = function(expr) {
                return 0 === expr.kind;
            }, SQExpr.isHierarchy = function(expr) {
                return 5 === expr.kind;
            }, SQExpr.isHierarchyLevel = function(expr) {
                return 6 === expr.kind;
            }, SQExpr.prototype.getMetadata = function(federatedSchema) {
                var field = data.SQExprConverter.asFieldPattern(this);
                if (field) return field.column || field.columnAggr || field.measure ? this.getMetadataForProperty(field, federatedSchema) : field.hierarchyLevel || field.hierarchyLevelAggr ? this.getMetadataForHierarchyLevel(field, federatedSchema) : field.columnHierarchyLevelVariation ? this.getMetadataForVariation(field, federatedSchema) : SQExpr.getMetadataForEntity(field, federatedSchema);
            }, SQExpr.prototype.getDefaultAggregate = function(federatedSchema, forceAggregation) {
                void 0 === forceAggregation && (forceAggregation = !1);
                var property = this.getConceptualProperty(federatedSchema) || this.getHierarchyLevelConceptualProperty(federatedSchema);
                if (property) {
                    var aggregate;
                    if (property && 0 === property.kind) {
                        var propertyDefaultAggregate = property.column ? property.column.defaultAggregate : null;
                        (property.type.integer || property.type.numeric) && 1 !== propertyDefaultAggregate && (aggregate = defaultAggregateToQueryAggregateFunction(propertyDefaultAggregate), 
                        void 0 === aggregate && (aggregate = defaultAggregateForDataType(property.type))), 
                        void 0 === aggregate && forceAggregation && (aggregate = data.QueryAggregateFunction.CountNonNull);
                    }
                    return aggregate;
                }
            }, SQExpr.prototype.getKeyColumns = function(schema) {
                var columnRefExpr = SQExprColumnRefInfoVisitor.getColumnRefSQExpr(schema, this);
                if (columnRefExpr) {
                    var keySQExprs = [], keys = this.getPropertyKeys(schema);
                    if (keys && keys.length > 0) for (var i = 0, len = keys.length; len > i; i++) keySQExprs.push(SQExprBuilder.columnRef(columnRefExpr.source, keys[i].name)); else keySQExprs.push(columnRefExpr);
                    return keySQExprs;
                }
            }, SQExpr.prototype.hasGroupOnKeys = function(schema) {
                var columnRefExpr = SQExprColumnRefInfoVisitor.getColumnRefSQExpr(schema, this);
                if (columnRefExpr) {
                    var keys = this.getPropertyKeys(schema);
                    if (!keys || keys.length < 1) return !1;
                    if (keys.length > 1) return !0;
                    var keySqExpr = SQExprBuilder.columnRef(columnRefExpr.source, keys[0].name);
                    return !SQExpr.equals(keySqExpr, this);
                }
            }, SQExpr.prototype.getPropertyKeys = function(schema) {
                var property = this.getConceptualProperty(schema) || this.getHierarchyLevelConceptualProperty(schema);
                if (property) return property.column ? property.column.keys : void 0;
            }, SQExpr.prototype.getConceptualProperty = function(federatedSchema) {
                var field = data.SQExprConverter.asFieldPattern(this);
                if (field) {
                    var fieldExprItem = data.FieldExprPattern.toFieldExprEntityItemPattern(field), propertyName = data.FieldExprPattern.getPropertyName(field);
                    return propertyName ? federatedSchema.schema(fieldExprItem.schema).findProperty(fieldExprItem.entity, propertyName) : void 0;
                }
            }, SQExpr.prototype.getTargetEntityForVariation = function(federatedSchema, variationName) {
                var property = this.getConceptualProperty(federatedSchema);
                if (property && property.column && !_.isEmpty(property.column.variations)) for (var variations = property.column.variations, _i = 0; _i < variations.length; _i++) {
                    var variation = variations[_i];
                    if (variation.name === variationName) return variation.navigationProperty.targetEntity.name;
                }
            }, SQExpr.prototype.getHierarchyLevelConceptualProperty = function(federatedSchema) {
                var field = data.SQExprConverter.asFieldPattern(this);
                if (field) {
                    var fieldExprHierachyLevel = field.hierarchyLevel || field.hierarchyLevelAggr;
                    if (fieldExprHierachyLevel) {
                        var fieldExprEntity = data.FieldExprPattern.toFieldExprEntityItemPattern(field), hierarchy = federatedSchema.schema(fieldExprEntity.schema).findHierarchy(fieldExprEntity.entity, fieldExprHierachyLevel.name);
                        if (hierarchy) {
                            var hierarchyLevel = hierarchy.levels.withName(fieldExprHierachyLevel.level);
                            if (hierarchyLevel) return hierarchyLevel.column;
                        }
                    }
                }
            }, SQExpr.prototype.getMetadataForVariation = function(field, federatedSchema) {
                var columnHierarchyLevelVariation = field.columnHierarchyLevelVariation, fieldExprItem = data.FieldExprPattern.toFieldExprEntityItemPattern(field), sourceProperty = federatedSchema.schema(fieldExprItem.schema).findProperty(fieldExprItem.entity, columnHierarchyLevelVariation.source.name);
                if (sourceProperty && sourceProperty.column && sourceProperty.column.variations) for (var _i = 0, _a = sourceProperty.column.variations; _i < _a.length; _i++) {
                    var variation = _a[_i];
                    if (variation.defaultHierarchy && variation.defaultHierarchy.levels) for (var _b = 0, _c = variation.defaultHierarchy.levels; _b < _c.length; _b++) {
                        var level = _c[_b];
                        if (level.name === columnHierarchyLevelVariation.level.level) {
                            var property = level.column;
                            return {
                                kind: 1 === property.kind ? 1 : 0,
                                type: property.type,
                                format: property.format,
                                idOnEntityKey: property.column ? property.column.idOnEntityKey : !1,
                                defaultAggregate: property.column ? property.column.defaultAggregate : null
                            };
                        }
                    }
                }
            }, SQExpr.prototype.getMetadataForHierarchyLevel = function(field, federatedSchema) {
                var property = this.getHierarchyLevelConceptualProperty(federatedSchema);
                if (property) return this.getPropertyMetadata(field, property);
            }, SQExpr.prototype.getPropertyMetadata = function(field, property) {
                var format = property.format, type = property.type, columnAggregate = field.columnAggr || field.hierarchyLevelAggr;
                if (columnAggregate) switch (columnAggregate.aggregate) {
                  case data.QueryAggregateFunction.Count:
                  case data.QueryAggregateFunction.CountNonNull:
                    type = powerbi.ValueType.fromExtendedType(powerbi.ExtendedType.Integer), format = void 0;
                    break;

                  case data.QueryAggregateFunction.Avg:
                    type.integer && (type = powerbi.ValueType.fromExtendedType(powerbi.ExtendedType.Double));
                }
                return {
                    kind: 1 === property.kind || columnAggregate && void 0 !== columnAggregate.aggregate ? 1 : 0,
                    type: type,
                    format: format,
                    idOnEntityKey: property.column ? property.column.idOnEntityKey : !1,
                    aggregate: columnAggregate ? columnAggregate.aggregate : void 0,
                    defaultAggregate: property.column ? property.column.defaultAggregate : null
                };
            }, SQExpr.prototype.getMetadataForProperty = function(field, federatedSchema) {
                var property = this.getConceptualProperty(federatedSchema);
                if (property) return this.getPropertyMetadata(field, property);
            }, SQExpr.getMetadataForEntity = function(field, federatedSchema) {
                var fieldExprItem = data.FieldExprPattern.toFieldExprEntityItemPattern(field), entity = federatedSchema.schema(fieldExprItem.schema).entities.withName(fieldExprItem.entity);
                if (entity && field.entityAggr) switch (field.entityAggr.aggregate) {
                  case data.QueryAggregateFunction.Count:
                  case data.QueryAggregateFunction.CountNonNull:
                    return {
                        kind: 1,
                        type: powerbi.ValueType.fromExtendedType(powerbi.ExtendedType.Integer),
                        format: void 0,
                        idOnEntityKey: !1,
                        aggregate: field.entityAggr.aggregate
                    };
                }
            }, SQExpr;
        }();
        data.SQExpr = SQExpr, data.defaultAggregateForDataType = defaultAggregateForDataType, 
        data.defaultAggregateToQueryAggregateFunction = defaultAggregateToQueryAggregateFunction;
        var SQEntityExpr = function(_super) {
            function SQEntityExpr(schema, entity, variable) {
                _super.call(this, 0), this.schema = schema, this.entity = entity, variable && (this.variable = variable);
            }
            return __extends(SQEntityExpr, _super), SQEntityExpr.prototype.accept = function(visitor, arg) {
                return visitor.visitEntity(this, arg);
            }, SQEntityExpr;
        }(SQExpr);
        data.SQEntityExpr = SQEntityExpr;
        var SQPropRefExpr = function(_super) {
            function SQPropRefExpr(kind, source, ref) {
                _super.call(this, kind), this.source = source, this.ref = ref;
            }
            return __extends(SQPropRefExpr, _super), SQPropRefExpr;
        }(SQExpr);
        data.SQPropRefExpr = SQPropRefExpr;
        var SQColumnRefExpr = function(_super) {
            function SQColumnRefExpr(source, ref) {
                _super.call(this, 1, source, ref);
            }
            return __extends(SQColumnRefExpr, _super), SQColumnRefExpr.prototype.accept = function(visitor, arg) {
                return visitor.visitColumnRef(this, arg);
            }, SQColumnRefExpr;
        }(SQPropRefExpr);
        data.SQColumnRefExpr = SQColumnRefExpr;
        var SQMeasureRefExpr = function(_super) {
            function SQMeasureRefExpr(source, ref) {
                _super.call(this, 2, source, ref);
            }
            return __extends(SQMeasureRefExpr, _super), SQMeasureRefExpr.prototype.accept = function(visitor, arg) {
                return visitor.visitMeasureRef(this, arg);
            }, SQMeasureRefExpr;
        }(SQPropRefExpr);
        data.SQMeasureRefExpr = SQMeasureRefExpr;
        var SQAggregationExpr = function(_super) {
            function SQAggregationExpr(arg, func) {
                _super.call(this, 3), this.arg = arg, this.func = func;
            }
            return __extends(SQAggregationExpr, _super), SQAggregationExpr.prototype.accept = function(visitor, arg) {
                return visitor.visitAggr(this, arg);
            }, SQAggregationExpr;
        }(SQExpr);
        data.SQAggregationExpr = SQAggregationExpr;
        var SQPropertyVariationSourceExpr = function(_super) {
            function SQPropertyVariationSourceExpr(arg, name, property) {
                _super.call(this, 4), this.arg = arg, this.name = name, this.property = property;
            }
            return __extends(SQPropertyVariationSourceExpr, _super), SQPropertyVariationSourceExpr.prototype.accept = function(visitor, arg) {
                return visitor.visitPropertyVariationSource(this, arg);
            }, SQPropertyVariationSourceExpr;
        }(SQExpr);
        data.SQPropertyVariationSourceExpr = SQPropertyVariationSourceExpr;
        var SQHierarchyExpr = function(_super) {
            function SQHierarchyExpr(arg, hierarchy) {
                _super.call(this, 5), this.arg = arg, this.hierarchy = hierarchy;
            }
            return __extends(SQHierarchyExpr, _super), SQHierarchyExpr.prototype.accept = function(visitor, arg) {
                return visitor.visitHierarchy(this, arg);
            }, SQHierarchyExpr;
        }(SQExpr);
        data.SQHierarchyExpr = SQHierarchyExpr;
        var SQHierarchyLevelExpr = function(_super) {
            function SQHierarchyLevelExpr(arg, level) {
                _super.call(this, 6), this.arg = arg, this.level = level;
            }
            return __extends(SQHierarchyLevelExpr, _super), SQHierarchyLevelExpr.prototype.accept = function(visitor, arg) {
                return visitor.visitHierarchyLevel(this, arg);
            }, SQHierarchyLevelExpr;
        }(SQExpr);
        data.SQHierarchyLevelExpr = SQHierarchyLevelExpr;
        var SQAndExpr = function(_super) {
            function SQAndExpr(left, right) {
                _super.call(this, 7), this.left = left, this.right = right;
            }
            return __extends(SQAndExpr, _super), SQAndExpr.prototype.accept = function(visitor, arg) {
                return visitor.visitAnd(this, arg);
            }, SQAndExpr;
        }(SQExpr);
        data.SQAndExpr = SQAndExpr;
        var SQBetweenExpr = function(_super) {
            function SQBetweenExpr(arg, lower, upper) {
                _super.call(this, 8), this.arg = arg, this.lower = lower, this.upper = upper;
            }
            return __extends(SQBetweenExpr, _super), SQBetweenExpr.prototype.accept = function(visitor, arg) {
                return visitor.visitBetween(this, arg);
            }, SQBetweenExpr;
        }(SQExpr);
        data.SQBetweenExpr = SQBetweenExpr;
        var SQInExpr = function(_super) {
            function SQInExpr(args, values) {
                _super.call(this, 9), this.args = args, this.values = values;
            }
            return __extends(SQInExpr, _super), SQInExpr.prototype.accept = function(visitor, arg) {
                return visitor.visitIn(this, arg);
            }, SQInExpr;
        }(SQExpr);
        data.SQInExpr = SQInExpr;
        var SQOrExpr = function(_super) {
            function SQOrExpr(left, right) {
                _super.call(this, 10), this.left = left, this.right = right;
            }
            return __extends(SQOrExpr, _super), SQOrExpr.prototype.accept = function(visitor, arg) {
                return visitor.visitOr(this, arg);
            }, SQOrExpr;
        }(SQExpr);
        data.SQOrExpr = SQOrExpr;
        var SQCompareExpr = function(_super) {
            function SQCompareExpr(comparison, left, right) {
                _super.call(this, 12), this.comparison = comparison, this.left = left, this.right = right;
            }
            return __extends(SQCompareExpr, _super), SQCompareExpr.prototype.accept = function(visitor, arg) {
                return visitor.visitCompare(this, arg);
            }, SQCompareExpr;
        }(SQExpr);
        data.SQCompareExpr = SQCompareExpr;
        var SQContainsExpr = function(_super) {
            function SQContainsExpr(left, right) {
                _super.call(this, 11), this.left = left, this.right = right;
            }
            return __extends(SQContainsExpr, _super), SQContainsExpr.prototype.accept = function(visitor, arg) {
                return visitor.visitContains(this, arg);
            }, SQContainsExpr;
        }(SQExpr);
        data.SQContainsExpr = SQContainsExpr;
        var SQStartsWithExpr = function(_super) {
            function SQStartsWithExpr(left, right) {
                _super.call(this, 13), this.left = left, this.right = right;
            }
            return __extends(SQStartsWithExpr, _super), SQStartsWithExpr.prototype.accept = function(visitor, arg) {
                return visitor.visitStartsWith(this, arg);
            }, SQStartsWithExpr;
        }(SQExpr);
        data.SQStartsWithExpr = SQStartsWithExpr;
        var SQExistsExpr = function(_super) {
            function SQExistsExpr(arg) {
                _super.call(this, 14), this.arg = arg;
            }
            return __extends(SQExistsExpr, _super), SQExistsExpr.prototype.accept = function(visitor, arg) {
                return visitor.visitExists(this, arg);
            }, SQExistsExpr;
        }(SQExpr);
        data.SQExistsExpr = SQExistsExpr;
        var SQNotExpr = function(_super) {
            function SQNotExpr(arg) {
                _super.call(this, 15), this.arg = arg;
            }
            return __extends(SQNotExpr, _super), SQNotExpr.prototype.accept = function(visitor, arg) {
                return visitor.visitNot(this, arg);
            }, SQNotExpr;
        }(SQExpr);
        data.SQNotExpr = SQNotExpr;
        var SQConstantExpr = function(_super) {
            function SQConstantExpr(type, value, valueEncoded) {
                _super.call(this, 16), this.type = type, this.value = value, this.valueEncoded = valueEncoded;
            }
            return __extends(SQConstantExpr, _super), SQConstantExpr.prototype.accept = function(visitor, arg) {
                return visitor.visitConstant(this, arg);
            }, SQConstantExpr.prototype.getMetadata = function(federatedSchema) {
                return {
                    kind: 1,
                    type: this.type
                };
            }, SQConstantExpr;
        }(SQExpr);
        data.SQConstantExpr = SQConstantExpr;
        var SQDateSpanExpr = function(_super) {
            function SQDateSpanExpr(unit, arg) {
                _super.call(this, 17), this.unit = unit, this.arg = arg;
            }
            return __extends(SQDateSpanExpr, _super), SQDateSpanExpr.prototype.accept = function(visitor, arg) {
                return visitor.visitDateSpan(this, arg);
            }, SQDateSpanExpr;
        }(SQExpr);
        data.SQDateSpanExpr = SQDateSpanExpr;
        var SQDateAddExpr = function(_super) {
            function SQDateAddExpr(unit, amount, arg) {
                _super.call(this, 18), this.unit = unit, this.arg = arg, this.amount = amount;
            }
            return __extends(SQDateAddExpr, _super), SQDateAddExpr.prototype.accept = function(visitor, arg) {
                return visitor.visitDateAdd(this, arg);
            }, SQDateAddExpr;
        }(SQExpr);
        data.SQDateAddExpr = SQDateAddExpr;
        var SQNowExpr = function(_super) {
            function SQNowExpr() {
                _super.call(this, 19);
            }
            return __extends(SQNowExpr, _super), SQNowExpr.prototype.accept = function(visitor, arg) {
                return visitor.visitNow(this, arg);
            }, SQNowExpr;
        }(SQExpr);
        data.SQNowExpr = SQNowExpr;
        var SQDefaultValueExpr = function(_super) {
            function SQDefaultValueExpr() {
                _super.call(this, 21);
            }
            return __extends(SQDefaultValueExpr, _super), SQDefaultValueExpr.prototype.accept = function(visitor, arg) {
                return visitor.visitDefaultValue(this, arg);
            }, SQDefaultValueExpr;
        }(SQExpr);
        data.SQDefaultValueExpr = SQDefaultValueExpr;
        var SQAnyValueExpr = function(_super) {
            function SQAnyValueExpr() {
                _super.call(this, 20);
            }
            return __extends(SQAnyValueExpr, _super), SQAnyValueExpr.prototype.accept = function(visitor, arg) {
                return visitor.visitAnyValue(this, arg);
            }, SQAnyValueExpr;
        }(SQExpr);
        data.SQAnyValueExpr = SQAnyValueExpr;
        var SQExprBuilder;
        !function(SQExprBuilder) {
            function entity(schema, entity, variable) {
                return new SQEntityExpr(schema, entity, variable);
            }
            function columnRef(source, prop) {
                return new SQColumnRefExpr(source, prop);
            }
            function measureRef(source, prop) {
                return new SQMeasureRefExpr(source, prop);
            }
            function aggregate(source, aggregate) {
                return new SQAggregationExpr(source, aggregate);
            }
            function hierarchy(source, hierarchy) {
                return new SQHierarchyExpr(source, hierarchy);
            }
            function propertyVariationSource(source, name, property) {
                return new SQPropertyVariationSourceExpr(source, name, property);
            }
            function hierarchyLevel(source, level) {
                return new SQHierarchyLevelExpr(source, level);
            }
            function and(left, right) {
                return left ? right ? new SQAndExpr(left, right) : left : right;
            }
            function between(arg, lower, upper) {
                return new SQBetweenExpr(arg, lower, upper);
            }
            function inExpr(args, values) {
                return new SQInExpr(args, values);
            }
            function or(left, right) {
                if (!left) return right;
                if (!right) return left;
                if (left instanceof SQInExpr && right instanceof SQInExpr) {
                    var inExpr_1 = tryUseInExprs(left, right);
                    if (inExpr_1) return inExpr_1;
                }
                return new SQOrExpr(left, right);
            }
            function tryUseInExprs(left, right) {
                if (left.args && right.args) {
                    var leftArgLen = left.args.length, rightArgLen = right.args.length;
                    if (leftArgLen === rightArgLen) {
                        for (var i = 0; leftArgLen > i; ++i) if (!SQExpr.equals(left.args[i], right.args[i])) return;
                        var combinedValues = left.values.concat(right.values);
                        return SQExprBuilder.inExpr(left.args, combinedValues);
                    }
                }
            }
            function compare(kind, left, right) {
                return new SQCompareExpr(kind, left, right);
            }
            function contains(left, right) {
                return new SQContainsExpr(left, right);
            }
            function exists(arg) {
                return new SQExistsExpr(arg);
            }
            function equal(left, right) {
                return compare(data.QueryComparisonKind.Equal, left, right);
            }
            function not(arg) {
                return new SQNotExpr(arg);
            }
            function startsWith(left, right) {
                return new SQStartsWithExpr(left, right);
            }
            function nullConstant() {
                return new SQConstantExpr(powerbi.ValueType.fromExtendedType(powerbi.ExtendedType.Null), null, data.PrimitiveValueEncoding.nullEncoding());
            }
            function now() {
                return new SQNowExpr();
            }
            function defaultValue() {
                return new SQDefaultValueExpr();
            }
            function anyValue() {
                return new SQAnyValueExpr();
            }
            function boolean(value) {
                return new SQConstantExpr(powerbi.ValueType.fromExtendedType(powerbi.ExtendedType.Boolean), value, data.PrimitiveValueEncoding["boolean"](value));
            }
            function dateAdd(unit, amount, arg) {
                return new SQDateAddExpr(unit, amount, arg);
            }
            function dateTime(value, valueEncoded) {
                return void 0 === valueEncoded && (valueEncoded = data.PrimitiveValueEncoding.dateTime(value)), 
                new SQConstantExpr(powerbi.ValueType.fromExtendedType(powerbi.ExtendedType.DateTime), value, valueEncoded);
            }
            function dateSpan(unit, arg) {
                return new SQDateSpanExpr(unit, arg);
            }
            function decimal(value, valueEncoded) {
                return void 0 === valueEncoded && (valueEncoded = data.PrimitiveValueEncoding.decimal(value)), 
                new SQConstantExpr(powerbi.ValueType.fromExtendedType(powerbi.ExtendedType.Decimal), value, valueEncoded);
            }
            function double(value, valueEncoded) {
                return void 0 === valueEncoded && (valueEncoded = data.PrimitiveValueEncoding["double"](value)), 
                new SQConstantExpr(powerbi.ValueType.fromExtendedType(powerbi.ExtendedType.Double), value, valueEncoded);
            }
            function integer(value, valueEncoded) {
                return void 0 === valueEncoded && (valueEncoded = data.PrimitiveValueEncoding.integer(value)), 
                new SQConstantExpr(powerbi.ValueType.fromExtendedType(powerbi.ExtendedType.Integer), value, valueEncoded);
            }
            function text(value, valueEncoded) {
                return new SQConstantExpr(powerbi.ValueType.fromExtendedType(powerbi.ExtendedType.Text), value, valueEncoded || data.PrimitiveValueEncoding.text(value));
            }
            function typedConstant(value, type) {
                return null == value ? nullConstant() : _.isBoolean(value) ? boolean(value) : _.isString(value) ? text(value) : _.isNumber(value) ? type.integer && powerbi.Double.isInteger(value) ? integer(value) : double(value) : value instanceof Date ? dateTime(value) : void 0;
            }
            function setAggregate(expr, aggregate) {
                return SQExprChangeAggregateRewriter.rewrite(expr, aggregate);
            }
            function removeAggregate(expr) {
                return SQExprRemoveAggregateRewriter.rewrite(expr);
            }
            function removeEntityVariables(expr) {
                return SQExprRemoveEntityVariablesRewriter.rewrite(expr);
            }
            function createExprWithAggregate(expr, schema, aggregateNonNumericFields, preferredAggregate) {
                var aggregate;
                return aggregate = null != preferredAggregate && data.SQExprUtils.isSupportedAggregate(expr, schema, preferredAggregate) ? preferredAggregate : expr.getDefaultAggregate(schema, aggregateNonNumericFields), 
                void 0 !== aggregate && (expr = SQExprBuilder.aggregate(expr, aggregate)), expr;
            }
            SQExprBuilder.entity = entity, SQExprBuilder.columnRef = columnRef, SQExprBuilder.measureRef = measureRef, 
            SQExprBuilder.aggregate = aggregate, SQExprBuilder.hierarchy = hierarchy, SQExprBuilder.propertyVariationSource = propertyVariationSource, 
            SQExprBuilder.hierarchyLevel = hierarchyLevel, SQExprBuilder.and = and, SQExprBuilder.between = between, 
            SQExprBuilder.inExpr = inExpr, SQExprBuilder.or = or, SQExprBuilder.compare = compare, 
            SQExprBuilder.contains = contains, SQExprBuilder.exists = exists, SQExprBuilder.equal = equal, 
            SQExprBuilder.not = not, SQExprBuilder.startsWith = startsWith, SQExprBuilder.nullConstant = nullConstant, 
            SQExprBuilder.now = now, SQExprBuilder.defaultValue = defaultValue, SQExprBuilder.anyValue = anyValue, 
            SQExprBuilder["boolean"] = boolean, SQExprBuilder.dateAdd = dateAdd, SQExprBuilder.dateTime = dateTime, 
            SQExprBuilder.dateSpan = dateSpan, SQExprBuilder.decimal = decimal, SQExprBuilder["double"] = double, 
            SQExprBuilder.integer = integer, SQExprBuilder.text = text, SQExprBuilder.typedConstant = typedConstant, 
            SQExprBuilder.setAggregate = setAggregate, SQExprBuilder.removeAggregate = removeAggregate, 
            SQExprBuilder.removeEntityVariables = removeEntityVariables, SQExprBuilder.createExprWithAggregate = createExprWithAggregate;
        }(SQExprBuilder = data.SQExprBuilder || (data.SQExprBuilder = {}));
        var SQExprInfo;
        !function(SQExprInfo) {
            function getAggregate(expr) {
                return SQExprAggregateInfoVisitor.getAggregate(expr);
            }
            SQExprInfo.getAggregate = getAggregate;
        }(SQExprInfo = data.SQExprInfo || (data.SQExprInfo = {}));
        var SQExprEqualityVisitor = function() {
            function SQExprEqualityVisitor(ignoreCase) {
                this.ignoreCase = ignoreCase;
            }
            return SQExprEqualityVisitor.run = function(x, y, ignoreCase) {
                return x = x || null, y = y || null, x === y ? !0 : !x != !y ? !1 : ignoreCase ? x.accept(SQExprEqualityVisitor.ignoreCaseInstance, y) : x.accept(SQExprEqualityVisitor.instance, y);
            }, SQExprEqualityVisitor.prototype.visitColumnRef = function(expr, comparand) {
                return comparand instanceof SQColumnRefExpr && expr.ref === comparand.ref && this.equals(expr.source, comparand.source);
            }, SQExprEqualityVisitor.prototype.visitMeasureRef = function(expr, comparand) {
                return comparand instanceof SQMeasureRefExpr && expr.ref === comparand.ref && this.equals(expr.source, comparand.source);
            }, SQExprEqualityVisitor.prototype.visitAggr = function(expr, comparand) {
                return comparand instanceof SQAggregationExpr && expr.func === comparand.func && this.equals(expr.arg, comparand.arg);
            }, SQExprEqualityVisitor.prototype.visitHierarchy = function(expr, comparand) {
                return comparand instanceof SQHierarchyExpr && expr.hierarchy === comparand.hierarchy && this.equals(expr.arg, comparand.arg);
            }, SQExprEqualityVisitor.prototype.visitHierarchyLevel = function(expr, comparand) {
                return comparand instanceof SQHierarchyLevelExpr && expr.level === comparand.level && this.equals(expr.arg, comparand.arg);
            }, SQExprEqualityVisitor.prototype.visitPropertyVariationSource = function(expr, comparand) {
                return comparand instanceof SQPropertyVariationSourceExpr && expr.name === comparand.name && expr.property === comparand.property && this.equals(expr.arg, comparand.arg);
            }, SQExprEqualityVisitor.prototype.visitBetween = function(expr, comparand) {
                return comparand instanceof SQBetweenExpr && this.equals(expr.arg, comparand.arg) && this.equals(expr.lower, comparand.lower) && this.equals(expr.upper, comparand.upper);
            }, SQExprEqualityVisitor.prototype.visitIn = function(expr, comparand) {
                if (!(comparand instanceof SQInExpr && this.equalsAll(expr.args, comparand.args))) return !1;
                var values = expr.values, compareValues = comparand.values;
                if (values.length !== compareValues.length) return !1;
                for (var i = 0, len = values.length; len > i; i++) if (!this.equalsAll(values[i], compareValues[i])) return !1;
                return !0;
            }, SQExprEqualityVisitor.prototype.visitEntity = function(expr, comparand) {
                return comparand instanceof SQEntityExpr && expr.schema === comparand.schema && expr.entity === comparand.entity && this.optionalEqual(expr.variable, comparand.variable);
            }, SQExprEqualityVisitor.prototype.visitAnd = function(expr, comparand) {
                return comparand instanceof SQAndExpr && this.equals(expr.left, comparand.left) && this.equals(expr.right, comparand.right);
            }, SQExprEqualityVisitor.prototype.visitOr = function(expr, comparand) {
                return comparand instanceof SQOrExpr && this.equals(expr.left, comparand.left) && this.equals(expr.right, comparand.right);
            }, SQExprEqualityVisitor.prototype.visitCompare = function(expr, comparand) {
                return comparand instanceof SQCompareExpr && expr.comparison === comparand.comparison && this.equals(expr.left, comparand.left) && this.equals(expr.right, comparand.right);
            }, SQExprEqualityVisitor.prototype.visitContains = function(expr, comparand) {
                return comparand instanceof SQContainsExpr && this.equals(expr.left, comparand.left) && this.equals(expr.right, comparand.right);
            }, SQExprEqualityVisitor.prototype.visitDateSpan = function(expr, comparand) {
                return comparand instanceof SQDateSpanExpr && expr.unit === comparand.unit && this.equals(expr.arg, comparand.arg);
            }, SQExprEqualityVisitor.prototype.visitDateAdd = function(expr, comparand) {
                return comparand instanceof SQDateAddExpr && expr.unit === comparand.unit && expr.amount === comparand.amount && this.equals(expr.arg, comparand.arg);
            }, SQExprEqualityVisitor.prototype.visitExists = function(expr, comparand) {
                return comparand instanceof SQExistsExpr && this.equals(expr.arg, comparand.arg);
            }, SQExprEqualityVisitor.prototype.visitNot = function(expr, comparand) {
                return comparand instanceof SQNotExpr && this.equals(expr.arg, comparand.arg);
            }, SQExprEqualityVisitor.prototype.visitNow = function(expr, comparand) {
                return comparand instanceof SQNowExpr;
            }, SQExprEqualityVisitor.prototype.visitDefaultValue = function(expr, comparand) {
                return comparand instanceof SQDefaultValueExpr;
            }, SQExprEqualityVisitor.prototype.visitAnyValue = function(expr, comparand) {
                return comparand instanceof SQAnyValueExpr;
            }, SQExprEqualityVisitor.prototype.visitStartsWith = function(expr, comparand) {
                return comparand instanceof SQStartsWithExpr && this.equals(expr.left, comparand.left) && this.equals(expr.right, comparand.right);
            }, SQExprEqualityVisitor.prototype.visitConstant = function(expr, comparand) {
                return comparand instanceof SQConstantExpr && expr.type === comparand.type ? expr.type.text && this.ignoreCase ? StringExtensions.equalIgnoreCase(expr.valueEncoded, comparand.valueEncoded) : expr.valueEncoded === comparand.valueEncoded : !1;
            }, SQExprEqualityVisitor.prototype.optionalEqual = function(x, y) {
                return x && y ? x === y : !0;
            }, SQExprEqualityVisitor.prototype.equals = function(x, y) {
                return x.accept(this, y);
            }, SQExprEqualityVisitor.prototype.equalsAll = function(x, y) {
                var len = x.length;
                if (len !== y.length) return !1;
                for (var i = 0; len > i; i++) if (!this.equals(x[i], y[i])) return !1;
                return !0;
            }, SQExprEqualityVisitor.instance = new SQExprEqualityVisitor(!1), SQExprEqualityVisitor.ignoreCaseInstance = new SQExprEqualityVisitor(!0), 
            SQExprEqualityVisitor;
        }(), SQExprRootRewriter = function(_super) {
            function SQExprRootRewriter() {
                _super.apply(this, arguments);
            }
            return __extends(SQExprRootRewriter, _super), SQExprRootRewriter.prototype.visitDefault = function(expr) {
                return expr;
            }, SQExprRootRewriter;
        }(data.DefaultSQExprVisitor), SQExprValidationVisitor = function(_super) {
            function SQExprValidationVisitor(schema, errors) {
                _super.call(this), this.schema = schema, errors && (this.errors = errors);
            }
            return __extends(SQExprValidationVisitor, _super), SQExprValidationVisitor.prototype.visitIn = function(expr) {
                for (var inExpr = _super.prototype.visitIn.call(this, expr), args = inExpr.args, values = inExpr.values, _i = 0; _i < values.length; _i++) for (var valueTuple = values[_i], i = 0, len = valueTuple.length; len > i; ++i) this.validateCompatibleType(args[i], valueTuple[i]);
                return inExpr;
            }, SQExprValidationVisitor.prototype.visitCompare = function(expr) {
                var compareExpr = _super.prototype.visitCompare.call(this, expr);
                return this.validateCompatibleType(compareExpr.left, compareExpr.right), compareExpr;
            }, SQExprValidationVisitor.prototype.visitColumnRef = function(expr) {
                var fieldExpr = data.SQExprConverter.asFieldPattern(expr);
                if (fieldExpr) {
                    var fieldExprItem = data.FieldExprPattern.toFieldExprEntityItemPattern(fieldExpr), entity = this.validateEntity(fieldExprItem.schema, fieldExprItem.entity);
                    if (entity) {
                        var prop = entity.properties.withName(fieldExpr.column.name);
                        prop && 0 === prop.kind && this.isQueryable(fieldExpr) || this.register(3);
                    }
                }
                return expr;
            }, SQExprValidationVisitor.prototype.visitMeasureRef = function(expr) {
                var fieldExpr = data.SQExprConverter.asFieldPattern(expr);
                if (fieldExpr) {
                    var fieldExprItem = data.FieldExprPattern.toFieldExprEntityItemPattern(fieldExpr), entity = this.validateEntity(fieldExprItem.schema, fieldExprItem.entity);
                    if (entity) {
                        var prop = entity.properties.withName(fieldExpr.measure.name);
                        prop && 1 === prop.kind && this.isQueryable(fieldExpr) || this.register(4);
                    }
                }
                return expr;
            }, SQExprValidationVisitor.prototype.visitAggr = function(expr) {
                var aggregateExpr = _super.prototype.visitAggr.call(this, expr), columnRefExpr = SQExprColumnRefInfoVisitor.getColumnRefSQExpr(this.schema, aggregateExpr.arg);
                return columnRefExpr && (data.SQExprUtils.isSupportedAggregate(expr, this.schema, expr.func) || this.register(0)), 
                aggregateExpr;
            }, SQExprValidationVisitor.prototype.visitHierarchy = function(expr) {
                var fieldExpr = data.SQExprConverter.asFieldPattern(expr);
                if (fieldExpr) {
                    var fieldExprItem = fieldExpr.hierarchy;
                    fieldExprItem ? this.validateHierarchy(fieldExprItem.schema, fieldExprItem.entity, fieldExprItem.name) : this.register(5);
                }
                return expr;
            }, SQExprValidationVisitor.prototype.visitHierarchyLevel = function(expr) {
                var fieldExpr = data.SQExprConverter.asFieldPattern(expr);
                if (fieldExpr) {
                    var hierarchyLevelFieldExprItem = fieldExpr.hierarchyLevel;
                    hierarchyLevelFieldExprItem ? this.validateHierarchyLevel(hierarchyLevelFieldExprItem.schema, hierarchyLevelFieldExprItem.entity, hierarchyLevelFieldExprItem.name, hierarchyLevelFieldExprItem.level) : fieldExpr.columnHierarchyLevelVariation || this.register(6);
                }
                return expr;
            }, SQExprValidationVisitor.prototype.visitEntity = function(expr) {
                return this.validateEntity(expr.schema, expr.entity), expr;
            }, SQExprValidationVisitor.prototype.visitContains = function(expr) {
                return this.validateOperandsAndTypeForStartOrContains(expr.left, expr.right), expr;
            }, SQExprValidationVisitor.prototype.visitStartsWith = function(expr) {
                return this.validateOperandsAndTypeForStartOrContains(expr.left, expr.right), expr;
            }, SQExprValidationVisitor.prototype.validateOperandsAndTypeForStartOrContains = function(left, right) {
                left instanceof SQColumnRefExpr ? this.visitColumnRef(left) : left instanceof SQHierarchyLevelExpr ? this.visitHierarchyLevel(left) : this.register(7), 
                right instanceof SQConstantExpr && right.type.text ? this.validateCompatibleType(left, right) : this.register(8);
            }, SQExprValidationVisitor.prototype.validateCompatibleType = function(left, right) {
                var leftMetadata = left.getMetadata(this.schema), leftType = leftMetadata && leftMetadata.type, rightMetadata = right.getMetadata(this.schema), rightType = rightMetadata && rightMetadata.type;
                leftType && rightType && !leftType.isCompatibleFrom(rightType) && this.register(9);
            }, SQExprValidationVisitor.prototype.validateEntity = function(schemaName, entityName) {
                var schema = this.schema.schema(schemaName);
                if (schema) {
                    var entity = schema.entities.withName(entityName);
                    if (entity) return entity;
                    this.register(2);
                } else this.register(1);
            }, SQExprValidationVisitor.prototype.validateHierarchy = function(schemaName, entityName, hierarchyName) {
                var entity = this.validateEntity(schemaName, entityName);
                if (entity) {
                    var hierarchy = entity.hierarchies.withName(hierarchyName);
                    if (hierarchy) return hierarchy;
                    this.register(5);
                }
            }, SQExprValidationVisitor.prototype.validateHierarchyLevel = function(schemaName, entityName, hierarchyName, levelName) {
                var hierarchy = this.validateHierarchy(schemaName, entityName, hierarchyName);
                if (hierarchy) {
                    var hierarchyLevel = hierarchy.levels.withName(levelName);
                    if (hierarchyLevel) return hierarchyLevel;
                    this.register(6);
                }
            }, SQExprValidationVisitor.prototype.register = function(error) {
                this.errors || (this.errors = []), this.errors.push(error);
            }, SQExprValidationVisitor.prototype.isQueryable = function(fieldExpr) {
                var fieldExprItem = data.FieldExprPattern.toFieldExprEntityItemPattern(fieldExpr);
                if (fieldExpr.hierarchyLevel || fieldExpr.hierarchyLevelAggr) {
                    var hierarchyLevelConceptualProperty = data.SQHierarchyExprUtils.getConceptualHierarchyLevelFromExpr(this.schema, fieldExpr);
                    return hierarchyLevelConceptualProperty && 1 !== hierarchyLevelConceptualProperty.column.queryable;
                }
                return 1 !== this.schema.schema(fieldExprItem.schema).findProperty(fieldExprItem.entity, data.FieldExprPattern.getPropertyName(fieldExpr)).queryable;
            }, SQExprValidationVisitor;
        }(data.SQExprRewriter);
        data.SQExprValidationVisitor = SQExprValidationVisitor;
        var SQExprAggregateInfoVisitor = function(_super) {
            function SQExprAggregateInfoVisitor() {
                _super.apply(this, arguments);
            }
            return __extends(SQExprAggregateInfoVisitor, _super), SQExprAggregateInfoVisitor.prototype.visitAggr = function(expr) {
                return expr.func;
            }, SQExprAggregateInfoVisitor.prototype.visitDefault = function(expr) {}, SQExprAggregateInfoVisitor.getAggregate = function(expr) {
                var visitor = new SQExprAggregateInfoVisitor();
                return expr.accept(visitor);
            }, SQExprAggregateInfoVisitor;
        }(data.DefaultSQExprVisitor), SQExprColumnRefInfoVisitor = function(_super) {
            function SQExprColumnRefInfoVisitor(schema) {
                _super.call(this), this.schema = schema;
            }
            return __extends(SQExprColumnRefInfoVisitor, _super), SQExprColumnRefInfoVisitor.prototype.visitColumnRef = function(expr) {
                return expr;
            }, SQExprColumnRefInfoVisitor.prototype.visitHierarchyLevel = function(expr) {
                var ref = expr.level, hierarchy = expr.arg, sourceExpr = hierarchy.accept(this);
                if (hierarchy && hierarchy.arg instanceof SQPropertyVariationSourceExpr) {
                    var propertyVariationSource = hierarchy.arg, targetEntity = sourceExpr.getTargetEntityForVariation(this.schema, propertyVariationSource.name);
                    if (sourceExpr && targetEntity) {
                        var schemaName = sourceExpr.source.schema, targetEntityExpr = SQExprBuilder.entity(schemaName, targetEntity), schemaHierarchy = this.schema.schema(schemaName).findHierarchy(targetEntity, hierarchy.hierarchy);
                        if (schemaHierarchy) for (var _i = 0, _a = schemaHierarchy.levels; _i < _a.length; _i++) {
                            var level = _a[_i];
                            if (level.name === ref) return new SQColumnRefExpr(targetEntityExpr, level.column.name);
                        }
                    }
                } else {
                    var entityExpr = hierarchy.arg, hierarchyLevelRef = data.SQHierarchyExprUtils.getConceptualHierarchyLevel(this.schema, entityExpr.schema, entityExpr.entity, hierarchy.hierarchy, expr.level);
                    if (hierarchyLevelRef) return new SQColumnRefExpr(hierarchy.arg, hierarchyLevelRef.column.name);
                }
            }, SQExprColumnRefInfoVisitor.prototype.visitHierarchy = function(expr) {
                return expr.arg.accept(this);
            }, SQExprColumnRefInfoVisitor.prototype.visitPropertyVariationSource = function(expr) {
                var propertyName = expr.property;
                return new SQColumnRefExpr(expr.arg, propertyName);
            }, SQExprColumnRefInfoVisitor.prototype.visitDefault = function(expr) {}, SQExprColumnRefInfoVisitor.getColumnRefSQExpr = function(schema, expr) {
                var visitor = new SQExprColumnRefInfoVisitor(schema);
                return expr.accept(visitor);
            }, SQExprColumnRefInfoVisitor;
        }(data.DefaultSQExprVisitor), SQExprChangeAggregateRewriter = function(_super) {
            function SQExprChangeAggregateRewriter(func) {
                _super.call(this), this.func = func;
            }
            return __extends(SQExprChangeAggregateRewriter, _super), SQExprChangeAggregateRewriter.prototype.visitAggr = function(expr) {
                return expr.func === this.func ? expr : new SQAggregationExpr(expr.arg, this.func);
            }, SQExprChangeAggregateRewriter.prototype.visitColumnRef = function(expr) {
                return new SQAggregationExpr(expr, this.func);
            }, SQExprChangeAggregateRewriter.rewrite = function(expr, func) {
                var rewriter = new SQExprChangeAggregateRewriter(func);
                return expr.accept(rewriter);
            }, SQExprChangeAggregateRewriter;
        }(SQExprRootRewriter), SQExprRemoveAggregateRewriter = function(_super) {
            function SQExprRemoveAggregateRewriter() {
                _super.apply(this, arguments);
            }
            return __extends(SQExprRemoveAggregateRewriter, _super), SQExprRemoveAggregateRewriter.prototype.visitAggr = function(expr) {
                return expr.arg;
            }, SQExprRemoveAggregateRewriter.rewrite = function(expr) {
                return expr.accept(SQExprRemoveAggregateRewriter.instance);
            }, SQExprRemoveAggregateRewriter.instance = new SQExprRemoveAggregateRewriter(), 
            SQExprRemoveAggregateRewriter;
        }(SQExprRootRewriter), SQExprRemoveEntityVariablesRewriter = function(_super) {
            function SQExprRemoveEntityVariablesRewriter() {
                _super.apply(this, arguments);
            }
            return __extends(SQExprRemoveEntityVariablesRewriter, _super), SQExprRemoveEntityVariablesRewriter.prototype.visitEntity = function(expr) {
                return expr.variable ? SQExprBuilder.entity(expr.schema, expr.entity) : expr;
            }, SQExprRemoveEntityVariablesRewriter.rewrite = function(expr) {
                return expr.accept(SQExprRemoveEntityVariablesRewriter.instance);
            }, SQExprRemoveEntityVariablesRewriter.instance = new SQExprRemoveEntityVariablesRewriter(), 
            SQExprRemoveEntityVariablesRewriter;
        }(data.SQExprRewriter);
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var SQExprUtils, StringExtensions = jsCommon.StringExtensions;
        !function(SQExprUtils) {
            function getSupportedAggregates(expr, schema) {
                var emptyList = [], metadata = getMetadataForUnderlyingType(expr, schema);
                if (!metadata) return emptyList;
                var valueType = metadata.type, fieldKind = metadata.kind, isPropertyIdentity = metadata.idOnEntityKey, Agg = data.QueryAggregateFunction;
                if (!valueType) return emptyList;
                if (1 === fieldKind) return emptyList;
                if (valueType.numeric || valueType.integer) {
                    var aggregates = [ Agg.Sum, Agg.Avg, Agg.Min, Agg.Max, Agg.Count, Agg.CountNonNull, Agg.StandardDeviation, Agg.Variance ], fieldExpr = data.SQExprConverter.asFieldPattern(expr), fieldExprItem = data.FieldExprPattern.toFieldExprEntityItemPattern(fieldExpr), currentSchema = schema.schema(fieldExprItem.schema);
                    return currentSchema.capabilities.supportsMedian && aggregates.push(Agg.Median), 
                    aggregates;
                }
                if (valueType.text || valueType.bool || valueType.dateTime) {
                    var distinctCountAggExists = data.SQExprInfo.getAggregate(expr) === Agg.Count;
                    return isPropertyIdentity && !distinctCountAggExists ? [ Agg.CountNonNull ] : [ Agg.Count, Agg.CountNonNull ];
                }
                return emptyList;
            }
            function isSupportedAggregate(expr, schema, aggregate) {
                var supportedAggregates = getSupportedAggregates(expr, schema);
                return _.contains(supportedAggregates, aggregate);
            }
            function indexOfExpr(items, searchElement) {
                for (var i = 0, len = items.length; len > i; i++) if (data.SQExpr.equals(items[i], searchElement)) return i;
                return -1;
            }
            function sequenceEqual(x, y) {
                var len = x.length;
                if (len !== y.length) return !1;
                for (var i = 0; len > i; i++) if (!data.SQExpr.equals(x[i], y[i])) return !1;
                return !0;
            }
            function uniqueName(namedItems, expr) {
                for (var names = {}, i = 0, len = namedItems.length; len > i; i++) names[namedItems[i].name] = !0;
                return StringExtensions.findUniqueName(names, defaultName(expr));
            }
            function defaultName(expr, fallback) {
                return void 0 === fallback && (fallback = "select"), expr ? expr.accept(SQExprDefaultNameGenerator.instance, fallback) : fallback;
            }
            function isMeasure(expr) {
                return expr.accept(IsMeasureVisitor.instance);
            }
            function isAnyValue(expr) {
                return expr.accept(IsAnyValueVisitor.instance);
            }
            function isDefaultValue(expr) {
                return expr.accept(IsDefaultValueVisitor.instance);
            }
            function discourageAggregation(expr, schema) {
                var capabilities = getSchemaCapabilities(expr, schema);
                return capabilities && capabilities.discourageQueryAggregateUsage;
            }
            function getAggregateBehavior(expr, schema) {
                var column = getConceptualColumn(expr, schema);
                return column ? column.aggregateBehavior : void 0;
            }
            function getSchemaCapabilities(expr, schema) {
                var field = data.SQExprConverter.asFieldPattern(expr);
                if (field) {
                    var fieldExprItem = data.FieldExprPattern.toFieldExprEntityItemPattern(field), conceptualSchema = schema.schema(fieldExprItem.schema);
                    return conceptualSchema ? conceptualSchema.capabilities : void 0;
                }
            }
            function getKpiMetadata(expr, schema) {
                var kpiStatusProperty = getKpiStatusProperty(expr, schema);
                if (kpiStatusProperty) return kpiStatusProperty.kpiValue.measure.kpi.statusMetadata;
                var kpiTrendProperty = getKpiTrendProperty(expr, schema);
                return kpiTrendProperty ? kpiTrendProperty.kpiValue.measure.kpi.trendMetadata : void 0;
            }
            function getKpiStatusProperty(expr, schema) {
                var property = expr.getConceptualProperty(schema);
                if (property) {
                    var kpiValue = property.kpiValue;
                    return kpiValue && kpiValue.measure.kpi.status === property ? property : void 0;
                }
            }
            function getKpiTrendProperty(expr, schema) {
                var property = expr.getConceptualProperty(schema);
                if (property) {
                    var kpiValue = property.kpiValue;
                    return kpiValue && kpiValue.measure.kpi.trend === property ? property : void 0;
                }
            }
            function getMetadataForUnderlyingType(expr, schema) {
                var metadata = data.SQExprBuilder.removeAggregate(expr).getMetadata(schema);
                return metadata || (metadata = expr.getMetadata(schema)), metadata;
            }
            function getDefaultValue(fieldSQExpr, schema) {
                var column = getConceptualColumn(fieldSQExpr, schema);
                return column ? column.defaultValue : void 0;
            }
            function getConceptualColumn(fieldSQExpr, schema) {
                if (fieldSQExpr && schema) {
                    var sqField = data.SQExprConverter.asFieldPattern(fieldSQExpr);
                    if (sqField) {
                        var column = sqField.column;
                        if (column) {
                            if (schema.schema(column.schema) && sqField.column.name) {
                                var property = schema.schema(column.schema).findProperty(column.entity, sqField.column.name);
                                if (property) return property.column;
                            }
                        } else {
                            var hierarchyLevelField = sqField.hierarchyLevel;
                            if (hierarchyLevelField) {
                                var fieldExprItem = data.FieldExprPattern.toFieldExprEntityItemPattern(sqField), schemaName = fieldExprItem.schema;
                                if (schema.schema(schemaName)) {
                                    var hierarchy = schema.schema(schemaName).findHierarchy(fieldExprItem.entity, hierarchyLevelField.name);
                                    if (hierarchy) {
                                        var hierarchyLevel = hierarchy.levels.withName(hierarchyLevelField.level);
                                        if (hierarchyLevel && hierarchyLevel.column) return hierarchyLevel.column.column;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            function getDefaultValues(fieldSQExprs, schema) {
                if (!_.isEmpty(fieldSQExprs) && schema) {
                    for (var result = [], _i = 0; _i < fieldSQExprs.length; _i++) {
                        var sqExpr = fieldSQExprs[_i], defaultValue = getDefaultValue(sqExpr, schema);
                        defaultValue && result.push(defaultValue);
                    }
                    return result;
                }
            }
            function getDataViewScopeIdentityComparisonExpr(fieldsExpr, values) {
                for (var compareExprs = [], i = 0; i < fieldsExpr.length; i++) compareExprs.push(data.SQExprBuilder.compare(data.QueryComparisonKind.Equal, fieldsExpr[i], values[i]));
                if (!_.isEmpty(compareExprs)) {
                    for (var resultExpr, _i = 0; _i < compareExprs.length; _i++) {
                        var compareExpr = compareExprs[_i];
                        resultExpr = data.SQExprBuilder.and(resultExpr, compareExpr);
                    }
                    return resultExpr;
                }
            }
            function getActiveTablesNames(queryDefn) {
                var tables = [];
                if (queryDefn) {
                    var selectedItems = queryDefn.from();
                    if (void 0 !== selectedItems) for (var _i = 0, _a = selectedItems.keys(); _i < _a.length; _i++) {
                        var key = _a[_i], entityObj = selectedItems.entity(key);
                        tables.indexOf(entityObj.entity) < 0 && tables.push(entityObj.entity);
                    }
                }
                return tables;
            }
            SQExprUtils.getSupportedAggregates = getSupportedAggregates, SQExprUtils.isSupportedAggregate = isSupportedAggregate, 
            SQExprUtils.indexOfExpr = indexOfExpr, SQExprUtils.sequenceEqual = sequenceEqual, 
            SQExprUtils.uniqueName = uniqueName, SQExprUtils.defaultName = defaultName, SQExprUtils.isMeasure = isMeasure, 
            SQExprUtils.isAnyValue = isAnyValue, SQExprUtils.isDefaultValue = isDefaultValue, 
            SQExprUtils.discourageAggregation = discourageAggregation, SQExprUtils.getAggregateBehavior = getAggregateBehavior, 
            SQExprUtils.getSchemaCapabilities = getSchemaCapabilities, SQExprUtils.getKpiMetadata = getKpiMetadata, 
            SQExprUtils.getDefaultValue = getDefaultValue, SQExprUtils.getDefaultValues = getDefaultValues, 
            SQExprUtils.getDataViewScopeIdentityComparisonExpr = getDataViewScopeIdentityComparisonExpr, 
            SQExprUtils.getActiveTablesNames = getActiveTablesNames;
            var SQExprDefaultNameGenerator = function(_super) {
                function SQExprDefaultNameGenerator() {
                    _super.apply(this, arguments);
                }
                return __extends(SQExprDefaultNameGenerator, _super), SQExprDefaultNameGenerator.prototype.visitEntity = function(expr) {
                    return expr.entity;
                }, SQExprDefaultNameGenerator.prototype.visitColumnRef = function(expr) {
                    return expr.source.accept(this) + "." + expr.ref;
                }, SQExprDefaultNameGenerator.prototype.visitMeasureRef = function(expr, fallback) {
                    return expr.source.accept(this) + "." + expr.ref;
                }, SQExprDefaultNameGenerator.prototype.visitAggr = function(expr, fallback) {
                    return data.QueryAggregateFunction[expr.func] + "(" + expr.arg.accept(this) + ")";
                }, SQExprDefaultNameGenerator.prototype.visitConstant = function(expr) {
                    return "const";
                }, SQExprDefaultNameGenerator.prototype.visitDefault = function(expr, fallback) {
                    return fallback || "expr";
                }, SQExprDefaultNameGenerator.instance = new SQExprDefaultNameGenerator(), SQExprDefaultNameGenerator;
            }(data.DefaultSQExprVisitorWithArg), IsMeasureVisitor = function(_super) {
                function IsMeasureVisitor() {
                    _super.apply(this, arguments);
                }
                return __extends(IsMeasureVisitor, _super), IsMeasureVisitor.prototype.visitMeasureRef = function(expr) {
                    return !0;
                }, IsMeasureVisitor.prototype.visitAggr = function(expr) {
                    return !0;
                }, IsMeasureVisitor.prototype.visitDefault = function(expr) {
                    return !1;
                }, IsMeasureVisitor.instance = new IsMeasureVisitor(), IsMeasureVisitor;
            }(data.DefaultSQExprVisitor), IsDefaultValueVisitor = function(_super) {
                function IsDefaultValueVisitor() {
                    _super.apply(this, arguments);
                }
                return __extends(IsDefaultValueVisitor, _super), IsDefaultValueVisitor.prototype.visitCompare = function(expr) {
                    return expr.comparison !== data.QueryComparisonKind.Equal ? !1 : expr.right.accept(this);
                }, IsDefaultValueVisitor.prototype.visitAnd = function(expr) {
                    return expr.left.accept(this) && expr.right.accept(this);
                }, IsDefaultValueVisitor.prototype.visitDefaultValue = function(expr) {
                    return !0;
                }, IsDefaultValueVisitor.prototype.visitDefault = function(expr) {
                    return !1;
                }, IsDefaultValueVisitor.instance = new IsDefaultValueVisitor(), IsDefaultValueVisitor;
            }(data.DefaultSQExprVisitor), IsAnyValueVisitor = function(_super) {
                function IsAnyValueVisitor() {
                    _super.apply(this, arguments);
                }
                return __extends(IsAnyValueVisitor, _super), IsAnyValueVisitor.prototype.visitCompare = function(expr) {
                    return expr.comparison !== data.QueryComparisonKind.Equal ? !1 : expr.right.accept(this);
                }, IsAnyValueVisitor.prototype.visitAnd = function(expr) {
                    return expr.left.accept(this) && expr.right.accept(this);
                }, IsAnyValueVisitor.prototype.visitAnyValue = function(expr) {
                    return !0;
                }, IsAnyValueVisitor.prototype.visitDefault = function(expr) {
                    return !1;
                }, IsAnyValueVisitor.instance = new IsAnyValueVisitor(), IsAnyValueVisitor;
            }(data.DefaultSQExprVisitor);
        }(SQExprUtils = data.SQExprUtils || (data.SQExprUtils = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var SemanticQueryRewriter = function() {
            function SemanticQueryRewriter(exprRewriter) {
                this.exprRewriter = exprRewriter;
            }
            return SemanticQueryRewriter.prototype.rewriteFrom = function(fromValue) {
                for (var fromContents = {}, originalFrom = fromValue, originalFromKeys = originalFrom.keys(), i = 0, len = originalFromKeys.length; len > i; i++) {
                    var keyName = originalFromKeys[i], originalEntityRef = originalFrom.entity(keyName), originalEntityExpr = data.SQExprBuilder.entity(originalEntityRef.schema, originalEntityRef.entity, keyName), updatedEntityExpr = originalEntityExpr.accept(this.exprRewriter);
                    fromContents[keyName] = {
                        schema: updatedEntityExpr.schema,
                        entity: updatedEntityExpr.entity
                    };
                }
                return new data.SQFrom(fromContents);
            }, SemanticQueryRewriter.prototype.rewriteSelect = function(selectItems, from) {
                return this.rewriteNamedSQExpressions(selectItems, from);
            }, SemanticQueryRewriter.prototype.rewriteGroupBy = function(groupByitems, from) {
                return _.isEmpty(groupByitems) ? void 0 : this.rewriteNamedSQExpressions(groupByitems, from);
            }, SemanticQueryRewriter.prototype.rewriteNamedSQExpressions = function(expressions, from) {
                var _this = this;
                return _.map(expressions, function(item) {
                    return {
                        name: item.name,
                        expr: data.SQExprRewriterWithSourceRenames.rewrite(item.expr.accept(_this.exprRewriter), from)
                    };
                });
            }, SemanticQueryRewriter.prototype.rewriteOrderBy = function(orderByItems, from) {
                if (!_.isEmpty(orderByItems)) {
                    for (var orderBy = [], i = 0, len = orderByItems.length; len > i; i++) {
                        var item = orderByItems[i], updatedExpr = data.SQExprRewriterWithSourceRenames.rewrite(item.expr.accept(this.exprRewriter), from);
                        orderBy.push({
                            direction: item.direction,
                            expr: updatedExpr
                        });
                    }
                    return orderBy;
                }
            }, SemanticQueryRewriter.prototype.rewriteWhere = function(whereItems, from) {
                var _this = this;
                if (!_.isEmpty(whereItems)) {
                    for (var where = [], i = 0, len = whereItems.length; len > i; i++) {
                        var originalWhere = whereItems[i], updatedWhere = {
                            condition: data.SQExprRewriterWithSourceRenames.rewrite(originalWhere.condition.accept(this.exprRewriter), from)
                        };
                        originalWhere.target && (updatedWhere.target = _.map(originalWhere.target, function(e) {
                            return data.SQExprRewriterWithSourceRenames.rewrite(e.accept(_this.exprRewriter), from);
                        })), where.push(updatedWhere);
                    }
                    return where;
                }
            }, SemanticQueryRewriter;
        }();
        data.SemanticQueryRewriter = SemanticQueryRewriter;
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var ArrayExtensions = jsCommon.ArrayExtensions, SemanticQuery = function() {
            function SemanticQuery(from, where, orderBy, select, groupBy) {
                this.fromValue = from, this.whereItems = where, this.orderByItems = orderBy, this.selectItems = select, 
                this.groupByItems = groupBy;
            }
            return SemanticQuery.create = function() {
                return SemanticQuery.empty || (SemanticQuery.empty = new SemanticQuery(new SQFrom(), null, null, [], null)), 
                SemanticQuery.empty;
            }, SemanticQuery.createWithTrimmedFrom = function(from, where, orderBy, select, groupBy) {
                var unreferencedKeyFinder = new UnreferencedKeyFinder(from.keys());
                if (where) for (var i = 0, len = where.length; len > i; i++) {
                    var filter = where[i];
                    filter.condition.accept(unreferencedKeyFinder);
                    var filterTarget = filter.target;
                    if (filterTarget) for (var j = 0, jlen = filterTarget.length; jlen > j; j++) filterTarget[j] && filterTarget[j].accept(unreferencedKeyFinder);
                }
                if (orderBy) for (var i = 0, len = orderBy.length; len > i; i++) orderBy[i].expr.accept(unreferencedKeyFinder);
                for (var i = 0, len = select.length; len > i; i++) select[i].expr.accept(unreferencedKeyFinder);
                if (groupBy) for (var i = 0, len = groupBy.length; len > i; i++) groupBy[i].expr.accept(unreferencedKeyFinder);
                for (var unreferencedKeys = unreferencedKeyFinder.result(), i = 0, len = unreferencedKeys.length; len > i; i++) from.remove(unreferencedKeys[i]);
                return new SemanticQuery(from, where, orderBy, select, groupBy);
            }, SemanticQuery.prototype.from = function() {
                return this.fromValue.clone();
            }, SemanticQuery.prototype.select = function(values) {
                return _.isEmpty(arguments) ? this.getSelect() : this.setSelect(values);
            }, SemanticQuery.prototype.getSelect = function() {
                return SemanticQuery.createNamedExpressionArray(this.selectItems);
            }, SemanticQuery.createNamedExpressionArray = function(items) {
                return ArrayExtensions.extendWithName(_.map(items, function(s) {
                    return {
                        name: s.name,
                        expr: s.expr
                    };
                }));
            }, SemanticQuery.prototype.setSelect = function(values) {
                var from = this.fromValue.clone(), selectItems = SemanticQuery.rewriteExpressionsWithSourceRenames(values, from);
                return SemanticQuery.createWithTrimmedFrom(from, this.whereItems, this.orderByItems, selectItems, this.groupByItems);
            }, SemanticQuery.rewriteExpressionsWithSourceRenames = function(values, from) {
                for (var items = [], i = 0, len = values.length; len > i; i++) {
                    var value = values[i];
                    items.push({
                        name: value.name,
                        expr: SQExprRewriterWithSourceRenames.rewrite(value.expr, from)
                    });
                }
                return items;
            }, SemanticQuery.prototype.removeSelect = function(expr) {
                for (var originalItems = this.selectItems, selectItems = [], i = 0, len = originalItems.length; len > i; i++) {
                    var originalExpr = originalItems[i];
                    data.SQExpr.equals(originalExpr.expr, expr) || selectItems.push(originalExpr);
                }
                return SemanticQuery.createWithTrimmedFrom(this.fromValue.clone(), this.whereItems, this.orderByItems, selectItems, this.groupByItems);
            }, SemanticQuery.prototype.removeOrderBy = function(expr) {
                for (var sorts = this.orderBy(), i = sorts.length - 1; i >= 0; i--) data.SQExpr.equals(sorts[i].expr, expr) && sorts.splice(i, 1);
                return SemanticQuery.createWithTrimmedFrom(this.fromValue.clone(), this.whereItems, sorts, this.selectItems, this.groupByItems);
            }, SemanticQuery.prototype.selectNameOf = function(expr) {
                var index = data.SQExprUtils.indexOfExpr(_.map(this.selectItems, function(s) {
                    return s.expr;
                }), expr);
                return index >= 0 ? this.selectItems[index].name : void 0;
            }, SemanticQuery.prototype.setSelectAt = function(index, expr) {
                if (!(index >= this.selectItems.length)) {
                    var select = this.select(), from = this.fromValue.clone(), originalName = select[index].name;
                    return select[index] = {
                        name: originalName,
                        expr: SQExprRewriterWithSourceRenames.rewrite(expr, from)
                    }, SemanticQuery.createWithTrimmedFrom(from, this.whereItems, this.orderByItems, select, this.groupByItems);
                }
            }, SemanticQuery.prototype.addSelect = function(expr) {
                var selectItems = this.select(), from = this.fromValue.clone();
                return selectItems.push({
                    name: data.SQExprUtils.uniqueName(selectItems, expr),
                    expr: SQExprRewriterWithSourceRenames.rewrite(expr, from)
                }), SemanticQuery.createWithTrimmedFrom(from, this.whereItems, this.orderByItems, selectItems, this.groupByItems);
            }, SemanticQuery.prototype.groupBy = function(values) {
                return _.isEmpty(arguments) ? this.getGroupBy() : this.setGroupBy(values);
            }, SemanticQuery.prototype.getGroupBy = function() {
                return SemanticQuery.createNamedExpressionArray(this.groupByItems);
            }, SemanticQuery.prototype.setGroupBy = function(values) {
                var from = this.fromValue.clone(), groupByItems = SemanticQuery.rewriteExpressionsWithSourceRenames(values, from);
                return SemanticQuery.createWithTrimmedFrom(from, this.whereItems, this.orderByItems, this.selectItems, groupByItems);
            }, SemanticQuery.prototype.orderBy = function(values) {
                return _.isEmpty(arguments) ? this.getOrderBy() : this.setOrderBy(values);
            }, SemanticQuery.prototype.getOrderBy = function() {
                var result = [], orderBy = this.orderByItems;
                if (orderBy) for (var i = 0, len = orderBy.length; len > i; i++) {
                    var clause = orderBy[i];
                    result.push({
                        expr: clause.expr,
                        direction: clause.direction
                    });
                }
                return result;
            }, SemanticQuery.prototype.setOrderBy = function(values) {
                for (var updatedOrderBy = [], from = this.fromValue.clone(), i = 0, len = values.length; len > i; i++) {
                    var clause = values[i];
                    updatedOrderBy.push({
                        expr: SQExprRewriterWithSourceRenames.rewrite(clause.expr, from),
                        direction: clause.direction
                    });
                }
                return SemanticQuery.createWithTrimmedFrom(from, this.whereItems, updatedOrderBy, this.selectItems, this.groupByItems);
            }, SemanticQuery.prototype.where = function(values) {
                return _.isEmpty(arguments) ? this.getWhere() : this.setWhere(values);
            }, SemanticQuery.prototype.getWhere = function() {
                var result = [], whereItems = this.whereItems;
                if (whereItems) for (var i = 0, len = whereItems.length; len > i; i++) result.push(whereItems[i]);
                return result;
            }, SemanticQuery.prototype.setWhere = function(values) {
                for (var updatedWhere = [], from = this.fromValue.clone(), i = 0, len = values.length; len > i; i++) {
                    var filter = values[i], updatedFilter = {
                        condition: SQExprRewriterWithSourceRenames.rewrite(filter.condition, from)
                    }, filterTarget = filter.target;
                    if (filterTarget) {
                        updatedFilter.target = [];
                        for (var j = 0, jlen = filterTarget.length; jlen > j; j++) if (filterTarget[j]) {
                            var updatedTarget = SQExprRewriterWithSourceRenames.rewrite(filterTarget[j], from);
                            updatedFilter.target.push(updatedTarget);
                        }
                    }
                    updatedWhere.push(updatedFilter);
                }
                return SemanticQuery.createWithTrimmedFrom(from, updatedWhere, this.orderByItems, this.selectItems, this.groupByItems);
            }, SemanticQuery.prototype.addWhere = function(filter) {
                for (var updatedWhere = this.where(), incomingWhere = filter.where(), from = this.fromValue.clone(), i = 0, len = incomingWhere.length; len > i; i++) {
                    var clause = incomingWhere[i], updatedClause = {
                        condition: SQExprRewriterWithSourceRenames.rewrite(clause.condition, from)
                    };
                    clause.target && (updatedClause.target = _.map(clause.target, function(t) {
                        return SQExprRewriterWithSourceRenames.rewrite(t, from);
                    })), updatedWhere.push(updatedClause);
                }
                return SemanticQuery.createWithTrimmedFrom(from, updatedWhere, this.orderByItems, this.selectItems, this.groupByItems);
            }, SemanticQuery.prototype.rewrite = function(exprRewriter) {
                var rewriter = new data.SemanticQueryRewriter(exprRewriter), from = rewriter.rewriteFrom(this.fromValue), where = rewriter.rewriteWhere(this.whereItems, from), orderBy = rewriter.rewriteOrderBy(this.orderByItems, from), select = rewriter.rewriteSelect(this.selectItems, from), groupBy = rewriter.rewriteGroupBy(this.groupByItems, from);
                return SemanticQuery.createWithTrimmedFrom(from, where, orderBy, select, groupBy);
            }, SemanticQuery;
        }();
        data.SemanticQuery = SemanticQuery;
        var SemanticFilter = function() {
            function SemanticFilter(from, where) {
                this.fromValue = from, this.whereItems = where;
            }
            return SemanticFilter.fromSQExpr = function(contract) {
                var from = new SQFrom(), rewrittenContract = SQExprRewriterWithSourceRenames.rewrite(contract, from), where = [ {
                    condition: rewrittenContract
                } ];
                return new SemanticFilter(from, where);
            }, SemanticFilter.getDefaultValueFilter = function(fieldSQExprs) {
                return SemanticFilter.getDataViewScopeIdentityComparisonFilters(fieldSQExprs, data.SQExprBuilder.defaultValue());
            }, SemanticFilter.getAnyValueFilter = function(fieldSQExprs) {
                return SemanticFilter.getDataViewScopeIdentityComparisonFilters(fieldSQExprs, data.SQExprBuilder.anyValue());
            }, SemanticFilter.getDataViewScopeIdentityComparisonFilters = function(fieldSQExprs, value) {
                if (fieldSQExprs instanceof Array) {
                    var values = Array.apply(null, Array(fieldSQExprs.length)).map(function() {
                        return value;
                    });
                    return SemanticFilter.fromSQExpr(data.SQExprUtils.getDataViewScopeIdentityComparisonExpr(fieldSQExprs, values));
                }
                return SemanticFilter.fromSQExpr(data.SQExprBuilder.equal(fieldSQExprs, value));
            }, SemanticFilter.prototype.from = function() {
                return this.fromValue.clone();
            }, SemanticFilter.prototype.conditions = function() {
                for (var expressions = [], where = this.whereItems, i = 0, len = where.length; len > i; i++) {
                    var filter = where[i];
                    expressions.push(filter.condition);
                }
                return expressions;
            }, SemanticFilter.prototype.where = function() {
                for (var result = [], whereItems = this.whereItems, i = 0, len = whereItems.length; len > i; i++) result.push(whereItems[i]);
                return result;
            }, SemanticFilter.prototype.rewrite = function(exprRewriter) {
                var rewriter = new data.SemanticQueryRewriter(exprRewriter), from = rewriter.rewriteFrom(this.fromValue), where = rewriter.rewriteWhere(this.whereItems, from);
                return new SemanticFilter(from, where);
            }, SemanticFilter.prototype.validate = function(schema, errors) {
                var validator = new data.SQExprValidationVisitor(schema, errors);
                return this.rewrite(validator), validator.errors;
            }, SemanticFilter.merge = function(filters) {
                if (_.isEmpty(filters)) return null;
                if (1 === filters.length) return filters[0];
                for (var firstFilter = filters[0], from = firstFilter.from(), where = ArrayExtensions.take(firstFilter.whereItems, firstFilter.whereItems.length), i = 1, len = filters.length; len > i; i++) SemanticFilter.applyFilter(filters[i], from, where);
                return new SemanticFilter(from, where);
            }, SemanticFilter.isDefaultFilter = function(filter) {
                return filter && 1 === filter.where().length ? data.SQExprUtils.isDefaultValue(filter.where()[0].condition) : !1;
            }, SemanticFilter.isAnyFilter = function(filter) {
                return filter && 1 === filter.where().length ? data.SQExprUtils.isAnyValue(filter.where()[0].condition) : !1;
            }, SemanticFilter.isSameFilter = function(leftFilter, rightFilter) {
                return jsCommon.JsonComparer.equals(leftFilter, rightFilter) ? !(SemanticFilter.isDefaultFilter(leftFilter) && SemanticFilter.isAnyFilter(rightFilter) || SemanticFilter.isAnyFilter(leftFilter) && SemanticFilter.isDefaultFilter(rightFilter)) : !1;
            }, SemanticFilter.applyFilter = function(filter, from, where) {
                for (var filterWhereItems = filter.whereItems, i = 0; i < filterWhereItems.length; i++) {
                    var filterWhereItem = filterWhereItems[i], updatedWhereItem = {
                        condition: SQExprRewriterWithSourceRenames.rewrite(filterWhereItem.condition, from)
                    };
                    filterWhereItem.target && (updatedWhereItem.target = _.map(filterWhereItem.target, function(e) {
                        return SQExprRewriterWithSourceRenames.rewrite(e, from);
                    })), where.push(updatedWhereItem);
                }
            }, SemanticFilter;
        }();
        data.SemanticFilter = SemanticFilter;
        var SQFrom = function() {
            function SQFrom(items) {
                this.items = items || {};
            }
            return SQFrom.prototype.keys = function() {
                return Object.keys(this.items);
            }, SQFrom.prototype.entity = function(key) {
                return this.items[key];
            }, SQFrom.prototype.ensureEntity = function(entity, desiredVariableName) {
                for (var keys = this.keys(), i_1 = 0, len = keys.length; len > i_1; i_1++) {
                    var key = keys[i_1], item = this.items[key];
                    if (item && entity.entity === item.entity && entity.schema === item.schema) return {
                        name: key
                    };
                }
                for (var candidateName = desiredVariableName || this.candidateName(entity.entity), uniqueName = candidateName, i = 2; this.items[uniqueName]; ) uniqueName = candidateName + i++;
                return this.items[uniqueName] = entity, {
                    name: uniqueName,
                    "new": !0
                };
            }, SQFrom.prototype.remove = function(key) {
                delete this.items[key];
            }, SQFrom.prototype.candidateName = function(ref) {
                var idx = ref.lastIndexOf(".");
                return idx >= 0 && idx !== ref.length - 1 && (ref = ref.substr(idx + 1)), ref.substring(0, 1).toLowerCase();
            }, SQFrom.prototype.clone = function() {
                var cloned = new SQFrom();
                return $.extend(cloned.items, this.items), cloned;
            }, SQFrom;
        }();
        data.SQFrom = SQFrom;
        var SQExprRewriterWithSourceRenames = function(_super) {
            function SQExprRewriterWithSourceRenames(renames) {
                _super.call(this), this.renames = renames;
            }
            return __extends(SQExprRewriterWithSourceRenames, _super), SQExprRewriterWithSourceRenames.prototype.visitEntity = function(expr) {
                var updatedName = this.renames[expr.entity];
                return updatedName ? new data.SQEntityExpr(expr.schema, expr.entity, updatedName) : _super.prototype.visitEntity.call(this, expr);
            }, SQExprRewriterWithSourceRenames.prototype.rewriteFilter = function(filter) {
                var updatedTargets = void 0;
                filter.target && (updatedTargets = this.rewriteArray(filter.target));
                var updatedCondition = filter.condition.accept(this);
                if (filter.condition === updatedCondition && filter.target === updatedTargets) return filter;
                var updatedFilter = {
                    condition: updatedCondition
                };
                return updatedTargets && (updatedFilter.target = updatedTargets), updatedFilter;
            }, SQExprRewriterWithSourceRenames.prototype.rewriteArray = function(exprs) {
                for (var updatedExprs, i = 0, len = exprs.length; len > i; i++) {
                    var expr = exprs[i], rewrittenExpr = expr.accept(this);
                    expr === rewrittenExpr || updatedExprs || (updatedExprs = ArrayExtensions.take(exprs, i)), 
                    updatedExprs && updatedExprs.push(rewrittenExpr);
                }
                return updatedExprs || exprs;
            }, SQExprRewriterWithSourceRenames.rewrite = function(expr, from) {
                var renames = QuerySourceRenameDetector.run(expr, from), rewriter = new SQExprRewriterWithSourceRenames(renames);
                return expr.accept(rewriter);
            }, SQExprRewriterWithSourceRenames;
        }(data.SQExprRewriter);
        data.SQExprRewriterWithSourceRenames = SQExprRewriterWithSourceRenames;
        var QuerySourceRenameDetector = function(_super) {
            function QuerySourceRenameDetector(from) {
                _super.call(this), this.from = from, this.renames = {};
            }
            return __extends(QuerySourceRenameDetector, _super), QuerySourceRenameDetector.run = function(expr, from) {
                var detector = new QuerySourceRenameDetector(from);
                return expr.accept(detector), detector.renames;
            }, QuerySourceRenameDetector.prototype.visitEntity = function(expr) {
                var existingEntity = this.from.entity(expr.variable);
                if (!existingEntity || existingEntity.schema !== expr.schema || existingEntity.entity !== expr.entity) {
                    var actualEntity = this.from.ensureEntity({
                        schema: expr.schema,
                        entity: expr.entity
                    }, expr.variable);
                    this.renames[expr.entity] = actualEntity.name;
                }
            }, QuerySourceRenameDetector;
        }(data.DefaultSQExprVisitorWithTraversal), UnreferencedKeyFinder = function(_super) {
            function UnreferencedKeyFinder(keys) {
                _super.call(this), this.keys = keys;
            }
            return __extends(UnreferencedKeyFinder, _super), UnreferencedKeyFinder.prototype.visitEntity = function(expr) {
                var index = this.keys.indexOf(expr.variable);
                index >= 0 && this.keys.splice(index, 1);
            }, UnreferencedKeyFinder.prototype.result = function() {
                return this.keys;
            }, UnreferencedKeyFinder;
        }(data.DefaultSQExprVisitorWithTraversal);
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data_4) {
        function createCategoricalDataViewBuilder() {
            return new CategoricalDataViewBuilder();
        }
        function getScopeIdentity(source, index, value, valueType) {
            var identities = source.identities;
            return identities ? identities[index] : data_4.createDataViewScopeIdentity(SQExprBuilder.equal(source.fields[0], SQExprBuilder.typedConstant(value, valueType)));
        }
        function pushIfNotExists(items, itemToAdd) {
            _.contains(items, itemToAdd) || items.push(itemToAdd);
        }
        function applySeriesData(target, source, categoryLength) {
            var values = source.values;
            target.values = values;
            var highlights = source.highlights;
            highlights && (target.highlights = highlights), void 0 !== source.minLocal && (target.minLocal = source.minLocal), 
            void 0 !== source.maxLocal && (target.maxLocal = source.maxLocal);
        }
        var DataViewTransform = powerbi.data.DataViewTransform, SQExprBuilder = powerbi.data.SQExprBuilder;
        data_4.createCategoricalDataViewBuilder = createCategoricalDataViewBuilder;
        var CategoricalDataViewBuilder = function() {
            function CategoricalDataViewBuilder() {
                this.categories = [], this.measureColumns = [], this.columnIndex = 0;
            }
            return CategoricalDataViewBuilder.prototype.withCategory = function(options) {
                var categoryValues = options.values, identityFrom = options.identityFrom, type = options.source.type, categoryColumn = {
                    source: options.source,
                    identityFields: options.identityFrom.fields,
                    identity: options.identityFrom.identities || [],
                    values: categoryValues
                };
                if (!options.identityFrom.identities) for (var categoryIndex = 0, categoryLength = categoryValues.length; categoryLength > categoryIndex; categoryIndex++) categoryColumn.identity.push(getScopeIdentity(identityFrom, categoryIndex, categoryValues[categoryIndex], type));
                return this.categories || (this.categories = []), this.categories.push(categoryColumn), 
                this;
            }, CategoricalDataViewBuilder.prototype.withCategories = function(categories) {
                return _.isEmpty(this.categories) ? this.categories = categories : Array.prototype.push.apply(this.categories, categories), 
                this;
            }, CategoricalDataViewBuilder.prototype.withValues = function(options) {
                for (var columns = options.columns, _i = 0; _i < columns.length; _i++) {
                    var column = columns[_i];
                    this.measureColumns.push(column.source);
                }
                return this.data = columns, this;
            }, CategoricalDataViewBuilder.prototype.withGroupedValues = function(options) {
                this.hasDynamicSeries = !0;
                var groupColumn = options.groupColumn;
                this.dynamicSeriesMetadata = {
                    column: groupColumn.source,
                    identityFrom: groupColumn.identityFrom,
                    values: groupColumn.values
                };
                for (var valueColumns = options.valueColumns, _i = 0; _i < valueColumns.length; _i++) {
                    var valueColumn = valueColumns[_i];
                    this.measureColumns.push(valueColumn.source);
                }
                return this.data = options.data, this;
            }, CategoricalDataViewBuilder.prototype.fillData = function(dataViewValues, groups) {
                var categoryColumn = _.first(this.categories), categoryLength = categoryColumn && categoryColumn.values ? categoryColumn.values.length : 1;
                if (this.hasDynamicSeries) for (var data_5 = this.data, seriesIndex = 0; seriesIndex < this.dynamicSeriesMetadata.values.length; seriesIndex++) for (var seriesMeasures = data_5[seriesIndex], measureIndex = 0, measuresLen = this.measureColumns.length; measuresLen > measureIndex; measureIndex++) {
                    var groupIndex = seriesIndex * measuresLen + measureIndex;
                    applySeriesData(dataViewValues[groupIndex], seriesMeasures[measureIndex], categoryLength);
                } else for (var data_6 = this.data, measureIndex = 0, measuresLen = this.measureColumns.length; measuresLen > measureIndex; measureIndex++) applySeriesData(dataViewValues[measureIndex], data_6[measureIndex], categoryLength);
            }, CategoricalDataViewBuilder.prototype.build = function() {
                for (var groups, metadataColumns = [], categorical = {}, categoryMetadata = this.categories, dynamicSeriesMetadata = this.dynamicSeriesMetadata, _i = 0; _i < categoryMetadata.length; _i++) {
                    var columnMetadata = categoryMetadata[_i];
                    pushIfNotExists(metadataColumns, columnMetadata.source);
                }
                if (this.hasDynamicSeries && pushIfNotExists(metadataColumns, dynamicSeriesMetadata.column), 
                this.hasDynamicSeries) {
                    categorical.values = DataViewTransform.createValueColumns([], dynamicSeriesMetadata.identityFrom.fields, dynamicSeriesMetadata.column);
                    var measures = this.measureColumns;
                    groups = [];
                    for (var seriesValues = dynamicSeriesMetadata.values, seriesIndex = 0; seriesIndex < seriesValues.length; seriesIndex++) for (var seriesValue = seriesValues[seriesIndex], seriesIdentity = getScopeIdentity(dynamicSeriesMetadata.identityFrom, seriesIndex, seriesValue, dynamicSeriesMetadata.column.type), _a = 0; _a < measures.length; _a++) {
                        var measure = measures[_a], column = _.clone(measure);
                        column.groupName = seriesValue, groups.push(column), pushIfNotExists(metadataColumns, column), 
                        categorical.values.push({
                            source: column,
                            values: [],
                            identity: seriesIdentity
                        });
                    }
                } else {
                    categorical.values = DataViewTransform.createValueColumns(), groups = this.measureColumns;
                    for (var _b = 0; _b < groups.length; _b++) {
                        var measure = groups[_b], column = measure;
                        pushIfNotExists(metadataColumns, column), categorical.values.push({
                            source: column,
                            values: []
                        });
                    }
                }
                var categories = this.categories;
                return _.isEmpty(categories) || (categorical.categories = categories), this.fillData(categorical.values, groups), 
                {
                    metadata: {
                        columns: metadataColumns
                    },
                    categorical: categorical
                };
            }, CategoricalDataViewBuilder;
        }();
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        function createStaticEvalContext(dataView, selectTransforms) {
            return new StaticEvalContext(dataView || {
                metadata: {
                    columns: []
                }
            }, selectTransforms);
        }
        function getExprValueFromTable(expr, selectTransforms, table, rowIdx) {
            var rows = table.rows;
            if (!(_.isEmpty(rows) || rows.length <= rowIdx)) for (var cols = table.columns, selectIdx = 0, selectLen = selectTransforms.length; selectLen > selectIdx; selectIdx++) {
                var selectTransform = selectTransforms[selectIdx];
                if (SQExpr.equals(selectTransform.expr, expr) && selectTransform.queryName) for (var colIdx = 0, colLen = cols.length; colLen > colIdx; colIdx++) if (selectIdx === cols[colIdx].index) return rows[rowIdx][colIdx];
            }
        }
        var SQExpr = powerbi.data.SQExpr;
        data.createStaticEvalContext = createStaticEvalContext;
        var StaticEvalContext = function() {
            function StaticEvalContext(dataView, selectTransforms) {
                this.dataView = dataView, this.selectTransforms = selectTransforms;
            }
            return StaticEvalContext.prototype.getExprValue = function(expr) {
                var dataView = this.dataView, selectTransforms = this.selectTransforms;
                return dataView && dataView.table && selectTransforms ? getExprValueFromTable(expr, selectTransforms, dataView.table, 0) : void 0;
            }, StaticEvalContext.prototype.getRoleValue = function(roleName) {}, StaticEvalContext;
        }();
        data.getExprValueFromTable = getExprValueFromTable;
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        function createMatrixEvalContext(dataViewMatrix) {
            return data.createStaticEvalContext();
        }
        data.createMatrixEvalContext = createMatrixEvalContext;
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi_1) {
    var FormattingEncoder, StringExtensions = jsCommon.StringExtensions, Formatting = jsCommon.Formatting, RegExpExtensions = jsCommon.RegExpExtensions;
    !function(FormattingEncoder) {
        function preserveEscaped(format, specialChars) {
            for (var length = specialChars.length, i = 0; length > i; i++) {
                var oldText = "\\" + specialChars[i], newText = String.fromCharCode(57344 + i);
                format = StringExtensions.replaceAll(format, oldText, newText);
            }
            return format;
        }
        function restoreEscaped(format, specialChars) {
            for (var length = specialChars.length, i = 0; length > i; i++) {
                var oldText = String.fromCharCode(57344 + i), newText = specialChars[i];
                format = StringExtensions.replaceAll(format, oldText, newText);
            }
            return StringExtensions.replaceAll(format, "\\", "");
        }
        function preserveLiterals(format, literals) {
            format = StringExtensions.replaceAll(format, '"', "'");
            for (var i = 0; ;i++) {
                var fromIndex = format.indexOf("'");
                if (0 > fromIndex) break;
                var toIndex = format.indexOf("'", fromIndex + 1);
                if (0 > toIndex) break;
                var literal = format.substring(fromIndex, toIndex + 1);
                literals.push(literal.substring(1, toIndex - fromIndex));
                var token = String.fromCharCode(57600 + i);
                format = format.replace(literal, token);
            }
            return format;
        }
        function restoreLiterals(format, literals) {
            for (var count = literals.length, i = 0; count > i; i++) {
                var token = String.fromCharCode(57600 + i), literal = literals[i];
                format = format.replace(token, literal);
            }
            return format;
        }
        FormattingEncoder.preserveEscaped = preserveEscaped, FormattingEncoder.restoreEscaped = restoreEscaped, 
        FormattingEncoder.preserveLiterals = preserveLiterals, FormattingEncoder.restoreLiterals = restoreLiterals;
    }(FormattingEncoder || (FormattingEncoder = {}));
    var DateTimeFormat, IndexedTokensRegex = /({{)|(}})|{(\d+[^}]*)}/g, ZeroPlaceholder = "0", DigitPlaceholder = "#", ExponentialFormatChar = "E", NumericPlaceholders = [ ZeroPlaceholder, DigitPlaceholder ], NumericPlaceholderRegex = new RegExp(NumericPlaceholders.join("|"), "g"), FormattingService = function() {
        function FormattingService() {}
        return FormattingService.prototype.formatValue = function(value, format, culture) {
            if (void 0 === value || null === value) return "";
            var gculture = this.getCulture(culture);
            return DateTimeFormat.canFormat(value) ? DateTimeFormat.format(value, format, gculture) : NumberFormat.canFormat(value) ? NumberFormat.format(value, format, gculture) : value.toString();
        }, FormattingService.prototype.format = function(formatWithIndexedTokens, args, culture) {
            var _this = this;
            if (!formatWithIndexedTokens) return "";
            var result = formatWithIndexedTokens.replace(IndexedTokensRegex, function(match, left, right, argToken) {
                if (left) return "{";
                if (right) return "}";
                var parts = argToken.split(":"), argIndex = parseInt(parts[0], 10), argFormat = parts[1];
                return _this.formatValue(args[argIndex], argFormat, culture);
            });
            return result;
        }, FormattingService.prototype.isStandardNumberFormat = function(format) {
            return NumberFormat.isStandardFormat(format);
        }, FormattingService.prototype.formatNumberWithCustomOverride = function(value, format, nonScientificOverrideFormat, culture) {
            var gculture = this.getCulture(culture);
            return NumberFormat.formatWithCustomOverride(value, format, nonScientificOverrideFormat, gculture);
        }, FormattingService.prototype.dateFormatString = function(unit) {
            return this._dateTimeScaleFormatInfo.getFormatString(unit);
        }, FormattingService.prototype.setCurrentCulture = function(cultureSelector) {
            this._currentCultureSelector !== cultureSelector && (this._currentCulture = this.getCulture(cultureSelector), 
            this._currentCultureSelector = cultureSelector, this._dateTimeScaleFormatInfo = new DateTimeScaleFormatInfo(this._currentCulture));
        }, FormattingService.prototype.getCulture = function(cultureSelector) {
            if (null == cultureSelector) return null == this._currentCulture && this.initialize(), 
            this._currentCulture;
            var culture = Globalize.findClosestCulture(cultureSelector);
            return culture || (culture = Globalize.culture("en-US")), culture;
        }, FormattingService.prototype.initialize = function() {
            var cultureName = this.getCurrentCulture();
            this.setCurrentCulture(cultureName);
            var calendarName = this.getUrlParam("calendar");
            if (calendarName) {
                var culture = this._currentCulture, c = culture.calendars[calendarName];
                c && (culture.calendar = c);
            }
        }, FormattingService.prototype.getCurrentCulture = function() {
            var urlParam = this.getUrlParam("language");
            return urlParam ? urlParam : powerbi && powerbi.common && powerbi.common.cultureInfo ? powerbi.common.cultureInfo : window.navigator.userLanguage || window.navigator.language || Globalize.culture().name;
        }, FormattingService.prototype.getUrlParam = function(name) {
            var param = window.location.search.match(RegExp("[?&]" + name + "=([^&]*)"));
            return param ? param[1] : void 0;
        }, FormattingService;
    }();
    !function(DateTimeFormat) {
        function canFormat(value) {
            var result = value instanceof Date;
            return result;
        }
        function format(value, format, culture) {
            format = format || "G";
            var isStandard = 1 === format.length;
            try {
                return isStandard ? formatDateStandard(value, format, culture) : formatDateCustom(value, format, culture);
            } catch (e) {
                return formatDateStandard(value, "G", culture);
            }
        }
        function formatDateStandard(value, format, culture) {
            var patterns = culture.calendar.patterns;
            ensurePatterns(culture.calendar);
            var output = Formatting.findDateFormat(value, format, culture.name);
            return format = 1 === output.format.length ? patterns[output.format] : output.format, 
            culture = Globalize.culture("en-US"), Globalize.format(output.value, format, culture);
        }
        function formatDateCustom(value, format, culture) {
            var result, literals = [];
            if (format = FormattingEncoder.preserveEscaped(format, "\\dfFghHKmstyz:/%'\""), 
            format = FormattingEncoder.preserveLiterals(format, literals), format = StringExtensions.replaceAll(format, '"', "'"), 
            format.indexOf("F") > -1) {
                format = StringExtensions.replaceAll(format, "FFFF", "FFF");
                var milliseconds = value.getMilliseconds();
                if (milliseconds % 10 >= 1 && (format = StringExtensions.replaceAll(format, "FFF", "fff")), 
                format = StringExtensions.replaceAll(format, "FFF", "FF"), milliseconds % 100 / 10 >= 1 && (format = StringExtensions.replaceAll(format, "FF", "ff")), 
                format = StringExtensions.replaceAll(format, "FF", "F"), milliseconds % 1e3 / 100 >= 1 && (format = StringExtensions.replaceAll(format, "F", "f")), 
                format = StringExtensions.replaceAll(format, "F", ""), "" === format || "%" === format) return "";
            }
            return format = processCustomDateTimeFormat(format), result = Globalize.format(value, format, culture), 
            result = localize(result, culture.calendar), result = FormattingEncoder.restoreLiterals(result, literals), 
            result = FormattingEncoder.restoreEscaped(result, "\\dfFghHKmstyz:/%'\"");
        }
        function processCustomDateTimeFormat(format) {
            return format === _currentCachedFormat ? _currentCachedProcessedFormat : (_currentCachedFormat = format, 
            format = Formatting.fixDateTimeFormat(format), _currentCachedProcessedFormat = format, 
            format);
        }
        function localize(value, dictionary) {
            var timeSeparator = dictionary[":"];
            if (":" === timeSeparator) return value;
            for (var result = "", count = value.length, i = 0; count > i; i++) {
                var char = value.charAt(i);
                switch (char) {
                  case ":":
                    result += timeSeparator;
                    break;

                  default:
                    result += char;
                }
            }
            return result;
        }
        function ensurePatterns(calendar) {
            var patterns = calendar.patterns;
            void 0 === patterns.g && (patterns.g = patterns.f.replace(patterns.D, patterns.d), 
            patterns.G = patterns.F.replace(patterns.D, patterns.d));
        }
        var _currentCachedFormat, _currentCachedProcessedFormat;
        DateTimeFormat.canFormat = canFormat, DateTimeFormat.format = format;
    }(DateTimeFormat || (DateTimeFormat = {}));
    var NumberFormat;
    !function(NumberFormat) {
        function getNonScientificFormatWithPrecision(baseFormat, numericFormat) {
            if (!numericFormat || void 0 === baseFormat) return baseFormat;
            var newFormat = "{0:" + numericFormat + "}";
            return baseFormat.replace("{0}", newFormat);
        }
        function getNumericFormat(value, baseFormat) {
            if (null == baseFormat) return baseFormat;
            if (hasFormatComponents(baseFormat)) {
                var _a = NumberFormat.getComponents(baseFormat), positive = _a.positive, negative = _a.negative, zero = _a.zero;
                return value > 0 ? getNumericFormatFromComponent(value, positive) : 0 === value ? getNumericFormatFromComponent(value, zero) : getNumericFormatFromComponent(value, negative);
            }
            return getNumericFormatFromComponent(value, baseFormat);
        }
        function getNumericFormatFromComponent(value, format) {
            var match = RegExpExtensions.run(NumericFormatRegex, format);
            return match ? match[0] : format;
        }
        function addDecimalsToFormat(baseFormat, decimals, trailingZeros) {
            if (null == decimals) return baseFormat;
            if (null == baseFormat && (baseFormat = ZeroPlaceholder), hasFormatComponents(baseFormat)) {
                for (var _a = NumberFormat.getComponents(baseFormat), positive = _a.positive, negative = _a.negative, zero = _a.zero, formats = [ positive, negative, zero ], i = 0; i < formats.length; i++) formats[i] = addDecimalsToFormatComponent(formats[i], decimals, trailingZeros);
                return formats.join(NumberFormat.NumberFormatComponentsDelimeter);
            }
            return addDecimalsToFormatComponent(baseFormat, decimals, trailingZeros);
        }
        function addDecimalsToFormatComponent(format, decimals, trailingZeros) {
            if (decimals = Math.abs(decimals), decimals >= 0) {
                var placeholder = trailingZeros ? ZeroPlaceholder : DigitPlaceholder, decimalPlaceholders = StringExtensions.repeat(placeholder, Math.abs(decimals)), match = RegExpExtensions.run(DecimalFormatRegex, format);
                if (match) {
                    var beforeDecimal = format.substr(0, match.index), formatDecimal = format.substr(match.index + 1, match[1].length), afterDecimal = format.substr(match.index + match[0].length);
                    if (trailingZeros) formatDecimal = decimalPlaceholders; else {
                        var decimalChange = decimalPlaceholders.length - formatDecimal.length;
                        decimalChange > 0 ? formatDecimal += decimalPlaceholders.slice(-decimalChange) : 0 > decimalChange && (formatDecimal = formatDecimal.slice(0, decimalChange));
                    }
                    return formatDecimal.length > 0 && (formatDecimal = DecimalFormatCharacter + formatDecimal), 
                    beforeDecimal + formatDecimal + afterDecimal;
                }
                if (decimalPlaceholders.length > 0) return format.replace(LastNumericPlaceholderRegex, "$1" + DecimalFormatCharacter + decimalPlaceholders);
            }
            return format;
        }
        function hasFormatComponents(format) {
            return -1 !== format.indexOf(NumberFormat.NumberFormatComponentsDelimeter);
        }
        function getComponents(format) {
            var signFormat = {
                hasNegative: !1,
                positive: format,
                negative: format,
                zero: format
            }, signSpecificFormats = format.split(NumberFormat.NumberFormatComponentsDelimeter), formatCount = signSpecificFormats.length;
            return formatCount > 1 && (signFormat.hasNegative = !0, signFormat.positive = signFormat.zero = signSpecificFormats[0], 
            signFormat.negative = signSpecificFormats[1], formatCount > 2 && (signFormat.zero = signSpecificFormats[2])), 
            signFormat;
        }
        function canFormat(value) {
            var result = "number" == typeof value;
            return result;
        }
        function isStandardFormat(format) {
            return StandardFormatRegex.test(format);
        }
        function format(value, format, culture) {
            format = format || "G";
            try {
                return isStandardFormat(format) ? formatNumberStandard(value, format, culture) : formatNumberCustom(value, format, culture);
            } catch (e) {
                return Globalize.format(value, void 0, culture);
            }
        }
        function formatWithCustomOverride(value, format, nonScientificOverrideFormat, culture) {
            return formatNumberCustom(value, format, culture, nonScientificOverrideFormat);
        }
        function formatNumberStandard(value, format, culture) {
            var result, precision = format.length > 1 ? parseInt(format.substr(1, format.length - 1), 10) : void 0, numberFormatInfo = culture.numberFormat, formatChar = format.charAt(0);
            switch (formatChar) {
              case "e":
              case "E":
                void 0 === precision && (precision = 6);
                var mantissaDecimalDigits = StringExtensions.repeat("0", precision);
                format = "0." + mantissaDecimalDigits + formatChar + "+000", result = formatNumberCustom(value, format, culture);
                break;

              case "f":
              case "F":
                result = void 0 !== precision ? value.toFixed(precision) : value.toFixed(numberFormatInfo.decimals), 
                result = localize(result, numberFormatInfo);
                break;

              case "g":
              case "G":
                var abs = Math.abs(value);
                0 === abs || abs >= 1e-4 && 1e15 > abs ? result = void 0 !== precision ? value.toPrecision(precision) : value.toString() : (result = void 0 !== precision ? value.toExponential(precision) : value.toExponential(), 
                result = result.replace("e", "E")), result = localize(result, numberFormatInfo);
                break;

              case "r":
              case "R":
                result = value.toString(), result = localize(result, numberFormatInfo);
                break;

              case "x":
              case "X":
                if (result = value.toString(16), "X" === formatChar && (result = result.toUpperCase()), 
                void 0 !== precision) {
                    var actualPrecision = result.length, isNegative = 0 > value;
                    isNegative && actualPrecision--;
                    var paddingZerosCount = precision - actualPrecision, paddingZeros = void 0;
                    paddingZerosCount > 0 && (paddingZeros = StringExtensions.repeat("0", paddingZerosCount)), 
                    result = isNegative ? "-" + paddingZeros + result.substr(1) : paddingZeros + result;
                }
                result = localize(result, numberFormatInfo);
                break;

              default:
                result = Globalize.format(value, format, culture);
            }
            return result;
        }
        function formatNumberCustom(value, format, culture, nonScientificOverrideFormat) {
            var result, numberFormatInfo = culture.numberFormat;
            if (!isFinite(value)) return Globalize.format(value, void 0);
            var formatComponents = getComponents(format);
            format = value > 0 ? formatComponents.positive : 0 === value ? formatComponents.zero : formatComponents.negative, 
            formatComponents.hasNegative && (value = Math.abs(value));
            var formatMeta = getCustomFormatMetadata(format, !0);
            formatMeta.hasEscapes && (format = FormattingEncoder.preserveEscaped(format, "\\0#.,%‰"));
            var literals = [];
            if (formatMeta.hasQuotes && (format = FormattingEncoder.preserveLiterals(format, literals)), 
            formatMeta.hasE && !nonScientificOverrideFormat) {
                var scientificMatch = RegExpExtensions.run(ScientificFormatRegex, format);
                if (scientificMatch) {
                    var formatM = format.substr(0, scientificMatch.index), formatE = format.substr(scientificMatch.index + 2), precision = getCustomFormatPrecision(formatM, formatMeta), scale = getCustomFormatScale(formatM, formatMeta);
                    1 !== scale && (value *= scale);
                    var s = value.toExponential(precision), indexOfE = s.indexOf("e"), mantissa = s.substr(0, indexOfE), exp = s.substr(indexOfE + 1), resultM = fuseNumberWithCustomFormat(mantissa, formatM, numberFormatInfo), resultE = fuseNumberWithCustomFormat(exp, formatE, numberFormatInfo);
                    "+" === resultE.charAt(0) && "+" !== scientificMatch[0].charAt(1) && (resultE = resultE.substr(1));
                    var e = scientificMatch[0].charAt(0);
                    result = resultM + e + resultE;
                }
            }
            if (void 0 === result) {
                var valueFormatted, isValueGlobalized = !1, precision = getCustomFormatPrecision(format, formatMeta), scale = getCustomFormatScale(format, formatMeta);
                if (1 !== scale && (value *= scale), value = parseFloat(toNonScientific(value, precision)), 
                nonScientificOverrideFormat) {
                    var numericFormat = NumberFormat.getNumericFormat(value, format);
                    nonScientificOverrideFormat = getNonScientificFormatWithPrecision(nonScientificOverrideFormat, numericFormat), 
                    valueFormatted = powerbi_1.formattingService.format(nonScientificOverrideFormat, [ value ], culture.name), 
                    isValueGlobalized = !0;
                } else valueFormatted = toNonScientific(value, precision);
                result = fuseNumberWithCustomFormat(valueFormatted, format, numberFormatInfo, nonScientificOverrideFormat, isValueGlobalized);
            }
            return formatMeta.hasQuotes && (result = FormattingEncoder.restoreLiterals(result, literals)), 
            formatMeta.hasEscapes && (result = FormattingEncoder.restoreEscaped(result, "\\0#.,%‰")), 
            _lastCustomFormatMeta = formatMeta, result;
        }
        function toNonScientific(value, precision) {
            var result = "", precisionZeros = 0;
            precision > 16 && (precisionZeros = precision - 16, precision = 16);
            var digitsBeforeDecimalPoint = powerbi_1.Double.log10(Math.abs(value));
            if (16 > digitsBeforeDecimalPoint) {
                if (digitsBeforeDecimalPoint > 0) {
                    var maxPrecision = 16 - digitsBeforeDecimalPoint;
                    precision > maxPrecision && (precisionZeros += precision - maxPrecision, precision = maxPrecision);
                }
                result = value.toFixed(precision);
            } else if (16 === digitsBeforeDecimalPoint) result = value.toFixed(0), precisionZeros += precision, 
            precisionZeros > 0 && (result += "."); else {
                result = value.toExponential(15);
                var indexOfE = result.indexOf("e");
                if (indexOfE > 0) {
                    var indexOfDot = result.indexOf("."), mantissa = result.substr(0, indexOfE), exp = result.substr(indexOfE + 1), powerZeros = parseInt(exp, 10) - (mantissa.length - indexOfDot - 1);
                    result = mantissa.replace(".", "") + StringExtensions.repeat("0", powerZeros), precision > 0 && (result = result + "." + StringExtensions.repeat("0", precision));
                }
            }
            return precisionZeros > 0 && (result += StringExtensions.repeat("0", precisionZeros)), 
            result;
        }
        function getCustomFormatMetadata(format, calculatePrecision, calculateScale) {
            if (void 0 !== _lastCustomFormatMeta && format === _lastCustomFormatMeta.format) return _lastCustomFormatMeta;
            for (var result = {
                format: format,
                hasEscapes: !1,
                hasQuotes: !1,
                hasE: !1,
                hasCommas: !1,
                hasDots: !1,
                hasPercent: !1,
                hasPermile: !1,
                precision: void 0,
                scale: void 0
            }, i = 0, length_1 = format.length; length_1 > i; i++) {
                var c = format.charAt(i);
                switch (c) {
                  case "\\":
                    result.hasEscapes = !0;
                    break;

                  case "'":
                  case '"':
                    result.hasQuotes = !0;
                    break;

                  case "e":
                  case "E":
                    result.hasE = !0;
                    break;

                  case ",":
                    result.hasCommas = !0;
                    break;

                  case ".":
                    result.hasDots = !0;
                    break;

                  case "%":
                    result.hasPercent = !0;
                    break;

                  case "‰":
                    result.hasPermile = !0;
                }
            }
            var formatComponents = getComponents(format);
            return calculatePrecision && (result.precision = getCustomFormatPrecision(formatComponents.positive, result)), 
            calculateScale && (result.scale = getCustomFormatScale(formatComponents.positive, result)), 
            result;
        }
        function getCustomFormatPrecision(format, formatMeta) {
            if (formatMeta.precision > -1) return formatMeta.precision;
            var result = 0;
            if (formatMeta.hasDots) {
                var dotIndex = format.indexOf(".");
                if (dotIndex > -1) {
                    for (var count = format.length, i = dotIndex; count > i; i++) {
                        var char = format.charAt(i);
                        if (char.match(NumericPlaceholderRegex) && result++, char === ExponentialFormatChar) break;
                    }
                    result = Math.min(19, result);
                }
            }
            return formatMeta.precision = result, result;
        }
        function getCustomFormatScale(format, formatMeta) {
            if (formatMeta.scale > -1) return formatMeta.scale;
            var result = 1;
            if (formatMeta.hasPercent && format.indexOf("%") > -1 && (result = 100 * result), 
            formatMeta.hasPermile && format.indexOf("‰") > -1 && (result = 1e3 * result), formatMeta.hasCommas) {
                var dotIndex = format.indexOf(".");
                -1 === dotIndex && (dotIndex = format.length);
                for (var i = dotIndex - 1; i > -1; i--) {
                    var char = format.charAt(i);
                    if ("," !== char) break;
                    result /= 1e3;
                }
            }
            return formatMeta.scale = result, result;
        }
        function fuseNumberWithCustomFormat(value, format, numberFormatInfo, nonScientificOverrideFormat, isValueGlobalized) {
            var suppressModifyValue = !!nonScientificOverrideFormat, formatParts = format.split(".", 2);
            if (2 === formatParts.length) {
                var wholeFormat = formatParts[0], fractionFormat = formatParts[1], displayUnit = "";
                nonScientificOverrideFormat && (displayUnit = nonScientificOverrideFormat.replace(NumericalPlaceHolderRegex, ""), 
                value = value.replace(displayUnit, ""));
                var globalizedDecimalSeparator = numberFormatInfo["."], decimalSeparator = isValueGlobalized ? globalizedDecimalSeparator : ".", valueParts = value.split(decimalSeparator, 2), wholeValue = 1 === valueParts.length ? valueParts[0] + displayUnit : valueParts[0], fractionValue = 2 === valueParts.length ? valueParts[1] + displayUnit : "";
                fractionValue = fractionValue.replace(TrailingZerosRegex, "");
                var wholeFormattedValue = fuseNumberWithCustomFormatLeft(wholeValue, wholeFormat, numberFormatInfo, suppressModifyValue), fractionFormattedValue = fuseNumberWithCustomFormatRight(fractionValue, fractionFormat, suppressModifyValue);
                return fractionFormattedValue.fmtOnly || "" === fractionFormattedValue.value ? wholeFormattedValue + fractionFormattedValue.value : wholeFormattedValue + globalizedDecimalSeparator + fractionFormattedValue.value;
            }
            return fuseNumberWithCustomFormatLeft(value, format, numberFormatInfo, suppressModifyValue);
        }
        function fuseNumberWithCustomFormatLeft(value, format, numberFormatInfo, suppressModifyValue) {
            var groupSymbolIndex = format.indexOf(","), enableGroups = groupSymbolIndex > -1 && groupSymbolIndex < Math.max(format.lastIndexOf("0"), format.lastIndexOf("#")) && numberFormatInfo[","], groupDigitCount = 0, groupIndex = 0, groupSizes = numberFormatInfo.groupSizes || [ 3 ], groupSize = groupSizes[0], groupSeparator = numberFormatInfo[","], sign = "", firstChar = value.charAt(0);
            ("+" === firstChar || "-" === firstChar) && (sign = numberFormatInfo[firstChar], 
            value = value.substr(1));
            for (var isZero = "0" === value, result = "", leftBuffer = "", vi = value.length - 1, fmtOnly = !0, fi = format.length - 1; fi > -1; fi--) {
                var formatChar = format.charAt(fi);
                switch (formatChar) {
                  case ZeroPlaceholder:
                  case DigitPlaceholder:
                    fmtOnly = !1, "" !== leftBuffer && (result = leftBuffer + result, leftBuffer = ""), 
                    suppressModifyValue || ((vi > -1 || formatChar === ZeroPlaceholder) && enableGroups && (groupDigitCount === groupSize ? (result = groupSeparator + result, 
                    groupIndex++, groupIndex < groupSizes.length && (groupSize = groupSizes[groupIndex]), 
                    groupDigitCount = 1) : groupDigitCount++), vi > -1 ? (isZero && formatChar === DigitPlaceholder || (result = value.charAt(vi) + result), 
                    vi--) : formatChar !== DigitPlaceholder && (result = formatChar + result));
                    break;

                  case ",":
                    break;

                  default:
                    leftBuffer = formatChar + leftBuffer;
                }
            }
            if (!suppressModifyValue) {
                if (vi > -1 && "" !== result) if (enableGroups) for (;vi > -1; ) groupDigitCount === groupSize ? (result = groupSeparator + result, 
                groupIndex++, groupIndex < groupSizes.length && (groupSize = groupSizes[groupIndex]), 
                groupDigitCount = 1) : groupDigitCount++, result = value.charAt(vi) + result, vi--; else result = value.substr(0, vi + 1) + result;
                return sign + leftBuffer + result;
            }
            return fmtOnly ? sign + leftBuffer + result : sign + leftBuffer + value + result;
        }
        function fuseNumberWithCustomFormatRight(value, format, suppressModifyValue) {
            var vi = 0, fCount = format.length, vCount = value.length;
            if (suppressModifyValue) {
                var lastChar = format.charAt(fCount - 1);
                return lastChar.match(NumericPlaceholderRegex) ? {
                    value: value,
                    fmtOnly: "" === value
                } : {
                    value: value + lastChar,
                    fmtOnly: "" === value
                };
            }
            for (var result = "", fmtOnly = !0, fi = 0; fCount > fi; fi++) {
                var formatChar = format.charAt(fi);
                if (vCount > vi) switch (formatChar) {
                  case ZeroPlaceholder:
                  case DigitPlaceholder:
                    result += value[vi++], fmtOnly = !1;
                    break;

                  default:
                    result += formatChar;
                } else formatChar !== DigitPlaceholder && (result += formatChar, fmtOnly = fmtOnly && formatChar !== ZeroPlaceholder);
            }
            return {
                value: result,
                fmtOnly: fmtOnly
            };
        }
        function localize(value, dictionary) {
            var plus = dictionary["+"], minus = dictionary["-"], dot = dictionary["."], comma = dictionary[","];
            if ("+" === plus && "-" === minus && "." === dot && "," === comma) return value;
            for (var count = value.length, result = "", i = 0; count > i; i++) {
                var char = value.charAt(i);
                switch (char) {
                  case "+":
                    result += plus;
                    break;

                  case "-":
                    result += minus;
                    break;

                  case ".":
                    result += dot;
                    break;

                  case ",":
                    result += comma;
                    break;

                  default:
                    result += char;
                }
            }
            return result;
        }
        var NumericalPlaceHolderRegex = /\{.+\}/, ScientificFormatRegex = /e[+-]*[0#]+/i, StandardFormatRegex = /^[a-z]\d{0,2}$/i, TrailingZerosRegex = /0+$/, DecimalFormatRegex = /\.([0#]*)/g, NumericFormatRegex = /[0#,\.]+[0,#]*/g, LastNumericPlaceholderRegex = /(0|#)([^(0|#)]*)$/, DecimalFormatCharacter = ".";
        NumberFormat.NumberFormatComponentsDelimeter = ";", NumberFormat.getNumericFormat = getNumericFormat, 
        NumberFormat.addDecimalsToFormat = addDecimalsToFormat, NumberFormat.hasFormatComponents = hasFormatComponents, 
        NumberFormat.getComponents = getComponents;
        var _lastCustomFormatMeta;
        NumberFormat.canFormat = canFormat, NumberFormat.isStandardFormat = isStandardFormat, 
        NumberFormat.format = format, NumberFormat.formatWithCustomOverride = formatWithCustomOverride, 
        NumberFormat.getCustomFormatMetadata = getCustomFormatMetadata;
    }(NumberFormat = powerbi_1.NumberFormat || (powerbi_1.NumberFormat = {}));
    var DateTimeScaleFormatInfo = function() {
        function DateTimeScaleFormatInfo(culture) {
            var calendar = culture.calendar, patterns = calendar.patterns, monthAbbreviations = calendar.months.namesAbbr, cultureHasMonthAbbr = monthAbbreviations && monthAbbreviations[0], yearMonthPattern = patterns.Y, monthDayPattern = patterns.M, fullPattern = patterns.f, longTimePattern = patterns.T, shortTimePattern = patterns.t, separator = fullPattern.indexOf(",") > -1 ? ", " : " ", hasYearSymbol = 0 === yearMonthPattern.indexOf("yyyy'") && yearMonthPattern.length > 6 && "'" === yearMonthPattern[6];
            this.YearPattern = hasYearSymbol ? yearMonthPattern.substr(0, 7) : "yyyy";
            var yearPos = fullPattern.indexOf("yy"), monthPos = fullPattern.indexOf("MMMM");
            this.MonthPattern = cultureHasMonthAbbr && monthPos > -1 ? yearPos > monthPos ? "MMM yyyy" : "yyyy MMM" : yearMonthPattern, 
            this.DayPattern = cultureHasMonthAbbr ? monthDayPattern.replace("MMMM", "MMM") : monthDayPattern;
            var minutePos = fullPattern.indexOf("mm"), pmPos = fullPattern.indexOf("tt"), shortHourPattern = pmPos > -1 ? shortTimePattern.replace(":mm ", "") : shortTimePattern;
            switch (this.HourPattern = minutePos > yearPos ? this.DayPattern + separator + shortHourPattern : shortHourPattern + separator + this.DayPattern, 
            this.MinutePattern = shortTimePattern, this.SecondPattern = longTimePattern, this.MillisecondPattern = longTimePattern.replace("ss", "ss.fff"), 
            culture.name) {
              case "fi-FI":
                this.DayPattern = this.DayPattern.replace("'ta'", ""), this.HourPattern = this.HourPattern.replace("'ta'", "");
            }
        }
        return DateTimeScaleFormatInfo.prototype.getFormatString = function(unit) {
            switch (unit) {
              case powerbi_1.DateTimeUnit.Year:
                return this.YearPattern;

              case powerbi_1.DateTimeUnit.Month:
                return this.MonthPattern;

              case powerbi_1.DateTimeUnit.Week:
              case powerbi_1.DateTimeUnit.Day:
                return this.DayPattern;

              case powerbi_1.DateTimeUnit.Hour:
                return this.HourPattern;

              case powerbi_1.DateTimeUnit.Minute:
                return this.MinutePattern;

              case powerbi_1.DateTimeUnit.Second:
                return this.SecondPattern;

              case powerbi_1.DateTimeUnit.Millisecond:
                return this.MillisecondPattern;
            }
        }, DateTimeScaleFormatInfo;
    }();
    powerbi_1.formattingService = new FormattingService();
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var SQExprShortSerializer;
        !function(SQExprShortSerializer) {
            function serialize(expr) {
                return JSON.stringify(expr.accept(SQExprSerializer.instance));
            }
            function serializeArray(exprs) {
                for (var str = "[", i = 0, len = exprs.length; len > i; i++) i > 0 && (str += ","), 
                str += SQExprShortSerializer.serialize(exprs[i]);
                return str + "]";
            }
            SQExprShortSerializer.serialize = serialize, SQExprShortSerializer.serializeArray = serializeArray;
            var SQExprSerializer = function(_super) {
                function SQExprSerializer() {
                    _super.apply(this, arguments);
                }
                return __extends(SQExprSerializer, _super), SQExprSerializer.prototype.visitColumnRef = function(expr) {
                    return {
                        col: {
                            s: expr.source.accept(this),
                            r: expr.ref
                        }
                    };
                }, SQExprSerializer.prototype.visitMeasureRef = function(expr) {
                    return {
                        measure: {
                            s: expr.source.accept(this),
                            r: expr.ref
                        }
                    };
                }, SQExprSerializer.prototype.visitAggr = function(expr) {
                    return {
                        agg: {
                            a: expr.arg.accept(this),
                            f: expr.func
                        }
                    };
                }, SQExprSerializer.prototype.visitEntity = function(expr) {
                    return {
                        e: expr.entity
                    };
                }, SQExprSerializer.prototype.visitAnd = function(expr) {
                    return {
                        and: {
                            l: expr.left.accept(this),
                            r: expr.right.accept(this)
                        }
                    };
                }, SQExprSerializer.prototype.visitCompare = function(expr) {
                    return {
                        comp: {
                            k: expr.comparison,
                            l: expr.left.accept(this),
                            r: expr.right.accept(this)
                        }
                    };
                }, SQExprSerializer.prototype.visitConstant = function(expr) {
                    return {
                        "const": {
                            t: expr.type.primitiveType,
                            v: expr.value
                        }
                    };
                }, SQExprSerializer.prototype.visitDefault = function(expr) {}, SQExprSerializer.instance = new SQExprSerializer(), 
                SQExprSerializer;
            }(data.DefaultSQExprVisitor);
        }(SQExprShortSerializer = data.SQExprShortSerializer || (data.SQExprShortSerializer = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        var DataViewConcatenateCategoricalColumns, inheritSingle = powerbi.Prototype.inheritSingle;
        !function(DataViewConcatenateCategoricalColumns) {
            function detectAndApply(dataView, roleMappings, projectionOrdering, selects, projectionActiveItems) {
                var result = dataView, dataViewCategorical = dataView.categorical;
                if (dataViewCategorical) {
                    var concatenationSource = detectCategoricalRoleForHierarchicalGroup(dataViewCategorical, dataView.metadata, roleMappings, selects, projectionActiveItems);
                    if (concatenationSource) {
                        var columnsSortedByProjectionOrdering = sortColumnsByProjectionOrdering(projectionOrdering, concatenationSource.roleName, concatenationSource.categories);
                        columnsSortedByProjectionOrdering.length >= 2 && (result = applyConcatenation(dataView, concatenationSource.roleName, columnsSortedByProjectionOrdering));
                    }
                }
                return result;
            }
            function detectCategoricalRoleForHierarchicalGroup(dataViewCategorical, metadata, dataViewMappings, selects, projectionActiveItems) {
                var result, roleKinds = data.DataViewSelectTransform.createRoleKindFromMetadata(selects, metadata), projections = data.DataViewSelectTransform.projectionsFromSelects(selects, projectionActiveItems), roleMappings = powerbi.DataViewAnalysis.chooseDataViewMappings(projections, dataViewMappings, roleKinds).supportedMappings, roleMappingForCategorical = roleMappings && 1 === roleMappings.length && roleMappings[0].categorical ? roleMappings[0] : void 0;
                if (roleMappingForCategorical) {
                    var roleNamesForCategory = getAllRolesInCategories(roleMappingForCategorical.categorical);
                    if (roleNamesForCategory && 1 === roleNamesForCategory.length) {
                        var targetRoleName = roleNamesForCategory[0], isVisualExpectingMaxOneCategoryColumn = !_.isEmpty(roleMappingForCategorical.conditions) && _.every(roleMappingForCategorical.conditions, function(condition) {
                            return condition[targetRoleName] && 1 === condition[targetRoleName].max;
                        });
                        if (isVisualExpectingMaxOneCategoryColumn) {
                            var categoriesForTargetRole = _.filter(dataViewCategorical.categories, function(categoryColumn) {
                                return categoryColumn.source.roles && !!categoryColumn.source.roles[targetRoleName];
                            }), areValuesCountsEqual = _.every(categoriesForTargetRole, function(categoryColumn) {
                                return categoryColumn.values.length === categoriesForTargetRole[0].values.length;
                            });
                            areValuesCountsEqual && categoriesForTargetRole.length >= 2 && (result = {
                                roleName: targetRoleName,
                                categories: categoriesForTargetRole
                            });
                        }
                    }
                }
                return result;
            }
            function getAllRolesInCategories(categoricalRoleMapping) {
                var roleNames = [];
                return powerbi.DataViewMapping.visitCategoricalCategories(categoricalRoleMapping.categories, {
                    visitRole: function(roleName) {
                        roleNames.push(roleName);
                    }
                }), roleNames;
            }
            function applyConcatenation(dataView, roleName, columnsSortedByProjectionOrdering) {
                var concatenatedValues = concatenateValues(columnsSortedByProjectionOrdering), concatenatedColumnMetadata = createConcatenatedColumnMetadata(roleName, columnsSortedByProjectionOrdering), transformedDataView = inheritSingle(dataView);
                addToMetadata(transformedDataView, concatenatedColumnMetadata);
                var concatenatedCategoryColumn = createConcatenatedCategoryColumn(columnsSortedByProjectionOrdering, concatenatedColumnMetadata, concatenatedValues), dataViewCategorical = dataView.categorical, transformedCategoricalCategories = _.difference(dataViewCategorical.categories, columnsSortedByProjectionOrdering);
                transformedCategoricalCategories.push(concatenatedCategoryColumn);
                var transformedCategorical = inheritSingle(dataViewCategorical);
                return transformedCategorical.categories = transformedCategoricalCategories, transformedDataView.categorical = transformedCategorical, 
                transformedDataView;
            }
            function concatenateValues(columnsSortedByProjectionOrdering) {
                for (var concatenatedValues = [], _i = 0; _i < columnsSortedByProjectionOrdering.length; _i++) for (var categoryColumn = columnsSortedByProjectionOrdering[_i], i = 0, len = categoryColumn.values.length; len > i; i++) {
                    var valueToAppend = categoryColumn.values && categoryColumn.values[i];
                    concatenatedValues[i] = void 0 === concatenatedValues[i] ? valueToAppend + "" : valueToAppend + " " + concatenatedValues[i];
                }
                return concatenatedValues;
            }
            function sortColumnsByProjectionOrdering(projectionOrdering, roleName, columns) {
                var columnsInProjectionOrdering;
                if (projectionOrdering) {
                    for (var columnsByIndex = {}, _i = 0; _i < columns.length; _i++) {
                        var column = columns[_i];
                        column.source.roles[roleName] && (columnsByIndex[column.source.index] = column);
                    }
                    var columnIndicesInProjectionOrdering = projectionOrdering[roleName];
                    columnsInProjectionOrdering = _.chain(columnIndicesInProjectionOrdering).map(function(columnIndex) {
                        return columnsByIndex[columnIndex];
                    }).filter(function(column) {
                        return !!column;
                    }).value();
                } else columnsInProjectionOrdering = _.filter(columns, function(column) {
                    return column.source.roles[roleName];
                });
                return columnsInProjectionOrdering;
            }
            function createConcatenatedColumnMetadata(roleName, columnsSortedByProjectionOrdering) {
                for (var concatenatedDisplayName, columnForCurrentDrillLevel = _.last(columnsSortedByProjectionOrdering), consistentIsMeasure = columnForCurrentDrillLevel.source.isMeasure, _i = 0; _i < columnsSortedByProjectionOrdering.length; _i++) {
                    var categoryColumn = columnsSortedByProjectionOrdering[_i], columnSource = categoryColumn.source;
                    concatenatedDisplayName = null == concatenatedDisplayName ? columnSource.displayName : columnSource.displayName + " " + concatenatedDisplayName, 
                    consistentIsMeasure !== columnSource.isMeasure && (consistentIsMeasure = void 0);
                }
                var newRoles = {};
                newRoles[roleName] = !0;
                var newColumnMetadata = {
                    displayName: concatenatedDisplayName,
                    roles: newRoles,
                    type: powerbi.ValueType.fromPrimitiveTypeAndCategory(powerbi.PrimitiveType.Text)
                };
                return void 0 !== consistentIsMeasure && (newColumnMetadata.isMeasure = consistentIsMeasure), 
                newColumnMetadata.queryName = columnForCurrentDrillLevel.source.queryName, newColumnMetadata;
            }
            function addToMetadata(transformedDataView, newColumn) {
                var transformedColumns = inheritSingle(transformedDataView.metadata.columns);
                transformedColumns.push(newColumn);
                var transformedMetadata = inheritSingle(transformedDataView.metadata);
                transformedMetadata.columns = transformedColumns, transformedDataView.metadata = transformedMetadata;
            }
            function createConcatenatedCategoryColumn(sourceColumnsSortedByProjectionOrdering, columnMetadata, concatenatedValues) {
                var newCategoryColumn = {
                    source: columnMetadata,
                    values: concatenatedValues
                }, firstColumn = sourceColumnsSortedByProjectionOrdering[0];
                return firstColumn.identity && (newCategoryColumn.identity = firstColumn.identity), 
                firstColumn.identityFields && (newCategoryColumn.identityFields = firstColumn.identityFields), 
                newCategoryColumn;
            }
            DataViewConcatenateCategoricalColumns.detectAndApply = detectAndApply;
        }(DataViewConcatenateCategoricalColumns = data.DataViewConcatenateCategoricalColumns || (data.DataViewConcatenateCategoricalColumns = {}));
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var DataViewMapping;
    !function(DataViewMapping) {
        function visitMapping(mapping, visitor) {
            var categorical = mapping.categorical;
            categorical && visitCategorical(categorical, visitor);
            var table = mapping.table;
            table && visitTable(table, visitor);
            var matrix = mapping.matrix;
            matrix && visitMatrix(matrix, visitor);
            var tree = mapping.tree;
            tree && visitTree(tree, visitor);
            var single = mapping.single;
            single && visitSingle(single, visitor);
        }
        function visitCategorical(mapping, visitor) {
            visitCategoricalCategories(mapping.categories, visitor);
            var values = mapping.values;
            visitCategoricalValues(values, visitor), visitGrouped(values, visitor);
        }
        function visitCategoricalCategories(mapping, visitor) {
            mapping && (visitBind(mapping, visitor), visitFor(mapping, visitor), visitList(mapping, visitor), 
            visitReduction(mapping, visitor));
        }
        function visitCategoricalValues(mapping, visitor) {
            if (mapping) {
                visitBind(mapping, visitor, 0), visitFor(mapping, visitor, 0), visitList(mapping, visitor, 0);
                var group = mapping.group;
                if (group) for (var _i = 0, _a = group.select; _i < _a.length; _i++) {
                    var item = _a[_i];
                    visitBind(item, visitor, 1), visitFor(item, visitor, 1);
                }
            }
        }
        function visitTable(mapping, visitor) {
            var rows = mapping.rows;
            visitBind(rows, visitor), visitFor(rows, visitor), visitList(rows, visitor), visitReduction(rows, visitor);
        }
        function visitMatrix(mapping, visitor) {
            visitMatrixItems(mapping.rows, visitor), visitMatrixItems(mapping.columns, visitor), 
            visitMatrixItems(mapping.values, visitor);
        }
        function visitMatrixItems(mapping, visitor) {
            mapping && (visitFor(mapping, visitor), visitList(mapping, visitor), visitReduction(mapping, visitor));
        }
        function visitTree(mapping, visitor) {
            visitTreeNodes(mapping.nodes, visitor), visitTreeValues(mapping.values, visitor);
        }
        function visitTreeNodes(mapping, visitor) {
            mapping && (visitFor(mapping, visitor), visitReduction(mapping, visitor));
        }
        function visitTreeValues(mapping, visitor) {
            mapping && visitFor(mapping, visitor);
        }
        function visitBind(mapping, visitor, context) {
            var bind = mapping.bind;
            bind && (null != context ? visitor.visitRole(bind.to, context) : visitor.visitRole(bind.to));
        }
        function visitFor(mapping, visitor, context) {
            var forValue = mapping["for"];
            forValue && (null != context ? visitor.visitRole(forValue["in"], context) : visitor.visitRole(forValue["in"]));
        }
        function visitList(mapping, visitor, context) {
            var select = mapping.select;
            if (select) for (var _i = 0; _i < select.length; _i++) {
                var item = select[_i];
                visitBind(item, visitor, context), visitFor(item, visitor, context);
            }
        }
        function visitGrouped(mapping, visitor) {
            if (mapping) {
                var group = mapping.group;
                group && (visitor.visitRole(group.by), visitReduction(group, visitor));
            }
        }
        function visitReduction(mapping, visitor) {
            if (visitor.visitReduction) {
                var reductionAlgorithm = mapping.dataReductionAlgorithm;
                reductionAlgorithm && visitor.visitReduction(reductionAlgorithm);
            }
        }
        function visitSingle(mapping, visitor) {
            visitor.visitRole(mapping.role);
        }
        DataViewMapping.visitMapping = visitMapping, DataViewMapping.visitCategorical = visitCategorical, 
        DataViewMapping.visitCategoricalCategories = visitCategoricalCategories, DataViewMapping.visitCategoricalValues = visitCategoricalValues, 
        DataViewMapping.visitTable = visitTable, DataViewMapping.visitMatrixItems = visitMatrixItems, 
        DataViewMapping.visitTreeNodes = visitTreeNodes, DataViewMapping.visitTreeValues = visitTreeValues, 
        DataViewMapping.visitGrouped = visitGrouped;
    }(DataViewMapping = powerbi.DataViewMapping || (powerbi.DataViewMapping = {}));
}(powerbi || (powerbi = {}));

var powerbi;

!function(powerbi) {
    var data;
    !function(data) {
        function createTableEvalContext(dataViewTable, selectTransforms) {
            return new TableEvalContext(dataViewTable, selectTransforms);
        }
        data.createTableEvalContext = createTableEvalContext;
        var TableEvalContext = function() {
            function TableEvalContext(dataView, selectTransforms) {
                this.dataView = dataView, this.selectTransforms = selectTransforms;
            }
            return TableEvalContext.prototype.getExprValue = function(expr) {
                var rowIdx = this.rowIdx;
                if (null != rowIdx) return data.getExprValueFromTable(expr, this.selectTransforms, this.dataView, rowIdx);
            }, TableEvalContext.prototype.getRoleValue = function(roleName) {}, TableEvalContext.prototype.setCurrentRowIndex = function(index) {
                this.rowIdx = index;
            }, TableEvalContext;
        }();
    }(data = powerbi.data || (powerbi.data = {}));
}(powerbi || (powerbi = {}));