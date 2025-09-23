import { useEffect, useState } from "react";
import { ChatSidebar } from "@/components/ChatSidebar";
import { ChatWindow } from "@/components/ChatWindow";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut } from "lucide-react";
import { Link } from "react-router";
import { api } from "@/utils/api";

export interface Contact {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  isOnline: boolean;
  unreadCount?: number;
}

export interface Message {
  id: string;
  text: string;
  timestamp: string;
  isSent: boolean;
  status?: "sent" | "delivered" | "read";
}

const mockContacts: Contact[] = [
  {
    id: "1",
    name: "Ana Silva",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    lastMessage: "Oi! Como você está?",
    timestamp: "14:32",
    isOnline: true,
    unreadCount: 2
  },
  {
    id: "2",
    name: "Carlos Santos",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    lastMessage: "Perfeito! Vamos conversar amanhã",
    timestamp: "13:15",
    isOnline: false
  },
  {
    id: "3",
    name: "Maria Costa",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    lastMessage: "Você viu as notícias de hoje?",
    timestamp: "12:45",
    isOnline: true,
    unreadCount: 1
  },
  {
    id: "4",
    name: "João Oliveira",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    lastMessage: "Até mais tarde!",
    timestamp: "11:20",
    isOnline: false
  },
  {
    id: "5",
    name: "Fernanda Lima",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
    lastMessage: "Adorei a ideia! 😍",
    timestamp: "Ontem",
    isOnline: true
  }
];

const mockMessages: Record<string, Message[]> = {
  "1": [
    {
      id: "1",
      text: "Oi! Como você está?",
      timestamp: "14:30",
      isSent: false
    },
    {
      id: "2",
      text: "Oi Ana! Estou bem, obrigado. E você?",
      timestamp: "14:31",
      isSent: true,
      status: "read"
    },
    {
      id: "3",
      text: "Tudo ótimo por aqui! Que bom saber que você está bem 😊",
      timestamp: "14:32",
      isSent: false
    }
  ],
  "2": [
    {
      id: "1",
      text: "Oi Carlos! Tudo bem?",
      timestamp: "13:10",
      isSent: true,
      status: "read"
    },
    {
      id: "2",
      text: "Oi! Tudo sim, obrigado. Você conseguiu revisar o documento?",
      timestamp: "13:12",
      isSent: false
    },
    {
      id: "3",
      text: "Sim! Ficou excelente. Parabéns pelo trabalho!",
      timestamp: "13:14",
      isSent: true,
      status: "delivered"
    },
    {
      id: "4",
      text: "Perfeito! Vamos conversar amanhã",
      timestamp: "13:15",
      isSent: false
    }
  ]
};

export default function Index() {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredContacts = mockContacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentMessages = selectedContact ? mockMessages[selectedContact.id] || [] : [];

  const logout = async () => {
    const response = await api.post('/logout');
    console.log(response);
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="flex justify-between items-center p-4 border-b bg-card">
        <h1 className="text-xl font-semibold">ChatApp</h1>
        <Link to="/login">
          <Button variant="outline" size="sm" className="gap-2">
            <LogIn className="w-4 h-4" />
            Entrar
          </Button>
        </Link>
        <Button onClick={logout} variant="outline" size="sm" className="gap-2">
            <LogOut className="w-4 h-4" />
            Sair
        </Button>
      </header>
      
      <div className="flex flex-1">
        <ChatSidebar
          contacts={filteredContacts}
          selectedContact={selectedContact}
          onSelectContact={setSelectedContact}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        
        <ChatWindow
          contact={selectedContact}
          messages={currentMessages}
        />
      </div>
    </div>
  );
};
