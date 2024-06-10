"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contract = void 0;
const typeorm_store_1 = require("@subsquid/typeorm-store");
// Here we define `exchange` database table as TypeORM entity class.
//
// We do that with the help of decorators from `@subsquid/typeorm-store` package.
//
// Those decorators are convenience and restrictive wrappers around decorators from `typeorm`.
//
// All restrictions are related to the fact, that `@subsquid/typeorm-store`
// supports only primitive DML operations (insert, upsert, update and delete)
// without cascading.
let Contract = class Contract {
    constructor(props) {
        Object.assign(this, props);
    }
};
exports.Contract = Contract;
__decorate([
    (0, typeorm_store_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Contract.prototype, "id", void 0);
__decorate([
    (0, typeorm_store_1.IntColumn)({ nullable: false }),
    __metadata("design:type", Number)
], Contract.prototype, "logsCount", void 0);
__decorate([
    (0, typeorm_store_1.IntColumn)({ nullable: false }),
    __metadata("design:type", Number)
], Contract.prototype, "foundAt", void 0);
exports.Contract = Contract = __decorate([
    (0, typeorm_store_1.Entity)(),
    __metadata("design:paramtypes", [Object])
], Contract);
//# sourceMappingURL=contract.model.js.map