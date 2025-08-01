import { PenSquareIcon, Trash2 } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'
import { formatDate } from '../lib/utils.js'
import api from '../lib/axios.js'
import toast from 'react-hot-toast'

const NoteCard = ({note,setNotes}) => {
  const handleDelete=async (e,id)=>{
    e.preventDefault();
    if(!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev)=>prev.filter(note=>note._id!==id))
      toast.success("Note deleted successfully🎉")
    } catch (error) {
      
    }
  }
  return (
    <Link to={`note/${note._id}`} className='card bg-base-200 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-primary/70'>
      <div className='card-body'>
        <h3 className='card-title text-base-content'>{note.title}</h3>
        <p className='text-base-content/80 line-clamp-3'>{note.content}</p>
        <div className='card-actions justify-between items-center mt-4'>
          <span className="text-sm text-base-content/70">{formatDate(new Date(note.createdAt))}</span>
          <div className='flex items-center gap-1'>
            <button className='btn btn-ghost btn-sm  btn-circle'>
            <PenSquareIcon className='size-4'/>
            </button>
            <button className='btn btn-ghost btn-sm text-error btn-circle' onClick={(e)=>handleDelete(e,note._id)}>
              <Trash2 className='size-4'/> 
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}


export default NoteCard