import React, { useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, Label, Select, TextInput, Textarea } from 'flowbite-react';
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

export const CampaignCreateForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICampaignCreatePayload>({ mode: 'onChange' });
  // get all shop's promotions
  const [promotions, setPromotions] = useState<IPromotion[]>([]);
  const [value, setValue] = useState(
    '<p>The quick brown fox jumps over the lazy dog</p>',
  );

  const router = useRouter();
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
  useEffect(() => {
    const loadCampaigns = async (): Promise<void> => {
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
    loadCampaigns();
  }, []);

  const onSubmit: SubmitHandler<ICampaignCreatePayload> = useCallback(
    async (data) => {
      try {
        data.htmlData = value;
        const toastid = toast.loading('Vérification en cours...');
        const response = await fetch(`/api/campaign`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          // conserve the number type htmlFor the promotionId
          body: JSON.stringify({ ...data, promotionId: +data.promotionId }),
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
          router.reload();
          toast.update(toastid, {
            render: `${
              errorCode[response.status]['Campaign created'] ||
              errorCode[response.status][response.statusText]
            }`,
            type: 'success',
            autoClose: 3000,
            isLoading: false,
          });
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
        <TextInput
          {...register('subject', {
            required: 'Le nom de la campagne est requise',
            maxLength: {
              value: 50,
              message:
                'Le nom de la campagne ne doit pas dépasser 50 caractères',
            },
          })}
          type="text"
          className=""
          id="subject"
          maxLength={50}
          placeholder="subject"
        />
        {errors.subject && (
          <span className="text-sm text-red-600">
            {errors.subject.message.toString()}
          </span>
        )}
      </div>
      <div className="">
        <Label htmlFor="textData">Message</Label>
        <Editor
          {...register('htmlData', {
            required: 'Le message est requis',
          })}
          apiKey={'qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc'}
          value={value}
          onEditorChange={(newValue) => {
            setValue(newValue);
          }}
        />
        {/* <Textarea
          {...register('textData', {
            required: 'Le message est requis',
          })}
          className=""
          id="textData"
          placeholder="textData"
          rows={10}
        />
        {errors.textData && (
          <span className="text-sm text-red-600">
            {errors.textData.message.toString()}
          </span>
        )} */}
      </div>
      <div className="">
        <Label htmlFor="promotionId">Promotion liée</Label>
        <Select
          {...register('promotionId', {
            required: 'La promotion liée est requise',
          })}
          className=""
          id="promotionId"
          placeholder="promotionId"
        >
          {promotions?.map((promotion) => (
            <option key={promotion.id} value={promotion.id}>
              {promotion.name}
            </option>
          ))}
        </Select>
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
    setValue,
  } = useForm<ICampaignUpdatePayload>({ mode: 'onChange' });

  const [promotions, setPromotions] = useState<IPromotion[]>([]);
  const router = useRouter();
  const id = Number(router.query.id);
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
  useEffect(() => {
    const loadCampaigns = async (): Promise<void> => {
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
      } catch (error) {
        console.log(error);
      }
    };
    if (id) {
      getCampaign();
    }
    loadCampaigns();
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
        <TextInput
          {...register('subject', {
            required: 'Le nom de la campagne est requise',
            maxLength: {
              value: 50,
              message:
                'Le nom de la campagne ne doit pas dépasser 50 caractères',
            },
          })}
          type="text"
          className=""
          id="subject"
          maxLength={50}
          placeholder="subject"
        />
        {errors.subject && (
          <span className="text-sm text-red-600">
            {errors.subject.message.toString()}
          </span>
        )}
      </div>
      <div className="">
        <Label htmlFor="textData">Message</Label>
        <Textarea
          {...register('textData', {
            required: 'Le message est requis',
          })}
          className=""
          id="textData"
          placeholder="textData"
          rows={10}
        />
        {errors.textData && (
          <span className="text-sm text-red-600">
            {errors.textData.message.toString()}
          </span>
        )}
      </div>
      <div className="">
        <Label htmlFor="promotionId">Promotion liée</Label>
        <Select
          {...register('promotionId', {
            required: 'La promotion liée est requise',
          })}
          className=""
          id="promotionId"
          placeholder="promotionId"
        >
          {promotions?.map((promotion) => (
            <option key={promotion.id} value={promotion.id}>
              {promotion.name}
            </option>
          ))}
        </Select>
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
