import React from 'react';
import { MapPin, Building, Gift } from 'lucide-react';
import Card, { CardBody, CardFooter } from '../ui/Card';
import Button from '../ui/Button';

interface Company {
  id: number;
  name: string;
  description: string;
  sector: string;
  location: string;
  benefits: string[];
  logo: string;
}

interface CompanyCardProps {
  company: Company;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company }) => {
  return (
    <Card hover className="h-full">
      <div className="h-40 bg-gray-100 flex items-center justify-center p-6">
        {company.logo ? (
          <img 
            src={company.logo} 
            alt={company.name} 
            className="max-h-full max-w-full object-contain"
          />
        ) : (
          <Building size={48} className="text-gray-400" />
        )}
      </div>
      <CardBody>
        <div className="mb-3">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {company.sector}
          </span>
        </div>
        <h3 className="text-xl font-semibold text-primary mb-2">{company.name}</h3>
        <p className="text-gray-600 mb-4">{company.description}</p>
        
        <div className="mb-4">
          <div className="flex items-center text-gray-500 mb-2">
            <MapPin size={16} className="mr-2 text-secondary" />
            <span>{company.location}</span>
          </div>
          
          <div className="space-y-2">
            <p className="font-medium text-primary flex items-center">
              <Gift size={16} className="mr-2 text-secondary" />
              Beneficios para graduados:
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              {company.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </div>
        </div>
      </CardBody>
      <CardFooter>
        <Button variant="primary" fullWidth>
          Ver Más Información
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CompanyCard;