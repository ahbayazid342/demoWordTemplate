
// import React, { useState } from 'react';

// const FormList = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     address: '',
//     phone: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleSave = () => {
//     fetch('https://localhost:7138/api/Form', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(formData)
//     })
//     .then(response => {
//       if (response.ok) {
//         console.log('Form data saved successfully');
//         // Optionally, reset the form fields after successful save
//         setFormData({
//           fileName: 'Sample File',
//           field1: '',
//           field2: '',
//           field3: ''
//         });
//       } else {
//         console.error('Failed to save form data');
//       }
//     })
//     .catch(error => {
//       console.error('Error:', error);
//     });
//   };

//   const handleExport = () => {
//     const doc = `
//       Name: ${formData.name}
//       Address: ${formData.address}
//       Phone: ${formData.phone}
//     `;

//     const element = document.createElement('a');
//     const file = new Blob([doc], {type: 'text/plain'});
//     element.href = URL.createObjectURL(file);
//     element.download = 'formData.doc';
//     document.body.appendChild(element);
//     element.click();
//   };

//   return (
//     <div>
//       <h1>Edit Form</h1>
//       <div>
//         <label>File Name: demo</label>
//       </div>
//       <div>
//         <label>Name : </label>
//         <input type="text" name="name" value={formData.name} onChange={handleChange} />
//       </div>
//       <div>
//         <label>Address : </label>
//         <input type="text" name="address" value={formData.address} onChange={handleChange} />
//       </div>
//       <div>
//         <label>Phone : </label>
//         <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
//       </div>
//       <button onClick={handleSave}>Save</button>
//       <button onClick={handleExport}>Export</button>
//     </div>
//   );
// };

// export default FormList;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 

const FormList = () => {
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    fetchFormData();
  }, []);

  const fetchFormData = async () => {
    try {
      const response = await axios.get('https://localhost:7138/api/Form');
      setFormData(response.data);
    } catch (error) {
      console.error('Failed to fetch form data:', error);
    }
  };

  return (
    <div className="form-list-container">
      <h1>Form Data</h1>
      <ul className="form-list">
        {formData.map(item => (
          <li key={item.id} className="form-list-item">
            <Link to={`/form/${item.id}`} className="form-link">{item.fileName}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FormList;
