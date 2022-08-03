import { AiFillHome, AiOutlineHeart } from 'react-icons/ai';
import { BiMessageSquareAdd } from 'react-icons/bi';
import { FiSend } from 'react-icons/fi';
import { RiAccountCircleFill } from 'react-icons/ri';

export const navRoutes = [
  { id: 1, path: '/', icon: <AiFillHome /> },
  { id: 2, path: '/message', icon: <FiSend /> },
  { id: 3, icon: <BiMessageSquareAdd /> },
  { id: 4, icon: <AiOutlineHeart /> },
];
