import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Home() {

  const [state, setstate] = useState([])
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    subject: ""
  })
  const [editId, setEditId] = useState(null)

  const API = "http://localhost:7010/data"

  const getdata = async () => {
    const res = await axios.get(API)
    setstate(res.data)
  }

  useEffect(() => {
    getdata()
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (editId === null) {
      await axios.post(API, form)
    } else {
      await axios.put(`${API}/${editId}`, form)
      setEditId(null)
    }

    setForm({
      name: "",
      email: "",
      password: "",
      subject: ""
    })

    getdata()
  }

  const handleDelete = async (id) => {
    await axios.delete(`${API}/${id}`)
    getdata()
  }

  const handleEdit = (el) => {
    setForm({
      name: el.name,
      email: el.email,
      password: el.password,
      subject: el.subject
    })
    setEditId(el.id)
  }

  return (
    <div className="container mt-5">

      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg border-0 rounded-3">
            <div className="card-body p-4">
              <h3 className="text-center mb-4 text-primary">Add User</h3>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input type="text" name="name" className="form-control" placeholder="Enter name" value={form.name} onChange={handleChange} />
                </div>

                <div className="mb-3">
                  <input type="email" name="email" className="form-control" placeholder="Enter email" value={form.email} onChange={handleChange} />
                </div>

                <div className="mb-3">
                  <input type="password" name="password" className="form-control" placeholder="Enter password" value={form.password} onChange={handleChange} />
                </div>

                <div className="mb-3">
                  <input type="text" name="subject" className="form-control" placeholder="Enter subject" value={form.subject} onChange={handleChange} />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  add user
                </button>
              </form>

            </div>
          </div>
        </div>
      </div>

      <div className="row mt-5">
        {
          state.map((el) => (
            <div className="col-md-4 mb-4" key={el.id}>
              <div className="card shadow-sm h-100 border-0">
                <div className="card-body">
                  <h5 className="mb-2 ">{el.name}</h5>
                  <p className="mb-1"><strong>Email:</strong> {el.email}</p>
                  <p className="mb-1"><strong>Password:</strong> {el.password}</p>
                  <p className="mb-3"><strong>Subject:</strong> {el.subject}</p>

                  <button className="btn btn-warning btn-sm me-4 px-4" onClick={() => handleEdit(el)}>Edit</button>
                  <button className="btn btn-danger btn-sm px-4" onClick={() => handleDelete(el.id)}>Delete</button>
                </div>
              </div>
            </div>
          ))
        }
      </div>

    </div>
  )
}

export default Home