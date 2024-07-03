import PrimaryButton from '@/components/buttons/PrimaryButton';
import SecondaryButton from '@/components/buttons/SecondaryButton';
import TertiaryButton from '@/components/buttons/TertiaryButton';
import InputRadioGroup from '@/components/forms/InputRadioGroup';
import InputSelect from '@/components/forms/InputSelect';
import PostcodeAutocomplete, {
  PostcodeOrSuburbData,
} from '@/components/forms/PostcodeAutocomplete';
import RootLayout from '@/containers/RootLayout';
import getIcon from '@/lib/icons';
import { yupResolver } from '@hookform/resolvers/yup';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import * as Yup from 'yup';

const schema = Yup.object({
  postcode: Yup.object()
    .shape({
      id: Yup.number().required(),
      name: Yup.string().required(),
      postcode: Yup.string().required('Please select a suburb'),
      state: Yup.string().required(),
    })
    .required('Please select a suburb'),
  productCode: Yup.string().required('Please select a product'),
  installationType: Yup.string().required('Please select an installation type'),
});

interface FormData {
  postcode: PostcodeOrSuburbData;
  productCode: string;
  installationType: string;
}

const defaultValues: FormData = {
  postcode: {
    id: 0,
    name: '',
    postcode: '',
    state: '',
  },
  productCode: '',
  installationType: '',
};

interface ProductData {
  code: string;
  name: string;
}

interface RebateItemData {
  numberOfCertificatesAvailable: number;
  price: number;
  value: number;
}

interface RebatesData {
  ESCs: RebateItemData;
  STCs: RebateItemData;
  VEECs: RebateItemData;
  totalValue: number;
}

const InstallationTypes = [
  {
    id: 'ELECTRIC_HWU_REPLACEMENT',
    name: 'Replacing existing electric hot water unit',
  },
  { id: 'GAS_HWU_REPLACEMENT', name: 'Replacing existing gas hot water unit' },
  { id: 'NEW_INSTALLATION', name: 'New installation' },
];

