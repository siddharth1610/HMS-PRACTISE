import { Appointment } from "../models/apointmentSchema.js";
import { User } from "../models/userSchema.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/Apiresponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const postAppointment = asyncHandler(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    aadhar,
    dob,
    gender,
    appointment_date,
    department,
    doctor_firstName,
    doctor_lastName,
    hasVisited,
    address,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !aadhar ||
    !dob ||
    !gender ||
    !appointment_date ||
    !department ||
    !doctor_firstName ||
    !doctor_lastName ||
    !address
  ) {
    throw (new ApiError("Please Fill Full Form!", 400));
  }
  const isConflict = await User.find({
    firstName: doctor_firstName,
    lastName: doctor_lastName,
    role: "Doctor",
    doctorDepartment: department,
  });
  if (isConflict.length === 0) {
    throw(new ApiError("Doctor not found", 404));
  }

  if (isConflict.length > 1) {
    throw(
      new ApiError(
        "Doctors Conflict! Please Contact Through Email Or Phone!",
        400
      )
    );
  }
  const doctorId = isConflict[0]._id;
  const patientId = req.user._id;
  const appointment = await Appointment.create({
    firstName,
    lastName,
    email,
    phone,
    aadhar,
    dob,
    gender,
    appointment_date,
    department,
    doctor: {
      firstName: doctor_firstName,
      lastName: doctor_lastName,
    },
    hasVisited,
    address,
    doctorId,
    patientId,
  });
  res.status(200).json(
new ApiResponse(200,
    appointment,
    "Appointment Send!")
  );
});

export const getAllAppointments = asyncHandler(async (req, res, next) => {
    const appointments = await Appointment.find();
    res.status(200).json( new ApiResponse(200,
      appointments),
    );
  });

  export const updateAppointmentStatus = asyncHandler(
    async (req, res, next) => {
      const { id } = req.params;
      let appointment = await Appointment.findById(id);
      if (!appointment) {
        throw (new ApiError("Appointment not found!", 404));
      }
      appointment = await Appointment.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });
      res.status(200).json(new ApiResponse(200,"Appointment Status Updated!"));
    }
  );
  export const deleteAppointment = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      throw(new ApiError("Appointment Not Found!", 404));
    }
    await appointment.deleteOne();
    res.status(200).json(new ApiResponse(200,"Appointment Deleted!"));
  });