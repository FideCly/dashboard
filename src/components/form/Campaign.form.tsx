import React, { useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, Label } from 'flowbite-react';
import {
  ICampaignCreatePayload,
  ICampaignUpdatePayload,
} from '@/models/Campaign';

import { IUser } from '@/models/User';
import { IPromotion } from '@/models/Promotions';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { errorCode } from '@/translation';
import { Editor } from '@tinymce/tinymce-react';

export const CampaignCreateForm = ({
  setShown,
  setCampaigns,
  campaigns,
  promotions,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ICampaignCreatePayload>({ mode: 'onChange' });
  const [editorContent, setEditorContent] = useState('');

  const onSubmit: SubmitHandler<ICampaignCreatePayload> = useCallback(
    async (data) => {
      try {
        const toastid = toast.loading('Vérification en cours...');
        const response = await fetch(`/api/campaign`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          // conserve the number type htmlFor the promotionId
          body: JSON.stringify({
            ...data,
            promotionId: +data.promotionId,
          }),
        });
        const body = await response.json();
        if (response.status >= 400) {
          toast.update(toastid, {
            render: `${
              errorCode[response.status][body.message] ||
              errorCode[response.status][body.error]
            }`,
            type: 'error',
            autoClose: 3000,
            isLoading: false,
          });
        } else {
          // reload the page to get the new campaign
          toast.update(toastid, {
            render: `${
              errorCode[response.status]['Campaign created'] ||
              errorCode[response.status][response.statusText]
            }`,
            type: 'success',
            autoClose: 3000,
            isLoading: false,
          });

          setShown(false);
          setCampaigns([body, ...campaigns]);
        }
      } catch (error) {
        console.error(error);
      }
    },
    [],
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      data-cy="campaign-form"
      className="flex flex-col gap-4 p-4 m-4 rounded-lg bg-fidbg font-normal"
    >
      <div className="">
        <Label htmlFor="subject">Sujet</Label>
        <input
          {...register('subject', {
            required: 'Le nom de la campagne est requise',
            maxLength: {
              value: 200,
              message:
                'Le sujet de la campagne ne doit pas dépasser 200 caractères',
            },
          })}
          type="text"
          id="subject"
          maxLength={200}
          placeholder="Sujet"
          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-fidgreen focus:border-fidgreen block w-full p-2.5"
        />
        {errors.subject && (
          <span className="text-sm text-red-600">
            {errors.subject.message.toString()}
          </span>
        )}
      </div>
      <div>
        <Label htmlFor="htmlData">Message</Label>
        <Editor
          apiKey={'f6gaiisqnyo4xdvg0gfrc4ty0fjt4dbbthdrsafugqg44jgc'}
          value={editorContent}
          onEditorChange={(newValue) => {
            setEditorContent(newValue);
            setValue('htmlData', newValue);
          }}
        />
      </div>
      <div>
        <Label htmlFor="promotionId">Promotion liée</Label>
        <select
          {...register('promotionId', {
            required: 'La promotion liée est requise',
          })}
          id="promotionId"
          placeholder="promotionId"
          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-fidgreen focus:border-fidgreen block w-full p-2.5"
        >
          <option key="" value="">
            -- Choisissez une option --
          </option>
          {promotions?.map((promotion) => (
            <option key={promotion.id} value={promotion.id}>
              {promotion.name}
            </option>
          ))}
        </select>
        {errors.promotionId && (
          <span className="text-sm text-red-600">
            {errors.promotionId.message.toString()}
          </span>
        )}
      </div>
      <Button
        type="submit"
        className="text-gray-50 bg-fidgreen hover:bg-fidgreen/80 w-full"
      >
        Enregistrer
      </Button>
    </form>
  );
};

