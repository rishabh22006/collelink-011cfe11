
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { Bell, CalendarIcon, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Event, EventWithAttendance } from '@/types/events';
import { getCategoryColor } from '@/utils/calendarUtils';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface EventDetailsModalProps {
  selectedEvent?: EventWithAttendance;
  setSelectedEvent?: (event: EventWithAttendance | null) => void;
  eventId?: string;
  isOpen: boolean;
  onClose: () => void;
  reminders?: Record<string, boolean>;
  toggleReminder?: (eventId: string) => void;
}

const EventDetailsModal: React.FC<EventDetailsModalProps> = ({
  selectedEvent: propSelectedEvent,
  setSelectedEvent,
  eventId,
  isOpen,
  onClose,
  reminders = {},
  toggleReminder = () => {}
}) => {
  const [localSelectedEvent, setLocalSelectedEvent] = useState<EventWithAttendance | null>(
    propSelectedEvent || null
  );

  // If an eventId is provided, fetch the event details
  const { data: fetchedEvent } = useQuery({
    queryKey: ['event', eventId],
    queryFn: async () => {
      if (!eventId) return null;
      
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', eventId)
        .single();
        
      if (error) {
        console.error('Error fetching event details:', error);
        return null;
      }
      
      return data as EventWithAttendance;
    },
    enabled: !!eventId && !propSelectedEvent,
  });

  // Use the fetched event if it's available
  useEffect(() => {
    if (fetchedEvent && !propSelectedEvent) {
      setLocalSelectedEvent(fetchedEvent);
    } else if (propSelectedEvent) {
      setLocalSelectedEvent(propSelectedEvent);
    }
  }, [fetchedEvent, propSelectedEvent]);

  if (!isOpen || !localSelectedEvent) return null;

  // Format the event time for display
  const formatEventTime = (dateStr: string) => {
    return format(new Date(dateStr), 'h:mm a');
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card rounded-lg shadow-lg max-w-md w-full max-h-[80vh] overflow-auto"
      >
        <div className="sticky top-0 bg-card border-b p-4 flex justify-between items-center">
          <h2 className="font-semibold">Event Details</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            ✕
          </Button>
        </div>
        
        <div className="p-4">
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <Badge className={`${getCategoryColor(localSelectedEvent.category).bg} ${getCategoryColor(localSelectedEvent.category).text}`}>
                {localSelectedEvent.category}
              </Badge>
              <div className="flex items-center">
                <Bell size={14} className="mr-1 text-muted-foreground" />
                <Switch 
                  checked={!!reminders[localSelectedEvent.id]} 
                  onCheckedChange={() => toggleReminder(localSelectedEvent.id)}
                />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">{localSelectedEvent.title}</h3>
            <p className="text-muted-foreground text-sm mb-4">
              {localSelectedEvent.description || 'No description available'}
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center text-sm">
                <CalendarIcon size={16} className="mr-2 text-primary" />
                <span>{format(new Date(localSelectedEvent.date), 'EEEE, MMMM d, yyyy')}</span>
              </div>
              <div className="flex items-center text-sm">
                <Clock size={16} className="mr-2 text-primary" />
                <span>{formatEventTime(localSelectedEvent.date)}</span>
                {localSelectedEvent.end_date && (
                  <span> - {formatEventTime(localSelectedEvent.end_date)}</span>
                )}
              </div>
              {localSelectedEvent.location && (
                <div className="flex items-center text-sm">
                  <MapPin size={16} className="mr-2 text-primary" />
                  <span>{localSelectedEvent.location}</span>
                </div>
              )}
            </div>
          </div>
          
          {localSelectedEvent.image_url && (
            <div className="mb-6">
              <img 
                src={localSelectedEvent.image_url} 
                alt={localSelectedEvent.title} 
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
          )}
          
          <div className="flex space-x-2 pt-2 border-t">
            <Button 
              className="w-full" 
              variant="outline"
              onClick={() => {
                // Generate calendar file (basic implementation)
                const eventStart = new Date(localSelectedEvent.date);
                const eventEnd = localSelectedEvent.end_date 
                  ? new Date(localSelectedEvent.end_date) 
                  : new Date(eventStart.getTime() + 60*60*1000); // 1 hour default
                  
                const icsContent = [
                  'BEGIN:VCALENDAR',
                  'VERSION:2.0',
                  'BEGIN:VEVENT',
                  `SUMMARY:${localSelectedEvent.title}`,
                  `LOCATION:${localSelectedEvent.location || ''}`,
                  `DESCRIPTION:${localSelectedEvent.description || ''}`,
                  `DTSTART:${format(eventStart, 'yyyyMMdd\'T\'HHmmss')}`,
                  `DTEND:${format(eventEnd, 'yyyyMMdd\'T\'HHmmss')}`,
                  'END:VEVENT',
                  'END:VCALENDAR'
                ].join('\n');
                
                const blob = new Blob([icsContent], {type: 'text/calendar'});
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `${localSelectedEvent.title.replace(/\s+/g, '-')}.ics`;
                link.click();
                
                toast.success('Calendar event downloaded');
              }}
            >
              Add to Calendar
            </Button>
            <Button 
              className="w-full"
              onClick={onClose}
            >
              Close
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EventDetailsModal;
