import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import BottomNavbar from '@/components/layout/BottomNavbar';
import TopNavbar from '@/components/layout/TopNavbar';
import { PlusCircle, Search, ArrowLeft, Users, UserCheck } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock club data with institution information
const clubsData = [
  {
    id: 1,
    name: "Abit rgit",
    institution: "RGIT",
    category: "Technology",
    image: "",
    isJoined: false
  },
  {
    id: 2,
    name: "ACE committee",
    institution: "GPT",
    category: "Management",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    isJoined: false
  },
  {
    id: 3,
    name: "CodeX Club",
    institution: "PDEA",
    category: "Programming",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    isJoined: false
  },
  {
    id: 4,
    name: "CSE (AIML) Department",
    institution: "SIGCE",
    category: "Academic",
    image: "",
    isJoined: true
  },
  {
    id: 5,
    name: "CSI Chapter",
    institution: "LTCE",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    isJoined: true
  },
  {
    id: 6,
    name: "CSI VIT",
    institution: "VIT",
    category: "Technology",
    image: "",
    isJoined: false
  },
  {
    id: 7,
    name: "Eloquence Club",
    institution: "SIGCE",
    category: "Communication",
    image: "",
    isJoined: false
  },
  {
    id: 8,
    name: "EN. IC. Centre",
    institution: "SIGCE",
    category: "Innovation",
    image: "",
    isJoined: false
  },
  {
    id: 9,
    name: "FOSS SIGCE",
    institution: "SIGCE",
    category: "Open Source",
    image: "",
    isJoined: false
  },
  {
    id: 10,
    name: "GDG on Campus",
    institution: "LTCE",
    category: "Technology",
    image: "",
    isJoined: false
  },
  {
    id: 11,
    name: "Google developer groups on",
    institution: "NMIMS",
    category: "Technology",
    image: "",
    isJoined: false
  },
  {
    id: 12,
    name: "Google Developer Groups On Campus",
    institution: "SIES",
    category: "Technology",
    image: "",
    isJoined: false
  }
];

// Mock community data
const communitiesData = [
  {
    id: 1,
    name: "Computer Science Club",
    institution: "RGIT",
    members: 245,
    description: "For CS enthusiasts to collaborate and learn together.",
    isJoined: false
  },
  {
    id: 2,
    name: "Engineering Society",
    institution: "GPT",
    members: 187,
    description: "Connect with fellow engineering students and professionals.",
    isJoined: true
  },
  {
    id: 3,
    name: "Arts & Culture",
    institution: "PDEA",
    members: 156,
    description: "Discuss art, literature and cultural events around campus.",
    isJoined: false
  },
  {
    id: 4,
    name: "Sports Club",
    institution: "SIGCE",
    members: 320,
    description: "Join teams, find workout partners, and discuss sports.",
    isJoined: false
  },
];

// Club card component
const ClubCard = ({ club }: { club: typeof clubsData[0] }) => {
  const [isJoined, setIsJoined] = useState(club.isJoined);
  const logoPlaceholder = club.name.charAt(0);

  return (
    <motion.div 
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="p-4 flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-3">
          {club.image ? (
            <img src={club.image} alt={club.name} className="w-full h-full object-cover rounded-full" />
          ) : (
            <span className="text-xl font-semibold text-gray-500">{logoPlaceholder}</span>
          )}
        </div>
        <h3 className="font-medium text-base mb-1">{club.name}</h3>
        <p className="text-sm text-muted-foreground mb-3">{club.institution}</p>
        <Button 
          variant={isJoined ? "secondary" : "default"} 
          size="sm"
          className="w-full"
          onClick={() => setIsJoined(!isJoined)}
        >
          {isJoined ? 'Joined' : 'Join'}
        </Button>
      </div>
    </motion.div>
  );
};

// Community card component
const CommunityCard = ({ community }: { community: typeof communitiesData[0] }) => {
  const [isJoined, setIsJoined] = useState(community.isJoined);
  const logoPlaceholder = community.name.charAt(0);

  return (
    <motion.div 
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="p-4 flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-3">
          <span className="text-xl font-semibold text-gray-500">{logoPlaceholder}</span>
        </div>
        <h3 className="font-medium text-base mb-1">{community.name}</h3>
        <p className="text-sm text-muted-foreground mb-1">{community.institution}</p>
        <p className="text-xs text-muted-foreground mb-3">{community.members} members</p>
        <Button 
          variant={isJoined ? "secondary" : "default"} 
          size="sm"
          className="w-full"
          onClick={() => setIsJoined(!isJoined)}
        >
          {isJoined ? 'Joined' : 'Join'}
        </Button>
      </div>
    </motion.div>
  );
};

const RegisterClubCard = () => (
  <motion.div 
    className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    whileHover={{ y: -5 }}
    whileTap={{ scale: 0.98 }}
  >
    <div className="p-4 flex flex-col items-center text-center">
      <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-3">
        <PlusCircle className="text-primary" size={24} />
      </div>
      <h3 className="font-medium text-base mb-1">Get Your Club Listed</h3>
      <p className="text-sm text-muted-foreground mb-3">Register here</p>
      <Button 
        variant="outline" 
        size="sm"
        className="w-full"
      >
        Register
      </Button>
    </div>
  </motion.div>
);

const Clubs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("clubs");
  
  const filteredClubs = clubsData.filter(club => 
    club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    club.institution.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCommunities = communitiesData.filter(community => 
    community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    community.institution.toLowerCase().includes(searchTerm.toLowerCase()) ||
    community.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <div className="min-h-screen pb-20">
      <TopNavbar />
      
      <div className="container py-4">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" asChild>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">Clubs & Communities</h1>
        </div>
        
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
          <Input
            placeholder="Search clubs and communities..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="clubs" className="flex items-center gap-2">
              <UserCheck size={16} />
              <span>Clubs</span>
            </TabsTrigger>
            <TabsTrigger value="communities" className="flex items-center gap-2">
              <Users size={16} />
              <span>Communities</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="clubs">
            <motion.div 
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants}>
                <RegisterClubCard />
              </motion.div>
              
              {filteredClubs.map((club) => (
                <motion.div key={club.id} variants={itemVariants}>
                  <ClubCard club={club} />
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
          
          <TabsContent value="communities">
            <motion.div 
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredCommunities.map((community) => (
                <motion.div key={community.id} variants={itemVariants}>
                  <CommunityCard community={community} />
                </motion.div>
              ))}

              <motion.div 
                variants={itemVariants}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="p-4 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-3">
                    <PlusCircle className="text-primary" size={24} />
                  </div>
                  <h3 className="font-medium text-base mb-1">Create New Community</h3>
                  <p className="text-sm text-muted-foreground mb-3">Connect with peers</p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="w-full"
                  >
                    Create
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>

      <BottomNavbar />
    </div>
  );
};

export default Clubs;
