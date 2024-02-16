import React from 'react';

import { Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerOverlay, Flex, IconButton, Image, useDisclosure, Text, useColorModeValue } from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';

import Logo from "../assets/images/fastapi-logo.svg";
import SidebarItems from './SidebarItems';
import { useUserStore } from '../store/user-store';


const Sidebar: React.FC = () => {
    const bgColor = useColorModeValue("white", "#1a202c");
    const textColor = useColorModeValue("gray", "white");
    const secBgColor = useColorModeValue("ui.secondary", "#252d3d");

    const { isOpen, onOpen, onClose } = useDisclosure();
    const { user } = useUserStore();

    return (
        <>
            {/* Mobile */}
            <IconButton onClick={onOpen} display={{ base: 'flex', md: 'none' }} aria-label="Open Menu" position="absolute" fontSize='20px' m={4} icon={<FiMenu />} />
            <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent maxW="250px">
                    <DrawerCloseButton />
                    <DrawerBody py={8}>
                        <Flex flexDir="column" justify="space-between">
                            <Box>
                                <Image src={Logo} alt="Logo" p={6} />
                                <SidebarItems onClose={onClose} />
                            </Box>
                            {
                                user?.email &&
                                <Text color={textColor} noOfLines={2} fontSize="sm" p={2}>Logged in as: {user.email}</Text>
                            }
                        </Flex>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>

            {/* Desktop */}
            <Box bg={bgColor} p={3} h="100vh" position="sticky" top="0" display={{ base: 'none', md: 'flex' }}>
                <Flex flexDir="column" justify="space-between" bg={secBgColor} p={4} borderRadius={12}>
                    <Box>
                        <Image src={Logo} alt="Logo" w="180px" maxW="2xs" p={6} />
                        <SidebarItems />
                    </Box>
                    {
                        user?.email &&
                        <Text color={textColor} noOfLines={2} fontSize="sm" p={2} maxW="180px">Logged in as: {user.email}</Text>
                    }
                </Flex>
            </Box>
        </>
    );
}

export default Sidebar;
