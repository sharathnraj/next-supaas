import PrimaryButton from '@/components/buttons/PrimaryButton';
import SecondaryButton from '@/components/buttons/SecondaryButton';
import InputCheckboxGroup from '@/components/forms/InputCheckboxGroup';
import InputRadioGroup from '@/components/forms/InputRadioGroup';
import InputText from '@/components/forms/InputText';
import RootLayout from '@/containers/RootLayout';
import getIcon from '@/lib/icons';
import { yupResolver } from '@hookform/resolvers/yup';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';

const schema = Yup.object({
  reeceCustomerID: Yup.string().required('This field is required'),
  reeceRepresentative: Yup.string().required('This field is required'),
  reeceBranchID: Yup.string().required('This field is required'),
  reeceSuburb: Yup.string().required('This field is required'),
  tradingName: Yup.string().required('This field is required'),
  abn: Yup.string().required('This field is required'),
  streetAddress: Yup.string().required('This field is required'),
  suburb: Yup.string().required('This field is required'),
  postcode: Yup.string().required('This field is required'),
  phoneNumber: Yup.string().required('This field is required'),
  email: Yup.string().email('Invalid email').required('This field is required'),
  emailSecondary: Yup.string()
    .email('Invalid email')
    .required('This field is required'),
  fullName: Yup.string().notRequired(),
  adminPhoneNumber: Yup.string().notRequired(),
  installerFullName1: Yup.string().required('This field is required'),
  mobileNumber: Yup.string().required('This field is required'),
  installerEmail1: Yup.string()
    .email('Invalid email')
    .required('This field is required'),
  address: Yup.string().required('This field is required'),
  electricianLicenceNumber: Yup.string().notRequired(),
  plumbingLicenceNumber: Yup.string().notRequired(),
  aRCLicenceNumber: Yup.string().notRequired(),
  additionalInstallerFullName: Yup.string().notRequired(),
  additionalInstallersMobile: Yup.string().notRequired(),
  additionalInstallerDesignerEmail: Yup.string()
    .email('Invalid email')
    .notRequired(),
  additionalInstallersAddress: Yup.string().notRequired(),
  electricianLicenceNumber2: Yup.string().notRequired(),
  plumbingLicenceNumber2: Yup.string().notRequired(),
  aRCLicenceNumber2: Yup.string().notRequired(),
  certificateTypeNew: Yup.array(Yup.string()).notRequired(),
  areYourInstallations: Yup.string().notRequired(),
  haveYouInstalledGreenProductsBefore: Yup.string().notRequired(),
  publicLiabilityCertificate: Yup.mixed().notRequired().nullable(),
  productLiableCertificate: Yup.mixed().notRequired().nullable(),
  photoID: Yup.mixed().notRequired().nullable(),
  aSICCertificateOfRegistrationOfACompany: Yup.mixed().notRequired().nullable(),
});

interface FormData {
  reeceCustomerID: string;
  reeceRepresentative: string;
  reeceBranchID: string;
  reeceSuburb: string;

  tradingName: string;
  abn: string;
  streetAddress: string;
  suburb: string;
  postcode: string;
  phoneNumber: string;
  email: string;
  emailSecondary: string;

  fullName?: string | null;
  adminPhoneNumber?: string | null;

  installerFullName1: string;
  mobileNumber: string;
  installerEmail1: string;
  address: string;

  electricianLicenceNumber?: string | null;
  plumbingLicenceNumber?: string | null;
  aRCLicenceNumber?: string | null;

  certificateTypeNew?: (string | undefined)[] | null;
  areYourInstallations?: string | null;
  haveYouInstalledGreenProductsBefore?: string | null;

  publicLiabilityCertificate?: any | null;
  productLiableCertificate?: any | null;
  photoID?: any | null;
  aSICCertificateOfRegistrationOfACompany?: any | null;
}