export default function RebatesCalculatorPage({
  products,
}: {
  products: ProductData[];
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<null | RebatesData>(null);

  const {
    register,
    control,
    handleSubmit,
    // setError,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onBlur',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit(async data => {
    if (isLoading) return;

    setIsLoading(true);
    fetch(
      `https://www.reece.com.au/hwu-rebate-estimator/rebate?postcode=${data.postcode.postcode}&productCode=${data.productCode}&installationType=${data.installationType}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => response.json())
      .then((data: RebatesData) => {
        setResults(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setIsLoading(false);
      });
  });

  const formValues = useWatch({
    control,
  });

  return (
    <RootLayout>
      <Head>
        <title>Rebate calculator</title>
      </Head>

      <div>
        {/* Hero */}
        <div className="px-4 pb-5 pt-6 md:px-10 md:pb-8 md:pt-8">
          <div className="mx-auto flex max-w-3xl flex-col gap-4">
            <div className="h-16 w-16 rounded-full bg-primary-50 p-3">
              <Image
                src={getIcon('calculator')}
                alt="Calculator"
                width={40}
                height={40}
              />
            </div>
            <h1>Rebate calculator</h1>
            <p className="large">
              Determine the rebate amount for heat pump hot water system
              installations.
            </p>
          </div>
        </div>

        {/* Calculator */}
        {!results && (
          <div className="px-4 pb-8 pt-4 md:px-10 md:pb-10">
            <div className="mx-auto flex max-w-3xl flex-col gap-4">
              <form
                onSubmit={onSubmit}
                className="space-y-5 rounded-lg border border-neutral-200 bg-white p-5 md:p-8"
              >
                <Controller
                  name="postcode"
                  control={control}
                  render={({ field: { onChange, value, onBlur } }) => (
                    <PostcodeAutocomplete
                      {...register('postcode')}
                      label="Postcode or suburb"
                      placeholder="Postcode or suburb"
                      errors={errors.postcode}
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                    />
                  )}
                />

                <InputSelect
                  {...register('productCode')}
                  label="Product"
                  className="w-full"
                  errors={errors.productCode}
                >
                  <option value="" disabled>
                    Select Product
                  </option>
                  {products.map(product => (
                    <option key={product.code} value={product.code}>
                      {product.name}
                    </option>
                  ))}
                </InputSelect>

                <Controller
                  name="installationType"
                  control={control}
                  render={({ field: { onChange, value, onBlur } }) => (
                    <InputRadioGroup
                      label="Installation type"
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      options={InstallationTypes.map(item => ({
                        label: item.name,
                        value: item.id,
                      }))}
                      errors={errors.installationType}
                    />
                  )}
                />

                <PrimaryButton
                  type="submit"
                  buttonSize="large"
                  className="w-full md:w-max"
                  loading={isLoading}
                >
                  Calculate
                </PrimaryButton>
              </form>
            </div>
          </div>
        )}

        {/* Results */}
        {results && (
          <div className="px-4 pb-8 pt-4 md:px-10 md:pb-10">
            <div className="mx-auto flex max-w-3xl flex-col gap-6">
              <div className="overflow-hidden rounded-lg border border-neutral-200">
                <div className="space-y-4 bg-white p-5 md:p-8">
                  <h5>Installation details</h5>
                  <div className="flex flex-col gap-0.5">
                    <label className="small text-textSubtle">
                      Postcode or suburb
                    </label>
                    <label>{formValues.postcode?.name}</label>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <label className="small text-textSubtle">Product</label>
                    <label>
                      {
                        products.find(
                          item => item.code === formValues.productCode,
                        )?.name
                      }
                    </label>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <label className="small text-textSubtle">
                      Installation type
                    </label>
                    <label>
                      {
                        InstallationTypes.find(
                          item => item.id === formValues.installationType,
                        )?.name
                      }
                    </label>
                  </div>
                  <SecondaryButton
                    buttonSize="small"
                    onClick={() => {
                      setResults(null);
                    }}
                  >
                    <span className="material-icons text-base">edit</span>
                    <span>Edit details</span>
                  </SecondaryButton>
                </div>
                <div className="space-y-4 bg-blue-100 p-5 md:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <label className="font-sans-bold">
                      STC (National) Rebate
                    </label>
                    <div className="flex shrink-0 flex-col text-right">
                      <label className="font-sans-bold">{`$${results.STCs.value.toFixed(2)}`}</label>
                      <label className="small text-textSubtle">(ex. GST)</label>
                    </div>
                  </div>
                  {results.VEECs.numberOfCertificatesAvailable > 0 && (
                    <div className="flex items-start justify-between gap-4">
                      <label className="font-sans-bold">
                        VEEC (Victoria) Rebate
                      </label>
                      <div className="flex shrink-0 flex-col text-right">
                        <label className="font-sans-bold">{`$${results.VEECs.value.toFixed(2)}`}</label>
                        <label className="small text-textSubtle">
                          (ex. GST)
                        </label>
                      </div>
                    </div>
                  )}
                  {results.ESCs.numberOfCertificatesAvailable > 0 && (
                    <div className="flex items-start justify-between gap-4">
                      <label className="font-sans-bold">ESC (NSW) Rebate</label>
                      <div className="flex shrink-0 flex-col text-right">
                        <label className="font-sans-bold">{`$${results.ESCs.value.toFixed(2)}`}</label>
                        <label className="small text-textSubtle">
                          (ex. GST)
                        </label>
                      </div>
                    </div>
                  )}
                  <div className="h-px w-full bg-neutral-300" />
                  <div className="flex items-start justify-between gap-4">
                    <label className="font-sans-bold">Total rebate value</label>
                    <div className="flex shrink-0 flex-col text-right">
                      <label className="metric">{`$${results.totalValue.toFixed(2)}`}</label>
                      <label className="small text-textSubtle">(ex. GST)</label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <label className="small text-textSubtle">
                  Please note: all rebates are exclusive of GST.
                </label>
                <label className="small text-textSubtle">
                  This calculator provides an estimate only and should only be
                  used as a guide.
                </label>
                <label className="small text-textSubtle">
                  Rebates are specific to certain installation scenarios and
                  units, and eligibility is subject to various criteria and
                  federal and state regulations are subject to change over time.
                </label>
                <label className="small text-textSubtle">
                  Use of this calculator doesn't guarantee rebate approval,
                  rebate amount and final decisions rest with relevant
                  authorities. You are required to verify and consult with a
                  Qualified Professional before proceeding.
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Feature card */}
        <div className="bg-neutral-100 px-4 py-10 md:px-10">
          <div className="mx-auto flex max-w-3xl flex-col gap-10">
            <div className="space-y-4 rounded-lg border border-neutral-200 bg-white p-5">
              <div className="h-16 w-16 rounded-full bg-primary-50 p-3">
                <Image
                  src={getIcon('newClaim')}
                  alt="Start a claim"
                  width={40}
                  height={40}
                />
              </div>
              <h3>Ready to start a claim?</h3>
              <p>
                Visit the Greenbank portal to set up a rebate claim for your
                upcoming job.
              </p>
              <SecondaryButton
                buttonSize="large"
                className="w-full md:w-max"
                href="https://formtrack.green-bank.com.au/client/swh/new"
                external
                externalBlankTarget
              >
                <span>Start a claim</span>
                <span className="material-icons text-2xl">open_in_new</span>
              </SecondaryButton>

              <div className="flex flex-col items-start gap-3 border-t border-neutral-200 p-5">
                <h6>Don’t have a Greenbank account?</h6>
                <TertiaryButton href="/learn/register-with-greenbank/">
                  Register online
                </TertiaryButton>
                <TertiaryButton href="/learn/simplify-rebates-with-greenbank/">
                  Learn more about Greenbank
                </TertiaryButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RootLayout>
  );
}

export async function getStaticProps() {
  const response = await fetch(
    `https://www.reece.com.au/hwu-rebate-estimator/data/products`,
  );
  const products = response ? await response.json() : [];

  // Pass post data to the page via props
  return {
    props: {
      products,
    },
  };
}
