import { useState, useEffect, use } from "react";
import { useRouter } from "next/router";

import { Records, Step2 } from "@/components/steps/step2";
import { Step1 } from "@/components/steps/step1";
import { useRecordsContext } from "@/contexts/useRecords";
import { validateEmail } from "@/lib/validateEmail";
import { validateDomainOrSubdomain } from "@/lib/validateDomain";

export default function Home() {
  const { records, dnsServer } = useRecordsContext();
  const router = useRouter();
  const query = router.query;

  const [searching, setSearching] = useState(false);
  const [name, setName] = useState("hello@miguelmedeiros.dev");
  const [r, setR] = useState<Records | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { setStep, step } = useRecordsContext();

  async function searchRecords({ recordName }: { recordName: string }) {
    setSearching(true);

    let filters = "";

    if (router.query?.filters) {
      filters = router.query?.filters as string;
    } else {
      filters = records ? records.join(",") : "";
    }

    const response = await fetch(
      `/api/checkAddress?name=${recordName}&filters=${filters}&dnsServer=${dnsServer}`
    );

    const data = await response.json();

    setName(recordName);
    setR(data);
    setSearching(false);
    setStep(1);

    const newUrl = `${window.location.origin}/?name=${recordName}&filters=${filters}`;
    window.history.pushState({ path: newUrl }, "", newUrl);
  }

  async function onSubmit(event: any) {
    event.preventDefault();
    setError(null);

    const n = event.currentTarget.name.value;

    const isValidEmail = validateEmail({ email: n });
    const isValidDomain = validateDomainOrSubdomain({ name: n });

    if (!isValidEmail && !isValidDomain) {
      setError("Please enter a valid TXT record 'name'.");
      return;
    }

    await searchRecords({ recordName: n });
  }

  useEffect(() => {
    if (query.name) {
      const n = query.name as string;

      if (
        validateEmail({ email: n }) &&
        validateDomainOrSubdomain({ name: n })
      ) {
        setError("Please enter a valid TXT record 'name'.");
        return;
      }
      searchRecords({ recordName: n });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.name]);

  return (
    <div className="relative w-full overflow-hidden transition-all duration-500 ease-in-out">
      <div
        className={`flex transition-transform duration-500 ease-in-out transform w-full ${
          step === 0 ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Step 1 */}
        <div className={`w-full flex-shrink-0 flex flex-col h-full`}>
          <Step1
            name={name}
            setName={setName}
            setError={setError}
            onSubmit={onSubmit}
            searching={searching}
            error={error}
          />
        </div>

        {/* Step 2 */}
        <div className={`w-full flex-shrink-0 ${step !== 1 && "hidden"}`}>
          <Step2 records={r} name={name} setStep={setStep} />
        </div>
      </div>
    </div>
  );
}
