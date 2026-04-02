import React, { useState, useEffect } from 'react'

function Localstorage() {
    const [formdata, setFormdata] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        gender: "",
        checkbox: false,
        selection: ""
    });

    const [saveddata, setSaveddata] = useState([]);
    const [editdata, seteditdata] = useState(null)
    const [search,setsearch]=useState("")
    useEffect(() => {
        const olddata = JSON.parse(localStorage.getItem("users")) || [];
        setSaveddata(olddata);
    }, []);

    function handleChange(e) {
        const { name, value, type, checked } = e.target;
        setFormdata({
            ...formdata,
            [name]: type === "checkbox" ? checked : value,
        });
    }

    function handleSubmit(e) {
        e.preventDefault();

        let updateddata = [...saveddata];

        if (editdata !== null) {
            updateddata[editdata] = formdata;
            seteditdata(null);
        } else {
            updateddata.push(formdata);
        }

        setSaveddata(updateddata);
        localStorage.setItem("users", JSON.stringify(updateddata));

        setFormdata({
            name: "",
            email: "",
            password: "",
            phone: "",
            gender: "",
            checkbox: false,
            selection: ""
        });
    }

    function Delete(id) {
        let ans = saveddata.filter((el, i) => i !== id);
        setSaveddata(ans);
        localStorage.setItem("users", JSON.stringify(ans));
    }

    function Edit(id) {
        setFormdata(saveddata[id]);
        seteditdata(id);
    }
     function Search(e){
        setsearch(e.target.value)
     }
const filtereddata = saveddata.filter((item) =>
  item.name.toLowerCase().includes(search.toLowerCase())
);
    return (
 <div className="container py-4">

  <div className="row justify-content-center">
    <div className="col-12 col-md-8 col-lg-5">
      <div className="card p-4 shadow">
        <h2 className="text-center mb-4">Registration Form</h2>

        <form onSubmit={handleSubmit}>
          <input type="text" name="name" className="form-control mb-2"
            value={formdata.name} onChange={handleChange} required placeholder='Enter Name'/>

          <input type="email" name="email" className="form-control mb-2"
            value={formdata.email} onChange={handleChange} required placeholder='Enter email'/>

          <input type="password" name="password" className="form-control mb-2"
            value={formdata.password} onChange={handleChange} required placeholder='Enter password' />

          <input type="tel" name="phone" className="form-control mb-2"
            value={formdata.phone} onChange={handleChange} required placeholder='Enter phone'/>

          <div className="mb-2 d-flex gap-3">
            <label>
              <input type="radio" name="gender" value="Male"
                checked={formdata.gender === "Male"}
                onChange={handleChange}/> Male
            </label>

            <label>
              <input type="radio" name="gender" value="Female"
                checked={formdata.gender === "Female"}
                onChange={handleChange}/> Female
            </label>
          </div>

          <div className="mb-2">
            <input type="checkbox" name="checkbox"
              checked={formdata.checkbox}
              onChange={handleChange}/> Accept Terms
          </div>

          <select name="selection" className="form-select mb-2"
            value={formdata.selection} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="React">React</option>
            <option value="JavaScript">JavaScript</option>
            <option value="Bootstrap">Bootstrap</option>
          </select>

          <button className="btn btn-primary w-100">Save</button>
        </form>
      </div>
    </div>
  </div>

  <div className="mt-5">
    <div className="row align-items-center mb-3">
      <div className="col-12 col-md-6">
        <h3>Saved Data</h3>
      </div>

      <div className="col-12 col-md-6 text-md-end">
        <input
          className='form-control'
          type="search"
          onChange={Search}
          value={search}
          placeholder='Search by name'
        />
      </div>
    </div>

    <div className="table-responsive">
      <table className="table table-bordered text-center">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Gender</th>
            <th>Course</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filtereddata.map((el, i) => (
            <tr key={i}>
              <td>{el.name}</td>
              <td>{el.email}</td>
              <td>{el.phone}</td>
              <td>{el.gender}</td>
              <td>{el.selection}</td>
              <td>
                <div className="d-flex flex-column flex-md-row gap-2 justify-content-center">
                  <button onClick={() => Delete(i)} className="btn btn-danger btn-sm">Delete</button>
                  <button onClick={() => Edit(i)} className="btn btn-warning btn-sm">Edit</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  </div>

</div>
    );
}

export default Localstorage