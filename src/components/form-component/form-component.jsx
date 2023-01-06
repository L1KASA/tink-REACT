import React, {useState, useCallback} from 'react';
import './form-component.css';
import {Button, Form, Input} from 'antd';
const FormComponent = ({setForm, setFormData}) => {
    const [form] = Form.useForm();
    const [isError, setIsError] = useState(false);
    const [formData, setThisFormData] = useState({});
    const [isSubmit, setIsSubmit] = useState(true);
    const onFinish = useCallback(() => {
        if (Object.keys(formData).length < 4) {
            setIsError(true);
            return;
        }
        setIsError(false);
        const actors = formData.actors.split('; ').join(', ');
        setThisFormData((formData.actors = actors));
        setFormData(formData);
        setForm(!isSubmit);
        setIsError(false);
        const genres = formData.genres.split('; ').join(', ');
        setThisFormData((formData.genres = genres));
        setFormData(formData);
        setForm(!isSubmit);

    }, [formData, isSubmit, setForm, setFormData]);
    const onChange = e => {
        const value = e.target.value;
        const key = e.target.id;
        const updatedValue = {};
        updatedValue[key] = value;
        setThisFormData(formData => ({...formData, ...updatedValue}));
    };
    return (
        <div className="form-wrapper">
            <h1>Редактирование / Создание</h1>
            <Form form={form} layout="vertical" onFinish={onFinish}>
                <Form.Item
                    label={<h2>Название фильма</h2>}
                    required
                    tooltip="Это поле обязательное."
                    style={{fontSize: '20px'}}
                >
                    <Input
                        id="title"
                        placeholder="Введите название фильма"
                        style={{width: '300px', backgroundColor: '#ecf1f7'}}
                        onChange={onChange}
                    />
                </Form.Item>
                <Form.Item label={<h2>Год выпуска</h2>} required tooltip="Это поле обязательное." style={{fontSize: '20px'}}>
                    <Input
                        id="year"
                        placeholder="Введите год выпуска"
                        style={{width: '300px', backgroundColor: '#ecf1f7'}}
                        onChange={onChange}
                    />
                </Form.Item>
                <Form.Item label={<h2>Укажите URL на обложку</h2>} style={{fontSize: '20px'}}>
                    <Input
                        id="posterUrl"
                        placeholder="Введите ..."
                        style={{width: '300px', backgroundColor: '#ecf1f7'}}
                        onChange={onChange}
                    />
                </Form.Item>
                <Form.Item label={<h2>Укажите список актеров</h2>} required tooltip="Это поле обязательное." style={{fontSize: '20px'}}>
                    <Input
                        id="actors"
                        placeholder="Перечислите актеров (через ;) "
                        style={{width: '300px', backgroundColor: '#ecf1f7'}}
                        onChange={onChange}
                    />
                </Form.Item>
                <Form.Item
                    label={<h2>Описание</h2>}
                    //required
                    style={{fontSize: '20px'}}
                    onChange={onChange}
                >
                    <Input
                        id="plot"
                        placeholder="Введите ... "
                        style={{width: '300px', backgroundColor: '#ecf1f7'}} />
                </Form.Item>
                <Form.Item
                    label={<h2>Укажите жанры</h2>}
                    //required
                    style={{fontSize: '20px'}}
                    onChange={onChange}
                >
                    <Input
                        id="genres"
                        placeholder="Перечислите жанры "
                        style={{width: '300px', backgroundColor: '#ecf1f7'}} />
                </Form.Item>
                <Form.Item
                    label={<h2>Укажите рейтинг</h2>}
                    //required
                    style={{fontSize: '20px'}}
                    onChange={onChange}
                >
                    <Input
                        id="rating"
                        placeholder="Введите оценку "
                        style={{width: '300px', backgroundColor: '#ecf1f7'}} />
                </Form.Item>

                <Form.Item
                    label={<h2>Режиссер</h2>}
                    required
                    tooltip="Это поле обязательное."
                    style={{fontSize: '20px'}}
                    onChange={onChange}
                >
                    <Input
                    id="director"
                    placeholder="Введите ..."
                    style={{width: '300px', backgroundColor: '#ecf1f7'}} />
                </Form.Item>
                <Button type="primary" htmlType="sumbit">
                    Сохранить
                </Button>
            </Form>
            {isError ? <h2>Заполните обязательные поля.</h2> : null}
        </div>
    );
};

export default FormComponent;
