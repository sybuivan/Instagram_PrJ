import { AiFillHome, AiOutlineHeart } from 'react-icons/ai';
import { BiMessageSquareAdd } from 'react-icons/bi';
import { FiSend } from 'react-icons/fi';
import { RiAccountCircleFill } from 'react-icons/ri';

export const navRoutes = [
  { path: '/', icon: <AiFillHome /> },
  { path: '/message', icon: <FiSend /> },
  { path: '/', icon: <BiMessageSquareAdd /> },
  { path: '/saved', icon: <AiOutlineHeart /> },
];
