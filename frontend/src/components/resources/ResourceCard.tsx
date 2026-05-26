import React from 'react';
import { FileText, Download, Eye } from 'lucide-react';
import Card, { CardBody, CardFooter } from '../ui/Card';
import Button from '../ui/Button';

export interface Resource {
  id: number;
  title: string;
  description: string;
  type: 'guide' | 'template' | 'ebook' | 'video' | 'webinar';
  downloadUrl: string;
  previewUrl?: string;
  imageSrc: string;
  downloadCount: number;
}

interface ResourceCardProps {
  resource: Resource;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => {
  const resourceTypeLabels = {
    guide: 'Guía',
    template: 'Plantilla',
    ebook: 'E-Book',
    video: 'Video',
    webinar: 'Webinar',
  };

  const resourceTypeColors = {
    guide: 'bg-blue-100 text-blue-800',
    template: 'bg-green-100 text-green-800',
    ebook: 'bg-purple-100 text-purple-800',
    video: 'bg-red-100 text-red-800',
    webinar: 'bg-secondary-light/20 text-secondary-dark',
  };

  const resourceTypeIcons = {
    guide: <FileText size={40} className="text-blue-500" />,
    template: <FileText size={40} className="text-green-500" />,
    ebook: <FileText size={40} className="text-purple-500" />,
    video: <Eye size={40} className="text-red-500" />,
    webinar: <Eye size={40} className="text-secondary" />,
  };

  return (
    <Card hover className="h-full">
      <div className="h-40 overflow-hidden bg-gray-100 flex items-center justify-center">
        {resource.imageSrc ? (
          <img 
            src={resource.imageSrc} 
            alt={resource.title} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="p-6">
            {resourceTypeIcons[resource.type]}
          </div>
        )}
      </div>
      <CardBody>
        <div className="mb-3">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${resourceTypeColors[resource.type]}`}>
            {resourceTypeLabels[resource.type]}
          </span>
        </div>
        <h3 className="text-xl font-semibold text-primary mb-2">{resource.title}</h3>
        <p className="text-gray-600 mb-3 line-clamp-3">{resource.description}</p>
        <p className="text-sm text-gray-500">
          <Download size={14} className="inline mr-1" /> 
          {resource.downloadCount} descargas
        </p>
      </CardBody>
      <CardFooter className="flex justify-between gap-3">
        {resource.previewUrl && (
          <Button variant="outline\" className="flex-1">
            <Eye size={16} className="mr-1" /> Vista previa
          </Button>
        )}
        <Button variant="primary" className="flex-1">
          <Download size={16} className="mr-1" /> Descargar
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ResourceCard;