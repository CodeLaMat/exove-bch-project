"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateManagerApproval =
  exports.getManagerApproval =
  exports.updateSurveyors =
  exports.getSurveyors =
  exports.deleteSurveyPack =
  exports.updateSurveyPack =
  exports.getSurveyPack =
  exports.createSurveyPack =
  exports.getAllSurveyPacks =
    void 0;
exports.updateManagerApproval =
  exports.getManagerApproval =
  exports.updateSurveyors =
  exports.getSurveyors =
  exports.deleteSurveyPack =
  exports.updateSurveyPack =
  exports.getSurveyPack =
  exports.createSurveyPack =
  exports.getAllSurveyPacks =
    void 0;
const surveyPack_1 = __importDefault(require("../models/surveyPack"));
const http_status_codes_1 = require("http-status-codes");
const errors_1 = require("../errors");
const user_1 = __importDefault(require("../models/user"));
const util_1 = require("../util");
const getAllSurveyPacks = async (req, res) => {
  const surveyPacks = await surveyPack_1.default.find();
  if (!surveyPacks) {
    throw new errors_1.NotFoundError(`No surveyPacks found`);
  }
  res.status(http_status_codes_1.StatusCodes.OK).json({ surveyPacks });
};
exports.getAllSurveyPacks = getAllSurveyPacks;
const createSurveyPack = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    const surveyPack = await surveyPack_1.default.create(req.body);
    if (!surveyPack) {
      throw new errors_1.BadRequestError("Please complete the form");
    }
    const personBeingSurveyed = await user_1.default.findById(
      surveyPack.personBeingSurveyed
    );
    if (!personBeingSurveyed) {
      throw new errors_1.NotFoundError("personBeingSurveyed not found");
    }
    try {
      await (0, util_1.sendUserEmail)({
        name: personBeingSurveyed.displayName,
        email: personBeingSurveyed.email,
        senderEmail: req.user.email,
        senderName: req.user.name,
      });
      console.log("Email sent successfully");
    } catch (error) {
      console.error("Error sending email: ", error);
        await (0, util_1.sendUserEmail)({
            name: personBeingSurveyed.displayName,
            email: personBeingSurveyed.email,
            senderEmail: req.user.email,
            senderName: req.user.name,
        });
    }
    catch (error) {
        console.error("Error sending email: ", error);
    }
    res.status(http_status_codes_1.StatusCodes.CREATED).json({ surveyPack });
  } catch (error) {
    console.error("Error creating survey pack:", error);
    throw new errors_1.BadRequestError("Failed to create survey pack");
  }
};
exports.createSurveyPack = createSurveyPack;
const getSurveyPack = async (req, res) => {
  const {
    params: { id: surveyPackId },
  } = req;
  const surveyPack = await surveyPack_1.default.findOne({ _id: surveyPackId });
  if (!surveyPack) {
    throw new errors_1.NotFoundError(`No surveyPack with id ${surveyPackId}`);
  }
  res.status(http_status_codes_1.StatusCodes.OK).json({ surveyPack });
};
exports.getSurveyPack = getSurveyPack;
const updateSurveyPack = async (req, res) => {
    const { id: surveyPackId } = req.params;
    const surveyPack = await surveyPack_1.default.findById(surveyPackId);
    if (!surveyPack) {
        throw new errors_1.NotFoundError(`No surveyPack with id ${surveyPackId}`);
    }
    const updatedSurveyPack = await surveyPack_1.default.findByIdAndUpdate(surveyPackId, req.body, {
        new: true,
        runValidators: true,
    });
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
                        senderEmail: req.user.email,
                        senderName: req.user.name,
                    });
                }
            }
            catch (error) {
                console.error(`Error sending email to ${surveyor.email}`, error);
            }
        }
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({
        msg: "surveyPack successfully updated",
        surveyPack: updatedSurveyPack,
    });
};
exports.updateSurveyPack = updateSurveyPack;
const deleteSurveyPack = async (req, res) => {
  const {
    params: { id: surveyPackId },
  } = req;
  const surveyPack = await surveyPack_1.default.findByIdAndRemove({
    _id: surveyPackId,
  });
  if (!surveyPack) {
    throw new errors_1.NotFoundError(`No product with id : ${surveyPackId}`);
  }
  res
    .status(http_status_codes_1.StatusCodes.OK)
    .json({ msg: "Success! SurveyPack removed." });
};
exports.deleteSurveyPack = deleteSurveyPack;
const getSurveyors = async (req, res) => {
  const {
    params: { id: surveyPackId },
  } = req;
  const surveyPack = await surveyPack_1.default
    .findById({ _id: surveyPackId })
    .populate("employeesTakingSurvey");
  if (!surveyPack) {
    throw new errors_1.NotFoundError(`surveyPack ${surveyPackId} not found`);
  }
  const employeesTakingSurvey = surveyPack.employeesTakingSurvey;
  return res
    .status(http_status_codes_1.StatusCodes.OK)
    .json({ employeesTakingSurvey });
};
exports.getSurveyors = getSurveyors;
const updateSurveyors = async (req, res) => {
  const {
    params: { id: surveyPackId },
    body: { employeesTakingSurvey },
  } = req;
  const surveyPack = await surveyPack_1.default.findById({ _id: surveyPackId });
  if (!surveyPack) {
    throw new errors_1.NotFoundError(`surveyPack ${surveyPackId} not found`);
  }
  surveyPack.employeesTakingSurvey = employeesTakingSurvey;
  await surveyPack.save();
  return res.status(http_status_codes_1.StatusCodes.OK).json({
    msg: "EmployeesTakingSurvey updated successfully",
    employeesTakingSurvey: surveyPack.employeesTakingSurvey,
  });
    const { params: { id: surveyPackId }, body: { employeesTakingSurvey }, } = req;
    const surveyPack = await surveyPack_1.default.findById({ _id: surveyPackId });
    if (!surveyPack) {
        throw new errors_1.NotFoundError(`surveyPack ${surveyPackId} not found`);
    }
    surveyPack.employeesTakingSurvey = employeesTakingSurvey;
    await surveyPack.save();
    if (surveyPack.employeesTakingSurvey.length === 6 &&
        surveyPack.employeesTakingSurvey.every((status) => {
            return status.acceptanceStatus === "Declined";
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
    return res.status(http_status_codes_1.StatusCodes.OK).json({
        msg: "EmployeesTakingSurvey updated successfully",
        employeesTakingSurvey: surveyPack.employeesTakingSurvey,
    });
};
exports.updateSurveyors = updateSurveyors;
const getManagerApproval = async (req, res) => {
  const {
    params: { id: surveyPackId },
  } = req;
  const surveyPack = await surveyPack_1.default.findById(
    { _id: surveyPackId },
    { employeesTakingSurvey: 1, manager: 1, managerapproved: 1 }
  );
  if (!surveyPack) {
    throw new errors_1.NotFoundError(`No product with id : ${surveyPackId}`);
  }
  res.status(http_status_codes_1.StatusCodes.OK).json({ surveyPack });
};
exports.getManagerApproval = getManagerApproval;
const updateManagerApproval = async (req, res) => {
  const {
    params: { id: surveyPackId },
    body: { employeesTakingSurvey, manager, managerapproved },
  } = req;
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
