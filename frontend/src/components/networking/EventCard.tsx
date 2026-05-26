import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import Card, { CardBody, CardFooter } from '../ui/Card';
import Button from '../ui/Button';

export interface Event {
  id: number;
  title: string;
  description: string;
  type: 'webinar' | 'workshop' | 'conference' | 'networking';
  date: Date;
  time: string;
  location: string;
  isVirtual: boolean;
  imageSrc: string;
}

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const formattedDate = format(event.date, "d 'de' MMMM, yyyy", { locale: es });
  
  const eventTypeColors = {
    webinar: 'bg-blue-100 text-blue-800',
    workshop: 'bg-green-100 text-green-800',
    conference: 'bg-purple-100 text-purple-800',
    networking: 'bg-secondary-light/20 text-secondary-dark',
  };

  const eventTypeLabels = {
    webinar: 'Webinar',
    workshop: 'Taller',
    conference: 'Conferencia',
    networking: 'Networking',
  };

  return (
    <Card hover className="h-full">
      <div className="h-48 overflow-hidden">
        <img 
          src={event.imageSrc} 
          alt={event.title} 
          className="w-full h-full object-cover transition-transform duration-300"
        />
      </div>
      <CardBody>
        <div className="mb-3">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${eventTypeColors[event.type]}`}>
            {eventTypeLabels[event.type]}
          </span>
        </div>
        <h3 className="text-xl font-semibold text-primary mb-2">{event.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{event.description}</p>
        
        <div className="space-y-2 text-sm text-gray-500">
          <div className="flex items-center">
            <Calendar size={16} className="mr-2 text-secondary" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center">
            <Clock size={16} className="mr-2 text-secondary" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center">
            <MapPin size={16} className="mr-2 text-secondary" />
            <span>{event.isVirtual ? 'Evento virtual' : event.location}</span>
          </div>
        </div>
      </CardBody>
      <CardFooter>
        <Button variant="primary" fullWidth>
          Inscribirme
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
