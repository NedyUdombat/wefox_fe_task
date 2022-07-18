import React, { useEffect, useState } from 'react';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Payload, ResponseData, useData } from '../../../context/auth';
import { cloudinaryClient } from '../../../api/client';
import config from '../../../config';

const initialValues: Payload = {
  title: '',
  content: '',
  lat: '',
  long: '',
  image_url: '',
};

interface AddCityProps {
  handleClose?: () => void;
  item?: ResponseData;
}

const AddCity = (props: AddCityProps) => {
  const { handleClose, item } = props;
  const {
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    defaultValues: item ? item : initialValues,
  });

  const { addData, updateData } = useData();
  const [imageUrl, setImageUrl] = useState<string>();

  const image = watch('image_url');

  useEffect(() => {
    async function uploadImage(data: FormData) {
      const res = await cloudinaryClient.post('/image/upload', data);
      if (res) {
        setImageUrl(res.data.secure_url);
      }
    }
    if (image) {
      const formData = new FormData();
      formData.append('file', image[0]);
      formData.append('upload_preset', config?.CLOUDINARY_UPLOAD_PRESET);
      if (image?.length > 0 && typeof image !== 'string') {
        uploadImage(formData);
      }
    }
  }, [image]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({});
    }
  }, [isSubmitSuccessful, reset]);

  const handleAddCity: SubmitHandler<FieldValues | Payload> = (data) => {
    if (imageUrl) {
      data.image_url = imageUrl;
    }
    if (item) {
      updateData(data, item.id);
    } else {
      addData(data);
      reset(initialValues);
    }
    if (handleClose) {
      handleClose();
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <div
        style={{
          width: '100%',
        }}
      >
        <Form.Group className="mb-2">
          <Form.Label className="small mb-0">City*</Form.Label>
          <input
            {...register('title', {
              required: 'Title is required',
            })}
            className="form-control"
          />
          {errors.title && (
            <small className="text-danger">{errors.title.message}</small>
          )}
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label className="small mb-0">Content*</Form.Label>
          <input
            {...register('content', {
              required: 'Content is required',
            })}
            className="form-control"
          />
          {errors.content && (
            <small className="text-danger">{errors.content.message}</small>
          )}
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label className="small mb-0">Image</Form.Label>
          <input
            {...register('image_url')}
            className="form-control"
            type="file"
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label className="small mb-0">Latitude</Form.Label>
          <input {...register('lat')} className="form-control" />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label className="small mb-0">Longitude</Form.Label>
          <input {...register('long')} className="form-control" />
        </Form.Group>
        <Button onClick={handleSubmit(handleAddCity)} className="w-100">
          {item ? 'Update' : 'Add'}
        </Button>
      </div>
    </div>
  );
};

export default AddCity;
