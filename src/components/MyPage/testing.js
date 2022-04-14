import { Api } from '@mui/icons-material';
import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';

const Edit = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const onEditSubmit = async () => {
        setLoading(true);
        try{
            await Api.UpdatePost({
                title, description
            })
            history.push('/');
        } catch {
            alert('failed')
        } finally {
            setLoading(false)
        }
    }

}