export const CampaignUpdateForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm<ICampaignUpdatePayload>({ mode: 'onChange' });

  const router = useRouter();
  const id = Number(router.query.id);

  const [promotions, setPromotions] = useState<IPromotion[]>([]);
  const [message, setMessage] = useState('');

  const loadUser = async (): Promise<IUser> => {
    const userUuid = localStorage.getItem('userUuid');
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const user = fetch(`/api/user/${userUuid}`, options)
      .then((response) => response.json())
      .catch((error) => console.error(error));
    return user;
  };

  const loadPromotions = async (): Promise<void> => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const user = await loadUser();
    try {
      const response = await fetch(
        `/api/shop/${user.shop.id}/promotion`,
        options,
      );
      const data = await response.json();
      setPromotions(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getCampaign = async (): Promise<void> => {
    try {
      const response = await fetch(`/api/campaign/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json(); // Extract JSON data from response
      setValue('id', data.id);
      setValue('shopId', data.shopId);
      setValue('subject', data.subject);
      setValue('textData', data.textData);
      setValue('promotionId', data.promotionId);
      setValue('htmlData', data.htmlData || '');
      setMessage(data.htmlData || '');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      getCampaign();
    }
    loadPromotions();
  }, []);

  const onSubmit: SubmitHandler<ICampaignUpdatePayload> = useCallback(
    async (data) => {
      try {
        const toastid = toast.loading('Vérification en cours...');
        const response = await fetch(`/api/campaign/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...data, promotionId: +data.promotionId }),
        });
        // read the response body
        const body = await response.json();
        if (response.status >= 400) {
          toast.update(toastid, {
            render: `${
              errorCode[response.status][body.message] ||
              errorCode[response.status][body.error]
            }`,
            type: 'error',
            autoClose: 3000,
            isLoading: false,
          });
        } else {
          toast.update(toastid, {
            render: `${
              errorCode[response.status][body.message] ||
              errorCode[response.status][response.statusText]
            }`,
            type: 'success',
            autoClose: 3000,
            isLoading: false,
          });
          // reload actual page
          router.push('/campaign');
        }
      } catch (error) {
        console.error(error);
      }
    },
    [],
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      data-cy="campaign-form"
      className="flex flex-col gap-4 p-4 m-4 rounded-lg bg-fidbg font-normal"
    >
      <div className="">
        <Label htmlFor="subject">Sujet</Label>
        <input
          {...register('subject', {
            required: 'Le sujet de la campagne est requise',
            maxLength: {
              value: 200,
              message:
                'Le nom de la campagne ne doit pas dépasser 200 caractères',
            },
          })}
          type="text"
          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-fidgreen focus:border-fidgreen block w-full p-2.5"
          id="subject"
          maxLength={200}
          placeholder="subject"
        />
        {errors.subject && (
          <span className="text-sm text-red-600">
            {errors.subject.message.toString()}
          </span>
        )}
      </div>
      <div className="">
        <Label htmlFor="textHtml">Message</Label>
        <Editor
          apiKey={'f6gaiisqnyo4xdvg0gfrc4ty0fjt4dbbthdrsafugqg44jgc'}
          value={message}
          onEditorChange={(newValue) => {
            setMessage(newValue);
            setValue('htmlData', newValue);
          }}
        />
      </div>
      <div className="">
        <Label htmlFor="promotionId">Promotion liée</Label>
        <select
          {...register('promotionId', {
            required: 'La promotion liée est requise',
          })}
          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-fidgreen focus:border-fidgreen block w-full p-2.5"
          id="promotionId"
          placeholder="promotionId"
        >
          {promotions?.map((promotion) => (
            <option
              key={promotion.id}
              value={promotion.id}
              selected={promotion.id === +getValues('promotionId') ?? false}
            >
              {promotion.name}
            </option>
          ))}
        </select>
        {errors.promotionId && (
          <span className="text-sm text-red-600">
            {errors.promotionId.message.toString()}
          </span>
        )}
      </div>
      <Button
        type="submit"
        className="text-gray-50 bg-fidgreen hover:bg-fidgreen/80"
      >
        Enregistrer
      </Button>
    </form>
  );
};
