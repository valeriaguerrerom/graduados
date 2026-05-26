import React from 'react';
import { User, Mail, Phone, Linkedin } from 'lucide-react';
import Card, { CardBody, CardFooter } from '../ui/Card';
import Button from '../ui/Button';

interface Graduate {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface GraduateCardProps {
  graduate: Graduate;
}

const GraduateCard: React.FC<GraduateCardProps> = ({ graduate }) => {
  const handleLinkedInClick = () => {
    window.open('https://www.linkedin.com', '_blank');
  };

  return (
    <Card hover className="h-full">
      <CardBody>
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <User size={24} className="text-primary" />
          </div>
          <div className="ml-4">
            <h3 className="font-semibold text-lg text-primary">{graduate.name}</h3>
            <p className="text-sm text-gray-500">ID: {graduate.id}</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center text-gray-600">
            <Mail size={16} className="mr-2 text-secondary" />
            <a href={`mailto:${graduate.email}`} className="hover:text-primary">
              {graduate.email}
            </a>
          </div>
          <div className="flex items-center text-gray-600">
            <Phone size={16} className="mr-2 text-secondary" />
            <a href={`tel:${graduate.phone}`} className="hover:text-primary">
              {graduate.phone}
            </a>
          </div>
        </div>
      </CardBody>
      <CardFooter>
        <Button variant="primary" fullWidth onClick={handleLinkedInClick}>
          <Linkedin size={16} className="mr-2" />
          Ver LinkedIn
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GraduateCard;