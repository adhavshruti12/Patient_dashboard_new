import { useState } from 'react'
import { FaPills, FaFilePrescription, FaDownload, FaEye, FaHistory, FaCalendarAlt } from 'react-icons/fa'

const Prescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([
    {
      id: 1,
      date: '2025-04-10',
      doctor: 'Dr. Sarah Johnson',
      facility: 'Heart Care Center',
      status: 'active',
      medications: [
        {
          name: 'Lisinopril',
          dosage: '10mg',
          frequency: 'Once daily',
          duration: '6 months',
          instructions: 'Take in the morning with food',
          refills: 5
        },
        {
          name: 'Atorvastatin',
          dosage: '20mg',
          frequency: 'Once daily',
          duration: '6 months',
          instructions: 'Take in the evening',
          refills: 5
        }
      ]
    },
    {
      id: 2,
      date: '2025-03-15',
      doctor: 'Dr. Michael Chen',
      facility: 'Skin Health Clinic',
      status: 'active',
      medications: [
        {
          name: 'Hydrocortisone Cream',
          dosage: '1%',
          frequency: 'Twice daily',
          duration: '2 weeks',
          instructions: 'Apply to affected areas',
          refills: 0
        }
      ]
    },
    {
      id: 3,
      date: '2025-01-20',
      doctor: 'Dr. Emily Rodriguez',
      facility: 'Community Health Center',
      status: 'expired',
      medications: [
        {
          name: 'Amoxicillin',
          dosage: '500mg',
          frequency: 'Three times daily',
          duration: '10 days',
          instructions: 'Take with food',
          refills: 0
        }
      ]
    }
  ])

  const [selectedPrescription, setSelectedPrescription] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [activeTab, setActiveTab] = useState('active')

  const filteredPrescriptions = prescriptions.filter(
    prescription => prescription.status === activeTab
  )

  const handleViewDetails = (prescription) => {
    setSelectedPrescription(prescription)
    setShowModal(true)
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-dark-dark dark:text-white">Prescriptions</h1>
          <p className="text-neutral-darkest dark:text-neutral-light">Manage your medication prescriptions</p>
        </div>
        <div className="mt-4 md:mt-0">
          <button className="btn btn-primary">Request New Prescription</button>
        </div>
      </div>

      <div className="card">
        <div className="flex border-b border-neutral dark:border-dark-light mb-4">
          <button 
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'active' 
                ? 'text-primary border-b-2 border-primary' 
                : 'text-neutral-darkest dark:text-neutral-light'
            }`}
            onClick={() => setActiveTab('active')}
          >
            Active
          </button>
          <button 
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'expired' 
                ? 'text-primary border-b-2 border-primary' 
                : 'text-neutral-darkest dark:text-neutral-light'
            }`}
            onClick={() => setActiveTab('expired')}
          >
            Expired
          </button>
        </div>

        {filteredPrescriptions.length > 0 ? (
          <div className="space-y-4">
            {filteredPrescriptions.map(prescription => (
              <div key={prescription.id} className="border border-neutral dark:border-dark-light rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between">
                  <div className="flex items-start">
                    <div className="p-2 mr-3 rounded-full bg-primary-light bg-opacity-20">
                      <FaFilePrescription className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-dark-dark dark:text-white">Prescription from {prescription.doctor}</h3>
                      <p className="text-sm text-neutral-darkest dark:text-neutral-light">{prescription.facility}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      prescription.status === 'active' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
                        : 'bg-neutral-light text-neutral-darkest dark:bg-dark dark:text-neutral-light'
                    }`}>
                      {prescription.status === 'active' ? 'Active' : 'Expired'}
                    </span>
                  </div>
                </div>
                
                <div className="mt-3 flex items-center text-sm">
                  <FaCalendarAlt className="mr-2 text-primary" />
                  <span className="text-dark-light dark:text-neutral-light">
                    Prescribed on {new Date(prescription.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </span>
                </div>
                
                <div className="mt-3">
                  <p className="text-sm font-medium text-dark-dark dark:text-white mb-2">Medications ({prescription.medications.length})</p>
                  <div className="space-y-2">
                    {prescription.medications.slice(0, 2).map((medication, index) => (
                      <div key={index} className="flex items-center text-sm">
                        <FaPills className="mr-2 text-primary" />
                        <span className="text-dark-light dark:text-neutral-light">
                          {medication.name} {medication.dosage} - {medication.frequency}
                        </span>
                      </div>
                    ))}
                    {prescription.medications.length > 2 && (
                      <div className="text-sm text-primary cursor-pointer hover:text-primary-dark" onClick={() => handleViewDetails(prescription)}>
                        + {prescription.medications.length - 2} more medications
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mt-4 flex justify-between items-center">
                  <button 
                    onClick={() => handleViewDetails(prescription)}
                    className="btn btn-primary text-xs"
                  >
                    View Details
                  </button>
                  <button className="btn btn-outline text-xs">Download PDF</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-neutral-darkest dark:text-neutral-light">No {activeTab} prescriptions found.</p>
            {activeTab === 'active' && (
              <button className="mt-2 btn btn-primary text-sm">Request New Prescription</button>
            )}
          </div>
        )}
      </div>

      {/* Prescription Details Modal */}
      {showModal && selectedPrescription && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-dark-light rounded-lg shadow-xl max-w-2xl w-full mx-4">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    selectedPrescription.status === 'active' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
                      : 'bg-neutral-light text-neutral-darkest dark:bg-dark dark:text-neutral-light'
                  }`}>
                    {selectedPrescription.status === 'active' ? 'Active' : 'Expired'}
                  </span>
                  <h3 className="text-lg font-semibold text-dark-dark dark:text-white mt-1">Prescription Details</h3>
                </div>
                <button 
                  onClick={() => setShowModal(false)}
                  className="text-neutral-darkest dark:text-neutral-light hover:text-dark-dark dark:hover:text-white"
                >
                  &times;
                </button>
              </div>
              
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-neutral-darkest dark:text-neutral-light">Prescribed On</p>
                  <p className="text-md text-dark-dark dark:text-white">
                    {new Date(selectedPrescription.date).toLocaleDateString('en-US', { 
                      month: 'long', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-neutral-darkest dark:text-neutral-light">Doctor</p>
                  <p className="text-md text-dark-dark dark:text-white">{selectedPrescription.doctor}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-neutral-darkest dark:text-neutral-light">Facility</p>
                  <p className="text-md text-dark-dark dark:text-white">{selectedPrescription.facility}</p>
                </div>
              </div>
              
              <div className="mt-6">
                <p className="text-sm font-medium text-dark-dark dark:text-white mb-2">Medications</p>
                <div className="space-y-4">
                  {selectedPrescription.medications.map((medication, index) => (
                    <div key={index} className="p-4 bg-neutral-lightest dark:bg-dark rounded-md">
                      <div className="flex items-center mb-2">
                        <FaPills className="text-primary mr-2" />
                        <h4 className="font-medium text-dark-dark dark:text-white">{medication.name} {medication.dosage}</h4>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-neutral-darkest dark:text-neutral-light">Frequency</p>
                          <p className="text-dark-dark dark:text-white">{medication.frequency}</p>
                        </div>
                        <div>
                          <p className="text-neutral-darkest dark:text-neutral-light">Duration</p>
                          <p className="text-dark-dark dark:text-white">{medication.duration}</p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-neutral-darkest dark:text-neutral-light">Instructions</p>
                          <p className="text-dark-dark dark:text-white">{medication.instructions}</p>
                        </div>
                        <div>
                          <p className="text-neutral-darkest dark:text-neutral-light">Refills</p>
                          <p className="text-dark-dark dark:text-white">{medication.refills} remaining</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button className="btn btn-outline">Download PDF</button>
                {selectedPrescription.status === 'active' && (
                  <button className="btn btn-primary">Request Refill</button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Prescriptions