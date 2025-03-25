import React from 'react'
import { Link } from 'react-router-dom'
import {
  Heart,
  Brain,
  Baby,
  Bone,
  Microscope,
  Pill,
  Stethoscope,
  Eye,
  Activity,
  UserCog,
  RadiationIcon,
  BoxIcon,
} from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import DepartmentCard from '../components/DepartmentCard'
const departments = [
  {
    id: 1,
    name: 'Cardiology',
    icon: Heart,
    description:
      'Comprehensive care for heart conditions and cardiovascular health',
    doctorCount: 12,
    specialties: [
      'Interventional Cardiology',
      'Heart Surgery',
      'Cardiac Rehabilitation',
    ],
  },
  {
    id: 2,
    name: 'Neurology',
    icon: Brain,
    description: 'Expert treatment for disorders of the nervous system',
    doctorCount: 8,
    specialties: ['Neurosurgery', 'Stroke Care', 'Epilepsy Treatment'],
  },
  {
    id: 3,
    name: 'Pediatrics',
    icon: Baby,
    description:
      'Specialized healthcare for infants, children, and adolescents',
    doctorCount: 15,
    specialties: ['Neonatal Care', 'Pediatric Surgery', 'Child Development'],
  },
  {
    id: 4,
    name: 'Orthopedics',
    icon: Bone,
    description: 'Treatment for bones, joints, ligaments, and muscles',
    doctorCount: 10,
    specialties: ['Joint Replacement', 'Sports Medicine', 'Spine Surgery'],
  },
  {
    id: 5,
    name: 'Pathology',
    icon: Microscope,
    description: 'Advanced diagnostic and laboratory services',
    doctorCount: 6,
    specialties: [
      'Clinical Pathology',
      'Histopathology',
      'Molecular Diagnostics',
    ],
  },
  {
    id: 6,
    name: 'Internal Medicine',
    icon: Stethoscope,
    description: 'Comprehensive care for adult diseases and conditions',
    doctorCount: 14,
    specialties: ['General Medicine', 'Diabetes Care', 'Respiratory Medicine'],
  },
  {
    id: 7,
    name: 'Ophthalmology',
    icon: Eye,
    description: 'Complete eye care and vision services',
    doctorCount: 7,
    specialties: ['Cataract Surgery', 'Glaucoma Treatment', 'LASIK'],
  },
  {
    id: 8,
    name: 'Dental Care',
    icon: BoxIcon,
    description: 'Comprehensive dental and oral health services',
    doctorCount: 9,
    specialties: ['Orthodontics', 'Oral Surgery', 'Periodontics'],
  },
  {
    id: 9,
    name: 'Emergency Medicine',
    icon: Activity,
    description: '24/7 emergency care and trauma services',
    doctorCount: 16,
    specialties: ['Trauma Care', 'Critical Care', 'Emergency Surgery'],
  },
  {
    id: 10,
    name: 'Pharmacy',
    icon: Pill,
    description:
      'Professional pharmaceutical services and medication management',
    doctorCount: 5,
    specialties: [
      'Clinical Pharmacy',
      'Medication Therapy',
      'Pharmacy Consulting',
    ],
  },
  {
    id: 11,
    name: 'Radiology',
    icon: RadiationIcon,
    description: 'Advanced imaging and diagnostic services',
    doctorCount: 8,
    specialties: ['X-ray', 'MRI', 'CT Scan'],
  },
  {
    id: 12,
    name: 'Surgery',
    icon: UserCog,
    description: 'Comprehensive surgical services and procedures',
    doctorCount: 13,
    specialties: [
      'General Surgery',
      'Minimally Invasive Surgery',
      'Robotic Surgery',
    ],
  },
]
export function Departments() {
  return (
    <div className="w-full min-h-screen bg-gray-50">
      <Header />
      <div className="bg-blue-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">
            Our Departments
          </h1>
          <p className="text-blue-100 max-w-3xl mx-auto">
            Explore our specialized medical departments staffed with experienced
            healthcare professionals dedicated to providing exceptional patient
            care.
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((department) => (
            <DepartmentCard key={department.id} department={department} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6">
            Need help finding the right department?
          </p>
          <Link
            to="/find-doctors"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            Find a Doctor
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}
export default Departments
