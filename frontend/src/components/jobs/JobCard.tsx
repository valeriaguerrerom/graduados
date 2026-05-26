import React from 'react';
import { Briefcase, MapPin, Calendar, Building } from 'lucide-react';
import Card, { CardBody, CardFooter } from '../ui/Card';
import Button from '../ui/Button';

export interface Job {
  id: number;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  type: 'full-time' | 'part-time' | 'remote' | 'internship' | 'contract';
  postedDate: Date;
  salary?: string;
  description: string;
  requirements: string[];
}

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const jobTypeLabels = {
    'full-time': 'Tiempo completo',
    'part-time': 'Medio tiempo',
    'remote': 'Remoto',
    'internship': 'Pasantía',
    'contract': 'Contrato',
  };

  const jobTypeColors = {
    'full-time': 'bg-green-100 text-green-800',
    'part-time': 'bg-blue-100 text-blue-800',
    'remote': 'bg-purple-100 text-purple-800',
    'internship': 'bg-secondary-light/20 text-secondary-dark',
    'contract': 'bg-orange-100 text-orange-800',
  };

  const daysSincePosted = Math.floor(
    (new Date().getTime() - job.postedDate.getTime()) / (1000 * 3600 * 24)
  );
  
  const getPostedTimeText = (days: number) => {
    if (days === 0) return 'Publicado hoy';
    if (days === 1) return 'Publicado ayer';
    return `Publicado hace ${days} días`;
  };

  const handleApply = () => {
    window.open('https://www.computrabajo.com.co', '_blank');
  };

  return (
    <Card hover className="h-full">
      <CardBody>
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded bg-gray-100 flex items-center justify-center mr-3 overflow-hidden">
            {job.companyLogo ? (
              <img src={job.companyLogo} alt={job.company} className="w-full h-full object-contain" />
            ) : (
              <Building size={24} className="text-gray-400" />
            )}
          </div>
          <div>
            <h3 className="font-semibold text-lg text-primary">{job.title}</h3>
            <p className="text-gray-600">{job.company}</p>
          </div>
        </div>
        
        <div className="mb-4 flex flex-wrap gap-2">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${jobTypeColors[job.type]}`}>
            {jobTypeLabels[job.type]}
          </span>
          {job.salary && (
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              {job.salary}
            </span>
          )}
        </div>
        
        <div className="space-y-2 text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <MapPin size={16} className="mr-2 text-secondary" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center">
            <Calendar size={16} className="mr-2 text-secondary" />
            <span>{getPostedTimeText(daysSincePosted)}</span>
          </div>
        </div>
        
        <p className="text-gray-600 mb-3 line-clamp-3">{job.description}</p>
        
        <div className="mb-4">
          <p className="font-medium text-primary mb-2">Requisitos:</p>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            {job.requirements.slice(0, 3).map((req, index) => (
              <li key={index} className="line-clamp-1">{req}</li>
            ))}
            {job.requirements.length > 3 && (
              <li className="text-secondary">Y {job.requirements.length - 3} requisitos más...</li>
            )}
          </ul>
        </div>
      </CardBody>
      <CardFooter className="flex justify-between gap-3">
        <Button variant="outline" className="flex-1">
          Ver Detalles
        </Button>
        <Button variant="primary" className="flex-1" onClick={handleApply}>
          Aplicar
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JobCard;