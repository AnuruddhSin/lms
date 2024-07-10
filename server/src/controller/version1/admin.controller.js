import { Admin } from '../../models/admin.model.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import bcrypt from 'bcrypt';
import ApiError from '../../utils/ApiError.js';
import ApiResponse from '../../utils/apiResponse.js';
import { Teacher } from '../../models/teacher.model.js';
import { Student } from '../../models/student.model.js';

const cookieOptions = {
    maxAge: 1000 * 60 * 60 * 24 * 30,
    httpOnly: true,
    secure: true
};

const createAdmin = asyncHandler(async (req, res) => {
    try {
        const { studentEmail, studentPassword } = req.body;
        console.log(studentEmail, studentPassword);
        const user = await Student.findOne({ studentEmail }).select('+studentPassword');
        // if(!user) {
        //     return new ApiError(400, 'Student with this email already exists');
        // }

        const comparePassword = await bcrypt.compare(studentPassword, user.studentPassword);

        if (!comparePassword) {
            return new ApiError(400, 'Invalid password for this student');
        }

        /// create a entry in admin collection
        console.log(user);
        const admin = await Admin.create({
            adminName: user.studentName,
            adminUserName: user.studentUserName,
            adminEmail: user.studentEmail,
            adminPhoneNumber: user.studentPhoneNumber,
            adminPassword: user.studentPassword,
            isActive: true
        });

        /// delete a entry in the student collection
        const deleteStudent = await Student.findByIdAndDelete(user._id);

        return res.status(200).json(new ApiResponse(200, 'Admin create successfully', user));
    } catch (error) {
        console.log('error => ', error);

        return res.status(400).json(new ApiError(400, error.message));
    }
});

const createTeacher = asyncHandler(async (req, res) => {
    try {
        const { studentEmail, studentPassword } = req.body;

        const user = await Student.findOne({ studentEmail }).select('+studentPassword');

        if (!user) {
            return new ApiError(400, 'Student with this email already exists');
        }

        const comparePassword = await bcrypt.compare(studentPassword, user.studentPassword);

        if (!comparePassword) {
            return new ApiError(400, 'Invalid password for this student');
        }

        /// create a entry in admin collection

        const teacher = await Teacher.create({
            teacherName: user.studentName,
            teacherEmail: user.studentEmail,
            teacherPhoneNumber: user.studentPhoneNumber,
            teacherPassword: user.studentPassword,
            isActive: true
        });

        /// delete a entry in the student collection
        const deleteStudent = await Student.findByIdAndDelete(user._id);

        return res.status(200).json(new ApiResponse(200, 'Teacher create successfully', teacher));
    } catch (error) {
        console.log('error => ', error);

        return res.status(400).json(new ApiError(400, error.message));
    }
});

const updateAdmin = asyncHandler(async (req, res) => {
    const { adminEmail } = req.user;

    const { adminName, adminPhoneNumber } = req.body;

    try {
        const user = await Admin.findOne({ adminEmail });

        if (adminName) {
            user.adminName = adminName;
        }

        if (adminPhoneNumber) {
            user.adminPhoneNumber = adminPhoneNumber;
        }

        if (req.file) {
            const uploadedFile = await uploadOnCloudinary(req.file.path);

            user.adminAvatar.public_id = uploadedFile.public_id;
            user.adminAvatar.public_url = uploadedFile.public_url;
        }

        await user.save();

        return res.status(200).json(new ApiResponse(200, 'Admin updated successfully', user));
    } catch (error) {
        return res.status(400).json(new ApiError(400, error.message));
    }
});

const logoutAdmin = asyncHandler(async (req, res) => {
    const adminToken = req.cookies?.adminToken;

    console.log('admin token => ', adminToken);

    try {
        if (!adminToken) {
            return res.status(400).json(new ApiError(400, 'Admin token not found'));
        }

        return res
            .status(200)
            .cookie('adminToken', null, cookieOptions)
            .json(new ApiResponse(200, 'Admin logout successfully'));
    } catch (error) {
        console.log(error);
        return res.status(400).json(new ApiError(400, error.message));
    }
});

export {
    createAdmin, /// create admin
    createTeacher, //// create teacher
    updateAdmin,
    logoutAdmin
};
