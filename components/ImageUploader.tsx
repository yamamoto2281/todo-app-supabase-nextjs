// components/ImageUploader.tsx
import { useState } from 'react';
import { supabase } from '../utils/supabase'

const ImageUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [lastImageUrl, setLastImageUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const uploadImage = async () => {
    if (!file) return;

    setUploading(true);
    const fileName = file.name;

    const { error: uploadError } = await supabase.storage
      .from('Photo') 
      .upload(fileName, file, { upsert: true });

    if (uploadError) {
      setMessage(`エラーが発生しました: ${uploadError.message}`);
      setUploading(false);
      return;
    }

    setMessage('アップロードが完了しました。');

    // 公開URLを取得
    const { data } = supabase.storage.from('Photo').getPublicUrl(fileName);
    
    if (imageUrl){
    setLastImageUrl(imageUrl);
    }
    setImageUrl(data.publicUrl); 

    setUploading(false);
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={uploadImage} 
      disabled={uploading}
      style={{
        border: '2px solid #0070f3', // 枠の太さと色
        backgroundColor: '#fff', // ボタンの背景色
        color: '#0070f3', // ボタンのテキスト色
      }}
      >
        {uploading ? 'アップロード中...' : '画像をアップロード'}
      </button>
      {message && <p>{message}</p>}
      <br></br>

      {imageUrl && '今回アップロードされた画像'}
      {imageUrl && <img src={imageUrl} alt="Uploaded" style={{ width: '500px', height: 'auto', marginTop: '20px' }} />}
      <br></br>
      {lastImageUrl && '前回アップロードされた画像'}
      {lastImageUrl && <img src={lastImageUrl} alt="Uploaded" style={{ width: '500px', height: 'auto', marginTop: '20px' }} />}
    </div>
  );
};

export default ImageUploader;
