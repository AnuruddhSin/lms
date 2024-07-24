import React from 'react';
import { Route, Routes,Link } from 'react-router-dom';
import Admin from '../Admin/Admin';

import AdminDashboard from '../Admin/components/Dashboard/Dashboard';
import ViewLecture from '../Common/ViewLecture/ViewLecture';

import CreateCourse from '../Admin/CreateCourse/CreateCourse';
import TeacherList from '../Admin/components/Customer/TeacherList';
import CourseTable from '../Admin/components/CourseTable/CourseTable';
import { FaTachometerAlt, FaBoxOpen, FaTags, FaUser, FaTimes } from 'react-icons/fa';
import UpdateCourse from '../Admin/UpdateCourse/UpdateCourse';
import AdminNavbar from '../Admin/Navigation/AdminNavbar';

function AdminRoute() {

  const sidebarClasses = 'w-64 bg-white border-r border-gray-200 shadow-lg fixed lg:static h-full z-50';
  const linkClasses = 'flex items-center p-4 mt-2 text-gray-600 hover:bg-gray-100 hover:text-green-500 rounded-lg transition-colors duration-200';

  const menu = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <FaTachometerAlt /> },
    { name: "Courses", path: "/admin/courses", icon: <FaBoxOpen /> },
  
    { name: "CreateCourse", path: "/createCourse", icon: <FaTags /> },
  
    { name: "update Course", path: "/admin/updateCourse", icon: <FaUser /> },
    { name: "Teacher List", path: "/admin/teachers", icon: <FaUser /> },
    
  
  
  ];

  return (
      <>
      <AdminNavbar/>
    <div className='flex'>

<div className={sidebarClasses}>

              <div className="p-4 flex justify-between items-center w-[280px]">
                <h1 className="text-2xl font-bold text-red-500">Admin</h1>
                <button className="text-gray-400 hover:text-green-500 lg:hidden" onClick={null}>
                  <FaTimes />
                </button>
              </div>
              <nav className="mt-8 h-screen">
              
                {menu.map((item, index) => (
                  <Link to={item.path} key={index} className={linkClasses}>
                    {item.icon}
                    <span className="ml-3">{item.name}</span>
                  </Link>
                ))}
              </nav>
      </div>
      <Routes>


        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/teachers" element={<TeacherList />} />
   

        <Route path="/admin/courses" element={<CourseTable />} />
        <Route path="/admin/viewLectures" element={<ViewLecture />} />


        <Route path="/createCourse" element={<CreateCourse />} />
        <Route path="/admin/updateCourse" element={<UpdateCourse />} />

      </Routes>
    </div></>
  )

}

export default AdminRoute
