// /components/Dashboard/Dashboard.js
import React, { useEffect, useState } from 'react';
import DashboardCard from './DashboardCard';
import axios from 'axios';

const Dashboard = () => {
  const [totalEntrolledStudents,setTotalEntrolledStudents] = useState(0);
  const [totalTeachers,setTotalTeachers] = useState(0);
  const [totalCourses,setTotalCourses] = useState(0);

  useEffect(() => {
    //fetch data from api
    axios.post('/api/admin/totalStudentsEnrolled').then(res => setTotalEntrolledStudents(res.data.data.length));
    axios.post('/api/admin/totalTeachers').then(res => setTotalTeachers(res.data.data.length));
    axios.post('/api/admin/totalCourses').then(res => setTotalCourses(res.data.data.length));

  },[]) 

  console.log(totalEntrolledStudents)
  return (
    <div className="min-h-screen w-full bg-gray-100 p-4">
      <div className="container mx-auto rounded-lg shadow-md p-6 bg-white">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">Admin Dashboard</h1>
        <div className="grid grid-cols-4 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          <DashboardCard title="Enrolled Students" number={totalEntrolledStudents} />
          <DashboardCard title="Number of Teachers" number={totalTeachers} />
          <DashboardCard title="Number of Courses" number={totalCourses} />
          {/* <DashboardCard title="Number of Classes" number={30} />
          <DashboardCard title="Number of Departments" number={10} /> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