const defaultValues: FormData = {
  reeceCustomerID: '',
  reeceRepresentative: '',
  reeceBranchID: '',
  reeceSuburb: '',

  tradingName: '',
  abn: '',
  streetAddress: '',
  suburb: '',
  postcode: '',
  phoneNumber: '',
  email: '',
  emailSecondary: '',

  fullName: '',
  adminPhoneNumber: '',

  installerFullName1: '',
  mobileNumber: '',
  installerEmail1: '',
  address: '',

  electricianLicenceNumber: '',
  plumbingLicenceNumber: '',
  aRCLicenceNumber: '',

  certificateTypeNew: [],
  areYourInstallations: '',
  haveYouInstalledGreenProductsBefore: '',

  publicLiabilityCertificate: null,
  productLiableCertificate: null,
  photoID: null,
  aSICCertificateOfRegistrationOfACompany: null,
};

export default function RegisterWithGreenbankPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [_isRegistered, setIsRegistered] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    // setError,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onBlur',
    defaultValues,
    resolver: yupResolver<FormData>(schema),
  });

  const onSubmit = handleSubmit(async data => {
    if (isLoading) return;

    setIsLoading(true);
    fetch(`link-to-register`, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(() => {
        setIsRegistered(true);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setIsLoading(false);
      });
  });

  return (
    <RootLayout>
      <Head>
        <title>Register with Greenbank</title>
      </Head>

      {/* Register form */}
      <div className="px-4 pb-5 pt-6 md:px-10 md:pb-8 md:pt-8">
        <div className="mx-auto flex max-w-3xl flex-col gap-4">
          <div className="rounded-lg border border-neutral-200 bg-white">
            <div className="border-b border-neutral-200 px-5 py-5 md:px-8 md:py-6">
              <Image
                src={'/logo-greenbank.png'}
                alt="Greenbank"
                width={128}
                height={28}
              />
            </div>
            <form className="space-y-8 p-5 md:p-8" onSubmit={onSubmit}>
              <div className="space-y-5">
                <h2>1. Your Reece details</h2>
                <InputText
                  {...register('reeceCustomerID')}
                  label="Reece customer ID"
                  errors={errors.reeceCustomerID}
                />
                <InputText
                  {...register('reeceBranchID')}
                  label="Reece branch"
                  placeholder="Branch name or code"
                  errors={errors.reeceBranchID}
                />
              </div>

              <div className="space-y-5">
                <h2>2. Your business details</h2>
                <InputText
                  {...register('tradingName')}
                  label="Trading name"
                  errors={errors.tradingName}
                />
                <InputText
                  {...register('abn')}
                  label="ABN"
                  errors={errors.abn}
                />
                <InputText
                  {...register('address')}
                  label="Address"
                  placeholder="Type address..."
                  errors={errors.address}
                />
                <InputText
                  {...register('phoneNumber')}
                  label="Phone number (business hours)"
                  errors={errors.phoneNumber}
                />
                <InputText
                  {...register('email')}
                  label="Primary email address"
                  errors={errors.email}
                />
                <InputText
                  {...register('emailSecondary')}
                  label="Email address for remittance"
                  info="Remittance advices for rebates payments will be sent to this address."
                  errors={errors.emailSecondary}
                />
              </div>

              <div className="space-y-5">
                <h2>3. Admin support person</h2>
                <InputText
                  {...register('fullName')}
                  label="Name"
                  subLabel="(optional)"
                />
                <InputText
                  {...register('adminPhoneNumber')}
                  label="Phone number"
                  subLabel="(optional)"
                />
              </div>

              <div className="space-y-5">
                <h2>4. Installer details</h2>
                <InputText
                  {...register('installerFullName1')}
                  label="Full name"
                  errors={errors.installerFullName1}
                />
                <InputText
                  {...register('mobileNumber')}
                  label="Mobile number"
                  errors={errors.mobileNumber}
                />
                <InputText
                  {...register('installerEmail1')}
                  label="Email address"
                  errors={errors.installerEmail1}
                />
                <InputText
                  {...register('address')}
                  label="Postal address"
                  placeholder="Type address..."
                  errors={errors.address}
                />
                <InputText
                  {...register('electricianLicenceNumber')}
                  label="Electrician Licence Number"
                  subLabel="(optional)"
                  info="Hot Water and Heating & Cooling claims requiring an Electrician on site"
                />
                <InputText
                  {...register('plumbingLicenceNumber')}
                  label="Plumbing Licence Number"
                  subLabel="(optional)"
                  info="STC, ESC & VEEC Hot Water Claims"
                />
                <InputText
                  {...register('aRCLicenceNumber')}
                  label="ARC Licence Number"
                  subLabel="(optional)"
                  info="Heating & Cooling Claims"
                />
              </div>

              <div className="space-y-5">
                <h2>5. Claims</h2>
                <Controller
                  name="certificateTypeNew"
                  control={control}
                  render={({ field: { onChange, value, onBlur } }) => (
                    <InputCheckboxGroup
                      label="What will you be claiming?"
                      subLabel="(optional)"
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      options={[
                        {
                          value: 'STC',
                          label: 'STC Hot Water (National)',
                        },
                        {
                          value: 'ESC',
                          label: 'ESC (NSW)',
                        },
                        {
                          value: 'VEECHW',
                          label: 'VEEC Hot Water (VIC)',
                        },
                        {
                          value: 'VEEC',
                          label: 'VEEC Heating & Cooling (VIC)',
                        },
                      ]}
                    />
                  )}
                />
                <Controller
                  name="areYourInstallations"
                  control={control}
                  render={({ field: { onChange, value, onBlur } }) => (
                    <InputRadioGroup
                      label="Installation type"
                      subLabel="(optional)"
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      options={[
                        {
                          value: 'REPLACEMENT',
                          label: 'Replacements',
                        },
                        { value: 'NEW', label: 'New systems' },
                        { value: 'BOTH', label: 'Both' },
                      ]}
                    />
                  )}
                />
                <Controller
                  name="haveYouInstalledGreenProductsBefore"
                  control={control}
                  render={({ field: { onChange, value, onBlur } }) => (
                    <InputRadioGroup
                      label="Have you installed energy efficient products before?"
                      subLabel="(optional)"
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      options={[
                        {
                          value: 'yes',
                          label: 'Yes',
                        },
                        { value: 'no', label: 'No' },
                      ]}
                    />
                  )}
                />
              </div>

              <div className="space-y-5">
                <h2>6. Documents</h2>
                <InputText
                  {...register('publicLiabilityCertificate')}
                  label="Public liability certificate"
                  subLabel="(optional)"
                  type="file"
                />
                <InputText
                  {...register('productLiableCertificate')}
                  label="Product liable certificate"
                  subLabel="(optional)"
                  type="file"
                />
                <InputText
                  {...register('photoID')}
                  label="Photo ID"
                  subLabel="(optional)"
                  type="file"
                />
                <InputText
                  {...register('aSICCertificateOfRegistrationOfACompany')}
                  label="ASIC Certificate of Registration of a Company"
                  subLabel="(optional)"
                  type="file"
                />
              </div>

              <PrimaryButton
                buttonSize="large"
                className="w-full md:w-max"
                type="submit"
              >
                Submit
              </PrimaryButton>

              <p className="small">
                By clicking Submit, you agree to sharing information you have
                provided with Greenbank Environmental.
              </p>
            </form>
          </div>
        </div>
      </div>

      <div className="bg-neutral-100 px-4 py-10 md:px-10">
        <div className="mx-auto flex max-w-3xl flex-col gap-10">
          <div className="space-y-4 rounded-lg border border-neutral-200 bg-white p-5">
            <div className="h-16 w-16 rounded-full bg-primary-50 p-3">
              <Image
                src={getIcon('calculator')}
                alt="Calculator"
                width={40}
                height={40}
              />
            </div>
            <h3>Quoting a job with a rebate?</h3>
            <p>
              Use the rebate calculator to quickly estimate the Government
              rebate amount.
            </p>
            <SecondaryButton
              buttonSize="large"
              className="w-full md:w-max"
              href="https://www.reece.com.au/greenbank#calculate_savings"
              external
              externalBlankTarget
            >
              <span>Calculate rebates</span>
              <span className="material-icons text-2xl">open_in_new</span>
            </SecondaryButton>
          </div>
        </div>
      </div>
    </RootLayout>
  );
}
