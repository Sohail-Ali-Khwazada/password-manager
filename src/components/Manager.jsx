import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { FaEye, FaEyeSlash, FaCopy } from "react-icons/fa";
import { MdDelete, MdModeEdit } from "react-icons/md";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Manager() {
  const [passVisibility, setPassVisibility] = useState(false);
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);
  const passwordRef = useRef();

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, [])

  const showPassword = () => {
    setPassVisibility(!passVisibility);
    if (passwordRef.current.type == "password") passwordRef.current.type = "text";
    else passwordRef.current.type = "password";
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const copyText = (text) => {
    toast('Copied to Clipboard', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  }

  const savePassword = () => {
    if(form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
      console.log(form.site.length,form.username,form.password)
      localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form,id: uuidv4()}]));
      setPasswordArray([...passwordArray, {...form,id: uuidv4()}]);
      console.log([...passwordArray, form]);
      setForm({ site: "", username: "", password: "" });
      toast('Password saved', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }else{
      console.log(form.site.length,form.username,form.password)
      toast.error("Error:Password not saved!!");
    }
  }

  const deletePassword = (id) => {
    console.log("Deleting record...");
    setPasswordArray(passwordArray.filter(item=>item.id !== id));
    localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id !== id)));
    toast('Password Deleted', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }

  const editPassword = (id) => {
    console.log("Editing record...");
    setForm(passwordArray.filter(item => item.id === id)[0]);
    setPasswordArray(passwordArray.filter(item=>item.id !== id));
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div></div>

      <div className="p-2 md:p-0 md:mycontainer">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-700">&lt;</span>
          Pass<span className="text-green-500">OP/&gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center">Your own Password Manager</p>
        <div className="flex flex-col p-4 text-black gap-8 items-center">
          <input value={form.site}
            name="site"
            onChange={handleChange} placeholder="Enter website URL" className="rounded-full border border-green-500 w-full px-4 py-1" type="text" />
          <div className="flex flex-col md:flex-row w-full justify-between gap-8">
            <input value={form.username}
              name="username"
              onChange={handleChange}
              placeholder="Enter Username" className="rounded-full border border-green-500 w-full px-4 py-1" type="text" />
            <div className="relative">
              <input value={form.password}
                name="password"
                onChange={handleChange}
                placeholder="Enter Password" className="rounded-full border border-green-500 w-full px-4 py-1" type="password"
                ref={passwordRef} />
              <span className="absolute right-2 top-2 cursor-pointer" onClick={showPassword}>
                {passVisibility ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          <button className="flex justify-center items-center bg-green-400 hover:bg-green-300 rounded-full px-8 py-2 w-fit gap-2 border border-green-900" onClick={savePassword}>
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover">
            </lord-icon>
            Save
          </button>
        </div>

        <div className="passwords">
          <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
          {passwordArray.length === 0 && <div>No Passwords to show </div>}
          {passwordArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden">
            <thead className="bg-green-800 text-white">
              <tr>
                <th className="py-2">Site</th>
                <th className="py-2">Username</th>
                <th className="py-2">Password</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-green-100">
              {passwordArray.map((item, index) => {
                return <tr key={index}>
                  <td className="py-2 border border-white text-center w-32">
                    <div className="copybtn flex justify-center items-center gap-2">
                      <a href={item.site} target="_blank">{item.site}</a>
                      <FaCopy className="cursor-pointer" onClick={() => copyText(item.site)} />
                    </div>
                  </td>
                  <td className="py-2 border border-white text-center w-32">
                    <div className="copybtn flex justify-center items-center gap-2">
                      <span>{item.username}</span>
                      <FaCopy className="cursor-pointer" onClick={() => copyText(item.username)} />
                    </div>
                  </td>
                  <td className="py-2 border border-white text-center w-32">
                    <div className="copybtn flex justify-center items-center gap-2">
                      <span>{item.password}</span>
                      <FaCopy className="cursor-pointer" onClick={() => copyText(item.password)} />
                    </div>
                  </td>
                  <td className="py-2 border border-white text-center w-32">
                    <div className="copybtn flex justify-center items-center gap-2">
                    <MdDelete
                    onClick={()=>deletePassword(item.id)}
                    className="cursor-pointer" style={{ fontSize: '1.5em' }}/>
                    <MdModeEdit
                    onClick={()=>editPassword(item.id)}
                    className="cursor-pointer" style={{ fontSize: '1.5em' }}/>
                    </div>
                  </td>
                </tr>
              })}
            </tbody>
          </table>}
        </div>
      </div>
    </>
  )
}

export default Manager
