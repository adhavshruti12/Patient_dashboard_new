import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";

const MedicalRecords = () => {
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/doctors/prescriptions");
        setRecords(response.data);
      } catch (error) {
        console.error("Error fetching prescription records", error);
      }
    };

    fetchPrescriptions();
  }, []);

  const filteredRecords = records.filter(record =>
    record.patientName.toLowerCase().includes(search.toLowerCase())
  );

  const downloadPDF = (record) => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.text("Medical Prescription", 20, 20);
    
    doc.setFont("helvetica", "normal");
    doc.text(`Patient Name: ${record.patientName}`, 20, 30);
    doc.text(`Prescription Date: ${record.date}`, 20, 40);
    doc.text(`Age: ${record.age}`, 20, 50);
    doc.text(`Diagnosis: ${record.diagnosis}`, 20, 60);
    doc.text(`Surgeries: ${record.surgeries}`, 20, 70);
    doc.text(`Follow-Up Date: ${record.nextDate}`, 20, 80);
    
    doc.text("Medications:", 20, 90);
    record.medicines.forEach((med, i) => {
      doc.text(`${i + 1}. ${med.name} (${med.dosage}, ${med.frequency}, ${med.duration})`, 25, 100 + i * 10);
    });

    doc.save(`Prescription_${record.patientName}.pdf`);
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      minHeight: "100vh",
      background: "#f8f9fa",
      padding: "20px",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      maxWidth: "900px",
      marginBottom: "20px",
    },
    title: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "black",
      textAlign: "center",
      marginBottom: "20px",
    },
    searchBar: {
      width: "40%",
      padding: "10px",
      border: "1px solid #ddd",
      borderRadius: "5px",
      outline: "none",
    },
    card: {
      width: "100%",
      maxWidth: "900px",
      background: "#fff",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      borderRadius: "10px",
      padding: "20px",
      marginTop: "20px",
      color: "black",
    },
    recordItem: {
      background: "#fff",
      padding: "15px",
      borderRadius: "8px",
      boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
      marginBottom: "15px",
      color: "black",
    },
    recordHeader: {
      fontSize: "18px",
      fontWeight: "bold",
      color: "black",
      marginBottom: "5px",
    },
    sectionTitle: {
      fontSize: "16px",
      fontWeight: "bold",
      marginTop: "10px",
      color: "black",
    },
    actionButtons: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "10px",
      marginTop: "15px",
    },
    button: {
      padding: "8px 15px",
      border: "none",
      borderRadius: "5px",
      fontWeight: "bold",
      cursor: "pointer",
    },
    downloadBtn: {
      background: "#48f0dc",
      color: "#fff",
    },
    addBtn: {
      background: "#007bff",
      color: "#fff",
    },
  };

  return (
    <div style={styles.container}>
      <div style={{ display: "flex", justifyContent: "space-between", width: "900px" }}>
        <h2 style={styles.title}>Medical Records</h2>
        <input
          type="text"
          placeholder="Search by patient name..."
          style={styles.searchBar}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div style={styles.card}>
        {filteredRecords.length > 0 ? (
          filteredRecords.map((record, index) => (
            <div key={index} style={styles.recordItem}>
              <h3 style={styles.recordHeader}>
                Prescription for {record.patientName}
              </h3>
              <p><strong>Prescription Date:</strong> {record.date}</p>
              <p><strong>Age:</strong> {record.age}</p>
              <p><strong>Diagnosis:</strong> {record.diagnosis}</p>
              <p><strong>Surgeries:</strong> {record.surgeries}</p>
              <p><strong>Follow-Up Date:</strong> {record.nextDate}</p>
              <p style={styles.sectionTitle}>Medications</p>
              <ul>
                {record.medicines.map((med, i) => (
                  <li key={i}>
                    {med.name} ({med.dosage}, {med.frequency}, {med.duration})
                  </li>
                ))}
              </ul>
              <div style={styles.actionButtons}>
                <button style={{ ...styles.button, ...styles.downloadBtn }} onClick={() => downloadPDF(record)}>
                  Download PDF
                </button>
                <button onClick={() => navigate('/prescription')} style={{ ...styles.button, ...styles.addBtn }}>
                  Add Prescription
                </button>
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", fontWeight: "bold", color: "black" }}>
            No medical records found.
          </p>
        )}
      </div>
    </div>
  );
};

export default MedicalRecords;
