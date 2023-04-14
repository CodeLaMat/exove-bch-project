"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name must be provided"],
        trim: true,
        minlength: 3,
        maxlength: 20,
    },
    surName: {
        type: String,
        required: [true, "last name must be provided"],
        trim: true,
        minlength: 3,
        maxlength: 20,
    },
    email: {
        type: String,
        required: [true, "email must be provided"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "password must be provided"],
        minlength: 6,
    },
    personal: {
        type: mongoose.Schema.Types.Mixed,
        default: {},
    },
    about: {
        type: mongoose.Schema.Types.Mixed,
        default: {},
    },
    work: {
        reportsTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    title: {
        type: String,
    },
    department: {
        type: String,
    },
    site: {
        type: String,
    },
    startDate: {
        type: Date,
    },
    role: {
        type: String,
        enum: {
            values: ["employee", "hr", "manager"],
            message: "{VALUE} is not supported",
        },
    },
    image: {
        type: String,
    },
});
UserSchema.virtual("displayName").get(function () {
    return "".concat(this.firstName, " ").concat(this.surName);
});
var User = mongoose.model("User", UserSchema);
exports.default = User;
