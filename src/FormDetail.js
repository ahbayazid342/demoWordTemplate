import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const FormDetail = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState(null); // Set initial state to null

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSave = () => {
    axios.put(`https://localhost:7138/api/Form/${id}`, formData) // Use PUT method to update data
      .then(response => {
        console.log('Form data saved successfully');
      })
      .catch(error => {
        console.error('Failed to save form data:', error);
      });
  };

  const handleExport = () => {
    const doc = `
      Name: ${formData.name}
      Address: ${formData.address}
      Phone: ${formData.phone}
    `;

    const element = document.createElement('a');
    const file = new Blob([doc], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = 'formData.doc';
    document.body.appendChild(element);
    element.click();
  };

  useEffect(() => {
    fetchFormData();
  }, []);

  const fetchFormData = async () => {
    try {
      const response = await axios.get(`https://localhost:7138/api/Form/${id}`);
    //   console.log(response);
      setFormData(response.data);
    } catch (error) {
      console.error('Failed to fetch form data:', error);
    }
  };

  if (!formData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="form-detail-container">
      <h1>Edit Form</h1>
      <div className="form-field">
        <label className="form-label">File Name:</label>
        <span className="form-value">{formData.fileName}</span>
      </div>
      <div className="form-field">
        <label className="form-label">Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-input" />
      </div>
      <div className="form-field">
        <label className="form-label">Address:</label>
        <input type="text" name="address" value={formData.address} onChange={handleChange} className="form-input" />
      </div>
      <div className="form-field">
        <label className="form-label">Phone:</label>
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="form-input" />
      </div>
      <button onClick={handleSave} className="form-button">Save</button>
      <button onClick={handleExport} className="form-button">Export</button>
    </div>
  );
};

export default FormDetail;
