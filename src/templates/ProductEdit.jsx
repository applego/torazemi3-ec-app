// import React from 'react';

import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { SetSizeArea } from '../components/Products';
import ImageArea from '../components/Products/ImageArea';
import { PrimaryButton, SelectBox, TextInput } from '../components/UIkit';
import { db } from '../firebase';
import { saveProduct } from '../reducks/products/operations';

const ProductEdit = () => {
  const dispatch = useDispatch();
  let id = window.location.pathname.split('/product/edit')[1];

  if (id !== '') {
    id = id.split('/')[1];
  }

  const [name, setName] = useState(''),
    [description, setDescription] = useState(''),
    [category, setCategory] = useState(''),
    [gender, setGender] = useState(''),
    [images, setImages] = useState([]),
    [price, setPrice] = useState(''),
    [sizes, setSizes] = useState([]);
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

  // useEffect はreturn の直前に書く(torazeiさん)
  useEffect(() => {
    if (id !== '') {
      db.collection('products')
        .doc(id)
        .get()
        .then((doc) => {
          const data = doc.data();
          if (!data) return false;
          console.log(data);
          setName(data.name);
          setDescription(data.description);
          setCategory(data.category);
          setGender(data.gender);
          setImages(data.images || []); // 追加したプロパティがundefinedになる
          setPrice(data.price);
          setSizes(data.sizes || []);
        });
    }
  }, [id]); // 次の商品次の商品と移動する時はidなどを入れないとおかしくなる

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
        <div className='module-spacer--small'></div>
        <SetSizeArea sizes={sizes} setSizes={setSizes} />
        <div className='module-spacer--small'></div>
        <div className='center'>
          <PrimaryButton
            label={'商品情報を保存'}
            onClick={() =>
              dispatch(
                saveProduct(
                  id,
                  name,
                  description,
                  category,
                  gender,
                  price,
                  images,
                  sizes
                )
              )
            }
          />
        </div>
      </div>
    </section>
  );
};
export default ProductEdit;
