import React, { useState, useEffect } from 'react';
import { getToken } from '../util/security';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  useDisclosure,
  IconButton,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon, AddIcon } from '@chakra-ui/icons';

// Import API functions
import * as notesAPI from '../api/notes'; 
import * as cardAPI from '../api/card'; // contain functions to interact with card data

const Notes = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState({ _id: null, title: '', content: '', card_id: null });
  const [isEditing, setIsEditing] = useState(false);
  const [currentCardId, setCurrentCardId] = useState(null); // to track the current card ID

  // Notes component
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const fetchedNotes = await notesAPI.getNotesEntryByUserId(); 
        setNotes(fetchedNotes);
      } catch (error) {
        console.error("Failed to fetch notes:", error);
      }
    };
  
    fetchNotes();
  }, []);
  
  // open the modal to add a new note
  const openModalForNewNote = () => {
    setCurrentNote({ _id: null, title: '', content: '', card_id: currentCardId });
    setIsEditing(false);
    onOpen();
  };

  // open the modal to edit an existing note
  const openModalToEditNote = (note) => {
    setCurrentNote({
      _id: note._id,
      title: note.entry_title, // Prefill the title
      content: note.entry_text, // Prefill the content
      card_id: note.card_id,
    });
    setIsEditing(true);
    onOpen();
  };

  // handle input changes in the modal
  const handleNoteChange = (e) => {
    const { name, value } = e.target;
    setCurrentNote({ ...currentNote, [name]: value });
  };

  // handle saving notes
  const handleSaveNote = async () => {
    const token = getToken();
    if (!token) {
      console.error("No token found, user might not be logged in");
      return;
    }
    if (isEditing) {
      try {
        const updatedNote = await notesAPI.updateNotesEntry(currentNote._id, {
          entry_title: currentNote.title,
          entry_text: currentNote.content
        });
        setNotes(notes.map((note) => (note._id === currentNote._id ? updatedNote : note)));
        onClose();
      } catch (error) {
        // if an error occurs, log it and display a message to the user
        console.error("An error occurred while saving the note:", error);
        alert("Failed to save the note. Please try again.");
      }
    } else {
      try {
        const token = getToken(); 
        const newNote = await notesAPI.createNotesEntry({
            entry_title: currentNote.title,
            entry_text: currentNote.content,
            card_id: currentCardId,
        }, token); 
        setNotes([...notes, newNote]);
      } catch (error) {
          console.error("Failed to create note:", error);
      }
    }
    onClose();
  };
  
  // Modify the handleDeleteNote function to call handleDeleteCard if it's the last note
  const handleDeleteNote = async (noteId) => {
    const token = getToken();
    if (!token) {
      // handle error
      return;
    }
    try {
      await notesAPI.deleteNotesEntry(noteId, token); // Pass the token here
      setNotes(notes.filter((note) => note._id !== noteId)); // Update the notes state
  
      // Check if this was the last note in the card and delete the card as well if it was
      if (notes.filter((note) => note.card_id === cardId).length === 1) {
        await cardAPI.deleteCard(cardId);
        // Update any state that is tracking cards here as well
        // For example, if you have a state variable for cards, you would update it like this:
        // setCards(cards.filter((card) => card._id !== cardId));
      }
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  };

  // Add a function to delete the card
  const handleDeleteCard = async (cardId) => {
    try {
      await cardAPI.deleteCard(cardId);
      // Update state to reflect that the card and notes are deleted
      setNotes(notes.filter((note) => note.card_id !== cardId));
      setCurrentCardId(null); // Reset the current card ID
    } catch (error) {
      console.error("Failed to delete card:", error);
    }
  };

  return (
    <>
      <Button leftIcon={<AddIcon />} colorScheme="teal" onClick={openModalForNewNote}>
        Add Note
      </Button>
      <Box
        maxW="840px"
        maxH="430px"
        overflowY="auto"
        pr="16px" // Add right padding to account for scrollbar width
      >
        <SimpleGrid columns={{ sm: 2, md: 3 }} spacing={4} mt={4}>
          {notes.map((note) => (
            <Box
              key={note._id}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              p={6}
              transition="background 0.3s, box-shadow 0.3s"
              _hover={{ bg: 'gray.50', boxShadow: 'md' }}
            >
              <Heading size="md" mb={4}>{note.entry_title}</Heading>
              <Text mb={4}>{note.entry_text}</Text>
              <IconButton
                aria-label="Edit note"
                icon={<EditIcon />}
                onClick={() => openModalToEditNote(note)}
                mr={2}
              />
              <IconButton
                aria-label="Delete note"
                icon={<DeleteIcon />}
                onClick={() => handleDeleteNote(note._id, note.card_id)}
              />
            </Box>
          ))}
        </SimpleGrid>
      </Box>

      {/* Modal for editing or adding notes */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{isEditing ? 'Edit Note' : 'Add Note'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input name="title" value={currentNote.title} onChange={handleNoteChange} placeholder="Note title" />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Your Note</FormLabel>
              <Input name="content" value={currentNote.content} onChange={handleNoteChange} placeholder="Note content" />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSaveNote} mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Notes;




