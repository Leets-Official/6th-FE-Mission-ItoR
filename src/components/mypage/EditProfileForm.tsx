import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/utils/cn';
import Spacer from '@/components/common/Spacer/Spacer';
import Textarea from '@/components/common/Text/Textarea';
import { useAuthStore } from '@/stores/useAuthStore';
import { useEditModeStore } from '@/stores/useEditModeStore';
import { SIGNUP_FORM_FIELDS } from '@/constants';
import { signupSchema, SignupFormData } from '@/utils/schemas';
import { EditProfileFormProps } from '@/types/mypage';

const STYLES = {
  container: 'flex flex-col items-center self-stretch',
  spacer: 'w-full max-w-content',
  textareaCommon: 'w-full max-w-content px-0',
} as const;

const DISABLED_FIELDS = ['email', 'name'];
const EXCLUDED_FIELDS = ['nickname', 'bio'];

const EditProfileForm: FC<EditProfileFormProps> = ({ className }) => {
  const user = useAuthStore(state => state.user);
  const { isEditMode, setEditMode } = useEditModeStore();

  useEffect(() => {
    // 페이지 진입 시 편집 모드 초기화
    return () => {
      setEditMode(false);
    };
  }, [setEditMode]);

  // 편집 모드에 따라 필드 활성화/비활성화
  const isFieldDisabled = (fieldName: string) => {
    if (!isEditMode) return true;
    return DISABLED_FIELDS.includes(fieldName);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
    defaultValues: {
      email: user?.email || '',
      password: '',
      passwordConfirm: '',
      name: user?.name || '',
      birthDate: user?.birthDate || '',
      nickname: user?.nickName || '',
      bio: user?.bio || '',
    },
  });

  const onSubmit = (data: SignupFormData) => {
    // TODO: API 호출로 프로필 업데이트
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn(STYLES.container, className)}>
      <Spacer height="md" className={STYLES.spacer} />

      {SIGNUP_FORM_FIELDS.filter(field => !EXCLUDED_FIELDS.includes(field.name)).map(field => {
        const isDisabled = isFieldDisabled(field.name);
        const isAlwaysDisabled = DISABLED_FIELDS.includes(field.name);
        const isPasswordField = field.name === 'password' || field.name === 'passwordConfirm';
        const placeholder = !isEditMode && isPasswordField ? '******' : field.placeholder;

        return (
          <Textarea
            key={field.name}
            title={field.title}
            type={field.type}
            placeholder={placeholder}
            hintText={field.hintText}
            error={errors[field.name]?.message}
            textFieldBackgroundColor={isAlwaysDisabled ? 'filled' : undefined}
            disabled={isDisabled}
            className={STYLES.textareaCommon}
            {...register(field.name)}
          />
        );
      })}

      <Spacer height="md" className={STYLES.spacer} />
    </form>
  );
};

export default EditProfileForm;
