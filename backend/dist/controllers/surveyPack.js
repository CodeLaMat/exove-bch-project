"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceSurveyor = exports.updateManager = exports.updateManagerApproval = exports.getManagerApproval = exports.updateSurveyors = exports.getSurveyors = exports.deleteSurveyPack = exports.updateSurveyPack = exports.getSurveyPack = exports.createSurveyPack = exports.getAllSurveyPacks = exports.sendReminderEmail = void 0;
const surveyPack_1 = __importDefault(require("../models/surveyPack"));
const http_status_codes_1 = require("http-status-codes");
const errors_1 = require("../errors");
const user_1 = __importDefault(require("../models/user"));
const util_1 = require("../util");
const responses_1 = __importDefault(require("../models/responses"));
const surveys_1 = __importDefault(require("../models/surveys"));
const getAllSurveyPacks = async (req, res) => {
    const surveyPacks = await surveyPack_1.default.find();
    if (!surveyPacks) {
        throw new errors_1.NotFoundError(`No surveyPacks found`);
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ surveyPacks });
};
exports.getAllSurveyPacks = getAllSurveyPacks;
const createSurveyPack = async (req, res) => {
    const surveyPack = await surveyPack_1.default.create(req.body);
    if (!surveyPack) {
        throw new errors_1.BadRequestError("Please complete the form");
    }
    const personBeingSurveyed = await user_1.default.findById(surveyPack.personBeingSurveyed);
    if (!personBeingSurveyed) {
        throw new errors_1.NotFoundError("personBeingSurveyed not found");
    }
    try {
        await (0, util_1.sendUserEmail)({
            name: personBeingSurveyed.displayName,
            email: personBeingSurveyed.email,
            senderEmail: req.user.email[0],
            senderName: req.user.name[0],
        });
    }
    catch (error) {
        console.error("Error sending email: ", error);
    }
    res.status(http_status_codes_1.StatusCodes.CREATED).json({ surveyPack });
};
exports.createSurveyPack = createSurveyPack;
const getSurveyPack = async (req, res) => {
    const { params: { id: surveyPackId }, } = req;
    const surveyPack = await surveyPack_1.default.findOne({ _id: surveyPackId });
    if (!surveyPack) {
        throw new errors_1.NotFoundError(`No surveyPack with id ${surveyPackId}`);
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ surveyPack });
};
exports.getSurveyPack = getSurveyPack;
const updateSurveyPack = async (req, res) => {
    var _a;
    const { id: surveyPackId } = req.params;
    const surveyPack = await surveyPack_1.default.findById(surveyPackId);
    if (!surveyPack) {
        throw new errors_1.NotFoundError(`No surveyPack with id ${surveyPackId}`);
    }
    // const updatedSurveyPack = await SurveyPack.findByIdAndUpdate(
    //   surveyPackId,
    //   req.body,
    //   {
    //     new: true,
    //     runValidators: true,
    //   }
    // );
    const updatedSurveyPack = await surveyPack_1.default.findByIdAndUpdate(surveyPackId, req.body, {
        new: true,
        runValidators: true,
    }).populate("survey", "questions");
    if (updatedSurveyPack.hrapproved === true &&
        updatedSurveyPack.employeesTakingSurvey.length === 6 &&
        updatedSurveyPack.employeesTakingSurvey.every((status) => {
            return status.acceptanceStatus === "Approved";
        })) {
        const [surveyors, reviewee] = await Promise.all([
            user_1.default.find({
                _id: {
                    $in: updatedSurveyPack.employeesTakingSurvey.map((status) => status.employee),
                },
            }),
            user_1.default.findById(updatedSurveyPack.personBeingSurveyed),
        ]);
        for (const surveyor of surveyors) {
            try {
                if (reviewee) {
                    await (0, util_1.sendHrApprovalEmail)({
                        receiverEmail: surveyor.email,
                        receiverName: surveyor.displayName,
                        employeeName: reviewee.displayName,
                        senderEmail: req.user.email[0],
                        senderName: req.user.name[0],
                    });
                }
            }
            catch (error) {
                console.error(`Error sending email to ${surveyor.email}`, error);
            }
        }
        const surveys = await surveys_1.default.findById(updatedSurveyPack === null || updatedSurveyPack === void 0 ? void 0 : updatedSurveyPack.survey);
        if (!surveys) {
            throw new errors_1.NotFoundError("surveys not found");
        }
        // const allResponses = surveys.questions.map((question) => {
        //   return {
        //     question: question._id,
        //     response: "",
        //   };
        // });
        console.log("updatedSurveyPack", updatedSurveyPack);
        console.log("updatedSurveyPack.employeesTakingSurvey", updatedSurveyPack === null || updatedSurveyPack === void 0 ? void 0 : updatedSurveyPack.employeesTakingSurvey);
        console.log("updatedSurveyPack.survey", updatedSurveyPack === null || updatedSurveyPack === void 0 ? void 0 : updatedSurveyPack.survey);
        console.log("updatedSurveyPack.survey.questions", (_a = updatedSurveyPack === null || updatedSurveyPack === void 0 ? void 0 : updatedSurveyPack.survey) === null || _a === void 0 ? void 0 : _a.questions);
        let totalResponses;
        if (updatedSurveyPack &&
            updatedSurveyPack.employeesTakingSurvey &&
            updatedSurveyPack.survey.questions &&
            updatedSurveyPack.survey) {
            totalResponses = updatedSurveyPack.employeesTakingSurvey.map((e) => ({
                employeeTakingSurvey: e.employee,
                allResponses: updatedSurveyPack.survey.questions.map((q) => ({
                    question: q._id,
                    response: "",
                })),
            }));
        }
        else {
            totalResponses = [];
        }
        // const totalResponses = updatedSurveyPack?.employeesTakingSurvey.map(
        //   (e) => ({
        //     employeeTakingSurvey: e.employee,
        //     allResponses: allResponses,
        //   })
        // );
        const responsePack = responses_1.default.create({
            surveyPack: updatedSurveyPack === null || updatedSurveyPack === void 0 ? void 0 : updatedSurveyPack._id,
            personBeingSurveyed: updatedSurveyPack === null || updatedSurveyPack === void 0 ? void 0 : updatedSurveyPack.personBeingSurveyed,
            survey: updatedSurveyPack === null || updatedSurveyPack === void 0 ? void 0 : updatedSurveyPack.survey,
            totalResponses: totalResponses,
        });
        console.log("responsePack", responsePack);
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            msg: "surveyPack successfully updated and responsePack created",
            surveyPack: updatedSurveyPack,
            responsePack: responsePack,
        });
    }
    else {
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            msg: "surveyPack successfully updated",
            surveyPack: updatedSurveyPack,
        });
    }
};
exports.updateSurveyPack = updateSurveyPack;
const deleteSurveyPack = async (req, res) => {
    const { params: { id: surveyPackId }, } = req;
    const surveyPack = await surveyPack_1.default.findByIdAndRemove({ _id: surveyPackId });
    if (!surveyPack) {
        throw new errors_1.NotFoundError(`No product with id : ${surveyPackId}`);
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ msg: "Success! SurveyPack removed." });
};
exports.deleteSurveyPack = deleteSurveyPack;
const getSurveyors = async (req, res) => {
    const { params: { id: surveyPackId }, } = req;
    const surveyPack = await surveyPack_1.default.findById({ _id: surveyPackId }, { employeesTakingSurvey: 1, manager: 1, managerapproved: 1 })
        .populate("employeesTakingSurvey")
        .populate("survey");
    if (!surveyPack) {
        throw new errors_1.NotFoundError(`surveyPack ${surveyPackId} not found`);
    }
    const employeesTakingSurvey = surveyPack.employeesTakingSurvey;
    const survey = surveyPack.survey;
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json({ employeesTakingSurvey: employeesTakingSurvey, survey: survey });
};
exports.getSurveyors = getSurveyors;
const updateSurveyors = async (req, res) => {
    const { params: { id: surveyPackId }, body: { employeesTakingSurvey }, } = req;
    const surveyPack = await surveyPack_1.default.findById({ _id: surveyPackId });
    if (!surveyPack) {
        throw new errors_1.NotFoundError(`surveyPack ${surveyPackId} not found`);
    }
    const existingParticipants = new Set(surveyPack.employeesTakingSurvey.map((participant) => participant.employee));
    const newParticipants = employeesTakingSurvey.filter((participant) => !existingParticipants.has(participant.employee));
    surveyPack.employeesTakingSurvey.push(...newParticipants);
    await surveyPack.save();
    if (surveyPack.employeesTakingSurvey.length === 6 &&
        surveyPack.employeesTakingSurvey.every((status) => {
            return status.acceptanceStatus === "Pending";
        })) {
        const [surveyors, reviewee] = await Promise.all([
            user_1.default.find({
                _id: {
                    $in: surveyPack.employeesTakingSurvey.map((status) => status.employee),
                },
            }),
            user_1.default.findById(surveyPack.personBeingSurveyed),
        ]);
        for (const surveyor of surveyors) {
            try {
                if (reviewee) {
                    await (0, util_1.sendParticipantEmail)({
                        receiverEmail: surveyor.email,
                        receiverName: surveyor.displayName,
                        employeeName: reviewee.displayName,
                    });
                }
            }
            catch (error) {
                console.error(`Error sending email to ${surveyor.email}`, error);
            }
        }
    }
    else if (surveyPack.employeesTakingSurvey.some((status) => {
        return status.acceptanceStatus === "Declined";
    })) {
        const personBeingSurveyed = await user_1.default.findById(surveyPack.personBeingSurveyed);
        if (personBeingSurveyed) {
            try {
                await (0, util_1.sendDeclineEmail)({
                    senderName: req.user.name[0],
                    employeeEmail: personBeingSurveyed.email,
                    employeeName: personBeingSurveyed.displayName,
                });
            }
            catch (error) {
                console.error(`Error sending declined email to ${personBeingSurveyed.email}`, error);
            }
        }
    }
    return res.status(http_status_codes_1.StatusCodes.OK).json({
        msg: "EmployeesTakingSurvey updated successfully",
        employeesTakingSurvey: surveyPack.employeesTakingSurvey,
    });
};
exports.updateSurveyors = updateSurveyors;
const getManagerApproval = async (req, res) => {
    const { params: { id: surveyPackId }, } = req;
    const surveyPack = await surveyPack_1.default.findById({ _id: surveyPackId }, { survey: 1, employeesTakingSurvey: 1, manager: 1, managerapproved: 1 });
    if (!surveyPack) {
        throw new errors_1.NotFoundError(`No product with id : ${surveyPackId}`);
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ surveyPack });
};
exports.getManagerApproval = getManagerApproval;
const updateManagerApproval = async (req, res) => {
    const { params: { id: surveyPackId }, body: { employeesTakingSurvey, manager, managerapproved }, } = req;
    const surveyPack = await surveyPack_1.default.findById({ _id: surveyPackId });
    if (!surveyPack) {
        throw new errors_1.NotFoundError(`surveyPack ${surveyPackId} not found`);
    }
    surveyPack.employeesTakingSurvey = employeesTakingSurvey;
    surveyPack.manager = manager;
    surveyPack.managerapproved = managerapproved;
    await surveyPack.save();
    res.status(http_status_codes_1.StatusCodes.ACCEPTED).json({
        msg: "manager approval successful updated",
        employeesTakingSurvey: surveyPack.employeesTakingSurvey,
        managerapproved: surveyPack.managerapproved,
        manager: surveyPack.manager,
    });
};
exports.updateManagerApproval = updateManagerApproval;
// Added by Eyvaz to update the manager in the surveyPack
const updateManager = async (req, res) => {
    const { params: { id: surveyPackId }, body: { manager }, } = req;
    const surveyPack = await surveyPack_1.default.findById({ _id: surveyPackId });
    if (!surveyPack) {
        throw new errors_1.NotFoundError(`surveyPack ${surveyPackId} not found`);
    }
    surveyPack.manager = manager;
    await surveyPack.save();
    res.status(http_status_codes_1.StatusCodes.ACCEPTED).json({
        msg: "Manager successfully updated",
        manager: surveyPack.manager,
    });
};
exports.updateManager = updateManager;
// Added by Eyvaz to send email to the pesronBeingSurveyed to select the participants
const sendReminderEmail = async (req, res) => {
    const { params: { id: surveyPackId }, body: { personBeingSurveyed }, } = req;
    const surveyPack = await surveyPack_1.default.findById({ _id: surveyPackId });
    if (!surveyPack) {
        throw new errors_1.NotFoundError(`surveyPack ${surveyPackId} not found`);
    }
    try {
        await (0, util_1.sendReminder)({
            revieweeName: personBeingSurveyed.displayName,
            revieweeEmail: personBeingSurveyed.email,
        });
        res.status(200).json({ message: "Reminder email sent successfully." });
    }
    catch (error) {
        console.error("Error sending email: ", error);
        res.status(500).json({ message: "Failed to send reminder email." });
    }
};
exports.sendReminderEmail = sendReminderEmail;
// Added by Eyvaz to update the participant individually
const replaceSurveyor = async (req, res) => {
    const { params: { id: surveyPackId }, body: { oldUserId, newParticipant }, } = req;
    const surveyPack = await surveyPack_1.default.findById({ _id: surveyPackId });
    if (!surveyPack) {
        throw new errors_1.NotFoundError(`SurveyPack ${surveyPackId} not found`);
    }
    const indexToReplace = surveyPack.employeesTakingSurvey.findIndex((participant) => participant.employee._id.toString() === oldUserId);
    if (indexToReplace === -1) {
        throw new errors_1.BadRequestError(`User with id ${oldUserId} not found in survey`);
    }
    surveyPack.employeesTakingSurvey[indexToReplace] = newParticipant;
    await surveyPack.save();
    const newUser = await user_1.default.findById(newParticipant.employee);
    if (!newUser) {
        throw new errors_1.NotFoundError(`User with id ${newParticipant.employee} not found`);
    }
    try {
        await (0, util_1.sendParticipantEmail)({
            receiverEmail: newUser.email,
            receiverName: newUser.displayName,
            employeeName: newUser.displayName,
        });
    }
    catch (error) {
        console.error(`Error sending email to ${newUser.email}`, error);
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({
        msg: `User ${oldUserId} replaced with user ${newParticipant.employee} successfully`,
        employeesTakingSurvey: surveyPack.employeesTakingSurvey,
    });
};
exports.replaceSurveyor = replaceSurveyor;
