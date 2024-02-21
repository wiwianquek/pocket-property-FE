import React, { useState, useEffect } from 'react';
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

const Notes = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState({ id: null, title: '', content: '' });
  const [isEditing, setIsEditing] = useState(false);

  // Simulate fetching notes from a database
  useEffect(() => {
    const fetchNotes = async () => {
      // Replace this with your actual API call
      const fetchedNotes = [
        { id: 1, title: 'First Note', content: 'This is the first note' },
        { id: 2, title: 'Second Note', content: 'This is the second note' },
        // ...more notes
      ];
      setNotes(fetchedNotes);
    };

    fetchNotes();
  }, []);

  const openModalForNewNote = () => {
    setCurrentNote({ id: null, title: '', content: '' });
    setIsEditing(false);
    onOpen();
  };

  const openModalToEditNote = (note) => {
    setCurrentNote(note);
    setIsEditing(true);
    onOpen();
  };

  const handleNoteChange = (e) => {
    const { name, value } = e.target;
    setCurrentNote({ ...currentNote, [name]: value });
  };

  const handleSaveNote = () => {
    if (isEditing) {
      setNotes(notes.map((note) => (note.id === currentNote.id ? currentNote : note)));
    } else {
      setNotes([...notes, { ...currentNote, id: Date.now() }]); // Assign a unique id for new note
    }
    onClose();
  };

  const handleDeleteNote = () => {
    setNotes(notes.filter((note) => note.id !== currentNote.id));
    onClose();
  };

  return (
    <>
      <Button leftIcon={<AddIcon />} colorScheme="teal" onClick={openModalForNewNote}>
        Add Note
      </Button>
      <SimpleGrid columns={{ sm: 2, md: 3 }} spacing={4} mt={4}>
        {notes.map((note) => (
          <Box
          mt={4}
          maxH="300px" // Maximum height of the container
          overflowY="auto" // Only show the scrollbar when content overflows
          key={note.id}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          p={4}
          transition="background 0.3s, box-shadow 0.3s" // Smooth transition for background color and shadow
          _hover={{ bg: 'gray.100', boxShadow: 'md' }} // Hover styles
        >
            <Heading size="md" mb={2}>{note.title}</Heading>
            <Text mb={2}>{note.content}</Text>
            <IconButton
              aria-label="Edit note"
              icon={<EditIcon />}
              onClick={() => openModalToEditNote(note)}
            />
          </Box>
        ))}
      </SimpleGrid>

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
            {isEditing && (
              <Button colorScheme="red" onClick={handleDeleteNote} mr={3}>
                <DeleteIcon mr={2} />
              </Button>
            )}
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



