// import React from 'react';

import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import ImageArea from '../components/Products/ImageArea';
import { PrimaryButton, SelectBox, TextInput } from '../components/UIkit';
import { saveProduct } from '../reducks/products/operations';

const ProductEdit = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState(''),
    [description, setDescription] = useState(''),
    [category, setCategory] = useState(''),
    [gender, setGender] = useState(''),
    [images, setImages] = useState([]),
    [price, setPrice] = useState('');

  // setName をそのまま使わずラップする
  const inputName = useCallback(
    (event) => {
      setName(event.target.value);
    },
    [setName]
  );
  const inputDescription = useCallback(
    (event) => {
      setDescription(event.target.value);
    },
    [setDescription]
  );
  const inputPrice = useCallback(
    (event) => {
      setPrice(event.target.value);
    },
    [setPrice]
  );

  const categories = [
    { id: 'tops', name: 'トップス' },
    { id: 'shirts', name: 'シャツ' },
    { id: 'botoms', name: 'ボトムス' },
    { id: 'shoes', name: 'シューズ' },
  ];

  const genders = [
    { id: 'all', name: 'すべて' },
    { id: 'male', name: 'メンズ' },
    { id: 'female', name: 'レディース' },
  ];

  return (
    <section>
      <h2 className='u-text__headline u-text-center'>商品の登録・編集</h2>
      <div className='c-section-container'>
        <ImageArea images={images} setImages={setImages} />
        <TextInput
          fullWidth={true}
          label={'商品名'}
          multiline={false}
          required={true}
          rows={1}
          value={name}
          type={'text'}
          onChange={inputName}
        />
        <TextInput
          fullWidth={true}
          label={'商品説明'}
          multiline={true}
          required={true}
          rows={5}
          value={description}
          type={'text'}
          onChange={inputDescription}
        />
        <SelectBox
          label={'カテゴリー'}
          required={true}
          options={categories}
          value={category}
          select={setCategory}
        />
        <SelectBox
          label={'性別'}
          required={true}
          options={genders}
          value={gender}
          select={setGender}
        />
        <TextInput
          fullWidth={true}
          label={'価格'}
          multiline={false}
          required={true}
          rows={1}
          value={price}
          type={'number'}
          onChange={inputPrice}
        />
        <div className='module-spacer--medium'></div>
        <div className='center'>
          <PrimaryButton
            label={'商品情報を保存'}
            onClick={() =>
              dispatch(saveProduct(name, description, category, gender, price))
            }
          />
        </div>
      </div>
    </section>
  );
};
export default ProductEdit;
