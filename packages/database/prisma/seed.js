"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var client_1 = require("@prisma/client");
var biguint_format_1 = require("biguint-format");
var FlakeId = require("flake-idgen");
var prisma = new client_1.PrismaClient();
var flake = new FlakeId({
    epoch: new Date("2021-01-01").getTime(),
    datacenter: 1,
    worker: 1
});
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var nextId, user1, user2, user3, vendor1, vendor2, product1, product2, product3, product4, product5, product6, product7, product8, product9, product10, product11, keycap1, keyboard2, keyboard3, keyboard4, productDesigner1, productDesigner2, productDesigner3, productDesigner4, productDesigner5, productDesigner6, productDesigner7, productDesigner8, productDesigner9, productDesigner10, productDesigner11, productVendor1, productVendor2, productVendor3, productVendor4, productVendor5, productVendor6, productVendor7, userVendor1, userVendor2, userVendor3, formField1, formField2, formField3, formField4, formField5, formField6, formAnswer1, formAnswer2, formAnswer3, formAnswer4, formAnswer5, formAnswer6, formAnswer7, formAnswer8, formAnswer9, form1, formListValue1, formListValue2, formListValue3, formListValue4, formListValue5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    nextId = function () { return (0, biguint_format_1["default"])(flake.next(), "dec"); };
                    return [4 /*yield*/, prisma.user.create({
                            data: {
                                id: nextId(),
                                email: "doug@gmail.com",
                                password: "password",
                                username: "doug",
                                name: "Doug Rocha",
                                discord: {
                                    create: {
                                        discordId: "571520537587875851",
                                        username: "slash",
                                        discriminator: "0001",
                                        accessToken: "38394bf98nqe9ap9v",
                                        refreshToken: "adsjhasdlh2893123587",
                                        connectedAt: new Date(),
                                        email: "douglas_junior@.com",
                                        mfaEnabled: false
                                    }
                                },
                                designerAccount: {
                                    create: {
                                        id: nextId(),
                                        name: "DOUG R Design",
                                        username: "dougdesignes",
                                        discordServerUrl: "https://discord.gg/1234123",
                                        redditUsername: "dougdesignes",
                                        twitterHandle: "dougdesignes"
                                    }
                                }
                            },
                            include: {
                                discord: true,
                                designerAccount: true
                            }
                        })];
                case 1:
                    user1 = _a.sent();
                    return [4 /*yield*/, prisma.user.create({
                            data: {
                                id: nextId(),
                                email: "billy@mail.com",
                                username: "billy",
                                name: "Billy Bob",
                                password: "password",
                                designerAccount: {
                                    create: {
                                        id: nextId(),
                                        name: "Billy Bob Design",
                                        username: "billybobdesign",
                                        discordServerUrl: "https://discord.gg/1234",
                                        redditUsername: "billybobdesign",
                                        twitterHandle: "billybobdesign"
                                    }
                                }
                            },
                            include: {
                                designerAccount: true
                            }
                        })];
                case 2:
                    user2 = _a.sent();
                    return [4 /*yield*/, prisma.user.create({
                            data: {
                                id: nextId(),
                                email: "dave@icloud.com",
                                password: "pass123",
                                username: "dave",
                                designerAccount: {
                                    create: {
                                        id: nextId(),
                                        username: "davedesign",
                                        name: "Dave Design"
                                    }
                                }
                            },
                            include: {
                                designerAccount: true
                            }
                        })];
                case 3:
                    user3 = _a.sent();
                    return [4 /*yield*/, prisma.vendor.create({
                            data: {
                                id: nextId(),
                                name: "Keycult",
                                country: "China",
                                verified: true,
                                url: "https://keycult.com"
                            }
                        })];
                case 4:
                    vendor1 = _a.sent();
                    return [4 /*yield*/, prisma.vendor.create({
                            data: {
                                id: nextId(),
                                name: "Drop",
                                country: "USA",
                                verified: true,
                                url: "https://drop.com"
                            }
                        })];
                case 5:
                    vendor2 = _a.sent();
                    return [4 /*yield*/, prisma.product.create({
                            data: {
                                id: nextId(),
                                name: "Product 1",
                                description: "Product 1 description",
                                price: 100,
                                estimatedDeliveryQuarter: "Q1",
                                estimatedDeliveryYear: "2021",
                                groupBuyStartDate: new Date("2021-01-01"),
                                groupBuyEndDate: new Date("2021-12-02"),
                                layout: "ANSI",
                                status: "INTEREST_CHECK",
                                type: "KEYBOARD",
                                brand: "GMK",
                                designers: {
                                    create: {
                                        designerId: user2.designerAccount.id
                                    }
                                }
                            }
                        })];
                case 6:
                    product1 = _a.sent();
                    return [4 /*yield*/, prisma.product.create({
                            data: {
                                id: nextId(),
                                name: "GMK Keycap Set",
                                description: "GMK Keycap Set description",
                                price: 100,
                                estimatedDeliveryQuarter: "Q1",
                                estimatedDeliveryYear: "2021",
                                groupBuyStartDate: new Date("2021-03-01"),
                                groupBuyEndDate: new Date("2021-12-02"),
                                layout: "ANSI",
                                status: "INTEREST_CHECK",
                                type: "KEYCAP_SET",
                                brand: "GMK",
                                designers: {
                                    create: [
                                        {
                                            designerId: user3.designerAccount.id
                                        },
                                    ]
                                }
                            }
                        })];
                case 7:
                    product2 = _a.sent();
                    return [4 /*yield*/, prisma.product.create({
                            data: {
                                id: nextId(),
                                name: "Product 2",
                                description: "Product 2 description",
                                price: 200,
                                estimatedDeliveryQuarter: "Q2",
                                estimatedDeliveryYear: "2023",
                                groupBuyStartDate: new Date("2021-02-01"),
                                groupBuyEndDate: new Date("2021-12-02"),
                                layout: "ANSI",
                                status: "INTEREST_CHECK",
                                type: "KEYCAP_SET",
                                brand: "JTK"
                            }
                        })];
                case 8:
                    product3 = _a.sent();
                    return [4 /*yield*/, prisma.product.create({
                            data: {
                                id: nextId(),
                                name: "Product 3",
                                description: "Product 3 description",
                                price: 300,
                                estimatedDeliveryQuarter: "Q3",
                                estimatedDeliveryYear: "2024",
                                groupBuyStartDate: new Date("2021-03-01"),
                                groupBuyEndDate: new Date("2021-12-02"),
                                layout: "ANSI",
                                status: "GROUP_BUY",
                                type: "KEYBOARD",
                                brand: "JTK"
                            }
                        })];
                case 9:
                    product4 = _a.sent();
                    return [4 /*yield*/, prisma.product.create({
                            data: {
                                id: nextId(),
                                name: "Product 4",
                                description: "Product 4 description",
                                price: 400,
                                estimatedDeliveryQuarter: "Q4",
                                estimatedDeliveryYear: "2025",
                                groupBuyStartDate: new Date("2021-04-01"),
                                groupBuyEndDate: new Date("2021-12-02"),
                                layout: "ANSI",
                                status: "GROUP_BUY",
                                type: "KEYBOARD",
                                brand: "JTK"
                            }
                        })];
                case 10:
                    product5 = _a.sent();
                    return [4 /*yield*/, prisma.product.create({
                            data: {
                                id: nextId(),
                                name: "Product 5",
                                description: "Product 5 description",
                                price: 500,
                                estimatedDeliveryQuarter: "Q1",
                                estimatedDeliveryYear: "2026",
                                groupBuyStartDate: new Date("2021-05-01"),
                                groupBuyEndDate: new Date("2021-12-02"),
                                layout: "ANSI",
                                status: "GROUP_BUY",
                                type: "KEYBOARD",
                                brand: "JTK"
                            }
                        })];
                case 11:
                    product6 = _a.sent();
                    return [4 /*yield*/, prisma.product.create({
                            data: {
                                id: nextId(),
                                name: "Product 6",
                                description: "Product 6 description",
                                price: 600,
                                estimatedDeliveryQuarter: "Q2",
                                estimatedDeliveryYear: "2027",
                                groupBuyStartDate: new Date("2021-06-01"),
                                groupBuyEndDate: new Date("2021-12-02"),
                                layout: "ANSI",
                                status: "GROUP_BUY",
                                type: "KEYBOARD",
                                brand: "JTK"
                            }
                        })];
                case 12:
                    product7 = _a.sent();
                    return [4 /*yield*/, prisma.product.create({
                            data: {
                                id: nextId(),
                                name: "Product 7",
                                description: "Product 7 description",
                                price: 700,
                                estimatedDeliveryQuarter: "Q3",
                                estimatedDeliveryYear: "2028",
                                groupBuyStartDate: new Date("2021-07-01"),
                                groupBuyEndDate: new Date("2021-12-02"),
                                layout: "ANSI",
                                status: "GROUP_BUY",
                                type: "KEYBOARD",
                                brand: "JTK"
                            }
                        })];
                case 13:
                    product8 = _a.sent();
                    return [4 /*yield*/, prisma.product.create({
                            data: {
                                id: nextId(),
                                name: "Product 8",
                                description: "Product 8 description",
                                price: 800,
                                estimatedDeliveryQuarter: "Q4",
                                estimatedDeliveryYear: "2029",
                                groupBuyStartDate: new Date("2021-08-01"),
                                groupBuyEndDate: new Date("2021-12-02"),
                                layout: "ANSI",
                                status: "GROUP_BUY",
                                type: "KEYBOARD",
                                brand: "JTK"
                            }
                        })];
                case 14:
                    product9 = _a.sent();
                    return [4 /*yield*/, prisma.product.create({
                            data: {
                                id: nextId(),
                                name: "Product 9",
                                description: "Product 9 description",
                                price: 900,
                                estimatedDeliveryQuarter: "Q1",
                                estimatedDeliveryYear: "2030",
                                groupBuyStartDate: new Date("2021-09-01"),
                                groupBuyEndDate: new Date("2021-12-02"),
                                layout: "ANSI",
                                status: "GROUP_BUY",
                                type: "KEYBOARD",
                                brand: "JTK"
                            }
                        })];
                case 15:
                    product10 = _a.sent();
                    return [4 /*yield*/, prisma.product.create({
                            data: {
                                id: nextId(),
                                name: "Product 10",
                                description: "Product 10 description",
                                price: 1000,
                                estimatedDeliveryQuarter: "Q2",
                                estimatedDeliveryYear: "2031",
                                groupBuyStartDate: new Date("2021-10-01"),
                                groupBuyEndDate: new Date("2021-12-02"),
                                layout: "ANSI",
                                status: "GROUP_BUY",
                                type: "KEYBOARD",
                                brand: "JTK"
                            }
                        })];
                case 16:
                    product11 = _a.sent();
                    return [4 /*yield*/, prisma.keycapSet.create({
                            data: {
                                material: "ABS",
                                profile: "SA",
                                product: {
                                    connect: {
                                        id: product2.id
                                    }
                                }
                            }
                        })];
                case 17:
                    keycap1 = _a.sent();
                    return [4 /*yield*/, prisma.keyboard.create({
                            data: {
                                product: {
                                    connect: {
                                        id: product1.id
                                    }
                                }
                            }
                        })];
                case 18:
                    keyboard2 = _a.sent();
                    return [4 /*yield*/, prisma.keyboard.create({
                            data: {
                                product: {
                                    connect: {
                                        id: product4.id
                                    }
                                }
                            }
                        })];
                case 19:
                    keyboard3 = _a.sent();
                    return [4 /*yield*/, prisma.keyboard.create({
                            data: {
                                product: {
                                    connect: {
                                        id: product5.id
                                    }
                                }
                            }
                        })];
                case 20:
                    keyboard4 = _a.sent();
                    return [4 /*yield*/, prisma.productDesigner.create({
                            data: {
                                product: {
                                    connect: {
                                        id: product1.id
                                    }
                                },
                                designer: {
                                    connect: {
                                        id: user1.designerAccount.id
                                    }
                                }
                            }
                        })];
                case 21:
                    productDesigner1 = _a.sent();
                    return [4 /*yield*/, prisma.productDesigner.create({
                            data: {
                                product: {
                                    connect: {
                                        id: product2.id
                                    }
                                },
                                designer: {
                                    connect: {
                                        id: user1.designerAccount.id
                                    }
                                }
                            }
                        })];
                case 22:
                    productDesigner2 = _a.sent();
                    return [4 /*yield*/, prisma.productDesigner.create({
                            data: {
                                product: {
                                    connect: {
                                        id: product3.id
                                    }
                                },
                                designer: {
                                    connect: {
                                        id: user1.designerAccount.id
                                    }
                                }
                            }
                        })];
                case 23:
                    productDesigner3 = _a.sent();
                    return [4 /*yield*/, prisma.productDesigner.create({
                            data: {
                                product: {
                                    connect: {
                                        id: product4.id
                                    }
                                },
                                designer: {
                                    connect: {
                                        id: user1.designerAccount.id
                                    }
                                }
                            }
                        })];
                case 24:
                    productDesigner4 = _a.sent();
                    return [4 /*yield*/, prisma.productDesigner.create({
                            data: {
                                product: {
                                    connect: {
                                        id: product5.id
                                    }
                                },
                                designer: {
                                    connect: {
                                        id: user1.designerAccount.id
                                    }
                                }
                            }
                        })];
                case 25:
                    productDesigner5 = _a.sent();
                    return [4 /*yield*/, prisma.productDesigner.create({
                            data: {
                                product: {
                                    connect: {
                                        id: product6.id
                                    }
                                },
                                designer: {
                                    connect: {
                                        id: user1.designerAccount.id
                                    }
                                }
                            }
                        })];
                case 26:
                    productDesigner6 = _a.sent();
                    return [4 /*yield*/, prisma.productDesigner.create({
                            data: {
                                product: {
                                    connect: {
                                        id: product7.id
                                    }
                                },
                                designer: {
                                    connect: {
                                        id: user1.designerAccount.id
                                    }
                                }
                            }
                        })];
                case 27:
                    productDesigner7 = _a.sent();
                    return [4 /*yield*/, prisma.productDesigner.create({
                            data: {
                                product: {
                                    connect: {
                                        id: product8.id
                                    }
                                },
                                designer: {
                                    connect: {
                                        id: user1.designerAccount.id
                                    }
                                }
                            }
                        })];
                case 28:
                    productDesigner8 = _a.sent();
                    return [4 /*yield*/, prisma.productDesigner.create({
                            data: {
                                product: {
                                    connect: {
                                        id: product9.id
                                    }
                                },
                                designer: {
                                    connect: {
                                        id: user1.designerAccount.id
                                    }
                                }
                            }
                        })];
                case 29:
                    productDesigner9 = _a.sent();
                    return [4 /*yield*/, prisma.productDesigner.create({
                            data: {
                                product: {
                                    connect: {
                                        id: product10.id
                                    }
                                },
                                designer: {
                                    connect: {
                                        id: user1.designerAccount.id
                                    }
                                }
                            }
                        })];
                case 30:
                    productDesigner10 = _a.sent();
                    return [4 /*yield*/, prisma.productDesigner.create({
                            data: {
                                product: {
                                    connect: {
                                        id: product11.id
                                    }
                                },
                                designer: {
                                    connect: {
                                        id: user1.designerAccount.id
                                    }
                                }
                            }
                        })];
                case 31:
                    productDesigner11 = _a.sent();
                    return [4 /*yield*/, prisma.productVendor.create({
                            data: {
                                product: {
                                    connect: {
                                        id: product1.id
                                    }
                                },
                                vendor: {
                                    connect: {
                                        id: vendor1.id
                                    }
                                }
                            }
                        })];
                case 32:
                    productVendor1 = _a.sent();
                    return [4 /*yield*/, prisma.productVendor.create({
                            data: {
                                product: {
                                    connect: {
                                        id: product2.id
                                    }
                                },
                                vendor: {
                                    connect: {
                                        id: vendor1.id
                                    }
                                }
                            }
                        })];
                case 33:
                    productVendor2 = _a.sent();
                    return [4 /*yield*/, prisma.productVendor.create({
                            data: {
                                product: {
                                    connect: {
                                        id: product3.id
                                    }
                                },
                                vendor: {
                                    connect: {
                                        id: vendor2.id
                                    }
                                }
                            }
                        })];
                case 34:
                    productVendor3 = _a.sent();
                    return [4 /*yield*/, prisma.productVendor.create({
                            data: {
                                product: {
                                    connect: {
                                        id: product4.id
                                    }
                                },
                                vendor: {
                                    connect: {
                                        id: vendor2.id
                                    }
                                }
                            }
                        })];
                case 35:
                    productVendor4 = _a.sent();
                    return [4 /*yield*/, prisma.productVendor.create({
                            data: {
                                product: {
                                    connect: {
                                        id: product5.id
                                    }
                                },
                                vendor: {
                                    connect: {
                                        id: vendor2.id
                                    }
                                }
                            }
                        })];
                case 36:
                    productVendor5 = _a.sent();
                    return [4 /*yield*/, prisma.productVendor.create({
                            data: {
                                product: {
                                    connect: {
                                        id: product6.id
                                    }
                                },
                                vendor: {
                                    connect: {
                                        id: vendor2.id
                                    }
                                }
                            }
                        })];
                case 37:
                    productVendor6 = _a.sent();
                    return [4 /*yield*/, prisma.productVendor.create({
                            data: {
                                product: {
                                    connect: {
                                        id: product7.id
                                    }
                                },
                                vendor: {
                                    connect: {
                                        id: vendor1.id
                                    }
                                }
                            }
                        })];
                case 38:
                    productVendor7 = _a.sent();
                    return [4 /*yield*/, prisma.userVendor.create({
                            data: {
                                role: "MODERATOR",
                                user: {
                                    connect: {
                                        id: user1.id
                                    }
                                },
                                vendor: {
                                    connect: {
                                        id: vendor1.id
                                    }
                                }
                            }
                        })];
                case 39:
                    userVendor1 = _a.sent();
                    return [4 /*yield*/, prisma.userVendor.create({
                            data: {
                                role: "USER",
                                user: {
                                    connect: {
                                        id: user1.id
                                    }
                                },
                                vendor: {
                                    connect: {
                                        id: vendor2.id
                                    }
                                }
                            }
                        })];
                case 40:
                    userVendor2 = _a.sent();
                    return [4 /*yield*/, prisma.userVendor.create({
                            data: {
                                role: "ADMIN",
                                user: {
                                    connect: {
                                        id: user2.id
                                    }
                                },
                                vendor: {
                                    connect: {
                                        id: vendor1.id
                                    }
                                }
                            }
                        })];
                case 41:
                    userVendor3 = _a.sent();
                    formField1 = nextId();
                    formField2 = nextId();
                    formField3 = nextId();
                    formField4 = nextId();
                    formField5 = nextId();
                    formField6 = nextId();
                    formAnswer1 = nextId();
                    formAnswer2 = nextId();
                    formAnswer3 = nextId();
                    formAnswer4 = nextId();
                    formAnswer5 = nextId();
                    formAnswer6 = nextId();
                    formAnswer7 = nextId();
                    formAnswer8 = nextId();
                    formAnswer9 = nextId();
                    return [4 /*yield*/, prisma.form.create({
                            data: {
                                id: nextId(),
                                name: "Form 1",
                                description: "Form 1 description",
                                startDate: new Date("2021-01-01"),
                                endDate: new Date("2021-12-02"),
                                product: { connect: { id: product1.id } },
                                createdBy: {
                                    connect: {
                                        id: user2.id
                                    }
                                },
                                fields: {
                                    createMany: {
                                        data: [
                                            {
                                                id: formField1,
                                                name: "Text 1",
                                                type: "TEXT",
                                                required: true,
                                                position: 0,
                                                description: "Text 1 description"
                                            },
                                            {
                                                id: formField2,
                                                name: "TextArea 2",
                                                type: "TEXTAREA",
                                                required: false,
                                                position: 1,
                                                description: "TextArea 2 description"
                                            },
                                            {
                                                id: formField3,
                                                name: "Number 3",
                                                type: "NUMBER",
                                                required: true,
                                                position: 2,
                                                description: "Number 3 description"
                                            },
                                            {
                                                id: formField4,
                                                name: "Select 4",
                                                type: "SELECT",
                                                required: false,
                                                position: 3,
                                                description: "Select 4 description"
                                            },
                                            {
                                                id: formField5,
                                                name: "Radio 5",
                                                type: "RADIO",
                                                required: true,
                                                position: 4,
                                                description: "Radio 5 description"
                                            },
                                            {
                                                id: formField6,
                                                name: "Boolean 6",
                                                type: "BOOLEAN",
                                                required: false,
                                                position: 5,
                                                description: "Boolean 6 description"
                                            },
                                        ]
                                    }
                                },
                                responses: {
                                    createMany: {
                                        data: [
                                            {
                                                id: formAnswer1,
                                                booleanValue: true,
                                                userId: user1.id,
                                                fieldId: formField6
                                            },
                                            {
                                                id: formAnswer2,
                                                numberValue: 123,
                                                userId: user1.id,
                                                fieldId: formField3
                                            },
                                            {
                                                id: formAnswer3,
                                                textValue: "Text 1 answer",
                                                userId: user1.id,
                                                fieldId: formField1
                                            },
                                            {
                                                id: formAnswer4,
                                                textValue: "TextArea 2 answer",
                                                userId: user1.id,
                                                fieldId: formField2
                                            },
                                            {
                                                id: formAnswer5,
                                                userId: user1.id,
                                                fieldId: formField4
                                            },
                                            {
                                                id: formAnswer6,
                                                userId: user1.id,
                                                fieldId: formField5
                                            },
                                            {
                                                id: formAnswer7,
                                                userId: user1.id,
                                                fieldId: formField4
                                            },
                                            {
                                                id: formAnswer8,
                                                userId: user1.id,
                                                fieldId: formField5
                                            },
                                            {
                                                id: formAnswer9,
                                                userId: user1.id,
                                                fieldId: formField4
                                            },
                                        ]
                                    }
                                }
                            }
                        })];
                case 42:
                    form1 = _a.sent();
                    formListValue1 = nextId();
                    formListValue2 = nextId();
                    formListValue3 = nextId();
                    formListValue4 = nextId();
                    formListValue5 = nextId();
                    return [4 /*yield*/, prisma.fieldValue.createMany({
                            data: [
                                {
                                    id: formListValue1,
                                    value: "Select 4 answer 1",
                                    position: 0,
                                    parentFieldId: formField4
                                },
                                {
                                    id: formListValue2,
                                    value: "Select 4 answer 2",
                                    position: 1,
                                    parentFieldId: formField4
                                },
                                {
                                    id: formListValue3,
                                    value: "Select 4 answer 3",
                                    position: 2,
                                    parentFieldId: formField4
                                },
                                {
                                    id: formListValue4,
                                    value: "Radio 5 answer 1",
                                    position: 0,
                                    parentFieldId: formField5
                                },
                                {
                                    id: formListValue5,
                                    value: "Radio 5 answer 2",
                                    position: 1,
                                    parentFieldId: formField5
                                },
                            ]
                        })];
                case 43:
                    _a.sent();
                    return [4 /*yield*/, prisma.fieldValueResponse.createMany({
                            data: [
                                {
                                    responseId: formAnswer5,
                                    valueId: formListValue1
                                },
                                {
                                    responseId: formAnswer7,
                                    valueId: formListValue2
                                },
                                {
                                    responseId: formAnswer9,
                                    valueId: formListValue3
                                },
                                {
                                    responseId: formAnswer6,
                                    valueId: formListValue4
                                },
                                {
                                    responseId: formAnswer8,
                                    valueId: formListValue5
                                },
                            ]
                        })];
                case 44:
                    _a.sent();
                    return [4 /*yield*/, prisma.userProductFavorite.createMany({
                            data: [
                                {
                                    userId: user1.id,
                                    productId: product1.id
                                },
                                {
                                    userId: user1.id,
                                    productId: product2.id
                                },
                                {
                                    userId: user1.id,
                                    productId: product3.id
                                },
                                {
                                    userId: user1.id,
                                    productId: product4.id
                                },
                            ]
                        })];
                case 45:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .then(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })["catch"](function (e) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.error(e);
                return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                process.exit(1);
                return [2 /*return*/];
        }
    });
}); });
