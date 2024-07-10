import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const StudentSchema = new mongoose.Schema({
 
    studentFullName: {
        type: String,
   
    },


    studentUserName: {
        type: String,
        required: true,
        unique: true,
    },


    studentCourseCode: {

        type: String

    },

        
    studentAge: {
        type: Number,
      
    },

    studentAvatar: {
        public_id: {
            type: String,
            
        },
        public_url: {
            type: String,
            
        }

    },

    studentAddress: {
        type: String,
        
    },

    studentPhoneNumber: {
        type: Number,
       
    },

    studentGender: {
        type: String,
       
    },

    userType: {
        type: String,
        enum: ["student", "teacher", "admin"],
        default: "student",

    },

    studentPassword: {
        type: String,
        required: true,
        select: false,  
    },

    studentEmail: {
        type: String,
        required: true,
        unique: true,
    },

    isActive: {
        type: Boolean,
        default: true,
    },

    studentCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
    }],





}, {timestamps: true});



StudentSchema.methods = {

    generateStudentLogin: function () {

        return jwt.sign(
            {
                studentEmail: this.studentEmail,
                id: this._id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "24h",
            }
        )
    }
}



export const Student =  mongoose.model('Student', StudentSchema);