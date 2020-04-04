import React from 'react';
import { retrieve, update, destroy } from '../../../service/categories';
import { AdminContext } from '../../../context/adminContext';
import TagForm from '../../../components/admin/form/TagForm'
import { ITagData } from '../../../types/tags';
import toast from '../../../components/common/toast';
import { useHistory, useParams } from 'react-router-dom';
import DeleteBtn from '../../../components/admin/DeleteBtn';

const TagEdit: React.FC = () => {
    const { state, dispatch } = React.useContext(AdminContext);
    const [data, setData] = React.useState<ITagData | undefined>();
    const [error, setError] = React.useState({})

    const { id } = useParams();
    const history = useHistory();
    React.useEffect(() => {
        if (state.hasToken) {
            fetchData();
        }
    }, [state.hasToken]);
    const fetchData = async () => {
        dispatch({ type: 'SET_LOADING', payload: { loading: true } });
        const res = await retrieve(id);
        if (res.status === 200) {
            setData(res.data);
        }
        dispatch({ type: 'SET_LOADING', payload: { loading: false } });
    };

    // edit
    const onSubmit = async (values: any) => {
        dispatch({ type: 'SET_LOADING', payload: { loading: true } });
        try {
            const data = {
                name: values.name,
            };
            const res = await update(id, data);
            if (res.status === 200) {
                dispatch({ type: 'SET_LOADING', payload: { loading: false } });
                toast({ type: 'SUCCESS' });
                history.push("/admin/tags");
            }
        } catch (e) {
            if (e.response.data) {
                setError(e.response.data)
            }
            dispatch({ type: 'SET_LOADING', payload: { loading: false } });
            toast({ type: 'ERROR' });
        }
    }
    // delete
    const onDelete = async () => {
        dispatch({ type: 'SET_LOADING', payload: { loading: true } });
        try {
            const res = await destroy(id);
            if (res.status === 204) {
                dispatch({ type: 'SET_LOADING', payload: { loading: false } });
                toast({ type: 'SUCCESS' });
                history.push("/admin/tags");
            }
        } catch {
            dispatch({ type: 'SET_LOADING', payload: { loading: false } });
            toast({ type: 'ERROR' });
        }
    }
    return (
        <>
            <DeleteBtn onDelete={onDelete} />
            <TagForm data={data} onSubmit={onSubmit} error={error} />
        </>
    );
};

export default TagEdit;