import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const TeacherSchema = new mongoose.Schema({
 
    teacherFullName: {
        type: String,
        required: true,
    },

    teacherUserName: {
        type: String,
        required: true,
        unique: true,
    },
    
    teacherAge: {
        type: Number,
        required: true,
    },
 
    teacherGender: {
        type: String,
        required: true,
    },

    type: {
        type: String,
        enum: ["teacher"],
        default: "teacher",
    },

    teacherCourseCode: { // course code

        type: String

    },
 
    teacherEmail: {
        type: String,
      
    },

    teacherPassword: {
        type: String,
        select: false,
    },
      	 
    teacherPhoneNumber: {
        type: String,
        
     
    },

    teacherSubjects: [{
        type: String,

    }],

     
    // course: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Course',

    // }],
   
   
}, {timestamps: true});


TeacherSchema.methods = {
    
    generateTeacherLogin: async function () {

        return jwt.sign(
            {
                id: this._id,
                teacherEmail: this.teacherEmail,
                role: 'teacher',
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "24h"
            }
        )
    },


}

 
export const Teacher = mongoose.model('Teacher', TeacherSchema);