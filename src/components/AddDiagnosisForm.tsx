import { cloneElement, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import HeartImg from "@/assets/heart.png";
import SlopeImg from "@/assets/slope.png";
import ThalImg from "@/assets/thal.png";
import ExerciseImg from "@/assets/exercise.png";
import HeartPlc from "@/assets/heartPlc.webp";
import SlopePlc from "@/assets/slopePlc.webp";
import ThalPlc from "@/assets/thalPlc.webp";
import ExercisePlc from "@/assets/exercisePlc.webp";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import SelctBox from "./SelctBox";
import { AnimatePresence, motion } from "framer-motion";
import { diagnosisSchema as formSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import CustomSelect from "./CustomSelect";
import { Input } from "./ui/input";
import { useCreateRecord } from "@/hook/useCreateRecord";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

const transitions = {
  forward: {
    initial: { x: "100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
  },
  backward: {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 },
  },
};
const stages: ["chest_pain", "slope", "thal", "exercise_angina"] = [
  "chest_pain",
  "slope",
  "thal",
  "exercise_angina",
];
function AddDiagnosisForm({ setOpen }: { setOpen: (open: boolean) => void }) {
  const [direction, setDirection] = useState<"forward" | "backward" | null>(
    null
  );
  const queryClient = useQueryClient();
  const { mutate, isPending } = useCreateRecord();
  const [, startTransition] = useTransition();
  const [current, setCurrent] = useState(0);
  const { patientID } = useParams();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      blood_pressure: undefined,
      blood_sugar: 0,
      cholesterol: undefined,
      ecg: undefined,
      max_thal: 60,
      coronary_artery: 0,
      old_peak: 0,
    },
  });

  const { trigger } = form;
  const nodes = [
    <SelctBox
      placeholderImg={HeartPlc}
      transition={transitions[direction || "forward"]}
      img={HeartImg}
      name="chest_pain"
      placeholder="What is the type of chest pain the patient feels?"
      options={[
        { label: "Typical Angina", value: "typical angina" },
        { label: "Atypical Angina", value: "atypical angina" },
        { label: "Non-Anginal", value: "non-anginal" },
        { label: "Asymptomatic", value: "asymptomatic" },
      ]}
      register={form.register}
    />,
    <SelctBox
      placeholderImg={SlopePlc}
      transition={transitions[direction || "forward"]}
      img={SlopeImg}
      name="slope"
      placeholder="What is the slope of the peak exercise ST segment?"
      options={[
        { label: "Flat", value: "flat" },
        { label: "Upsloping", value: "upsloping" },
        { label: "Downsloping", value: "downsloping" },
      ]}
      register={form.register}
    />,
    <SelctBox
      transition={transitions[direction || "forward"]}
      img={ThalImg}
      placeholderImg={ThalPlc}
      name="thal"
      placeholder="What would you classify the resulting condition of Thalassemia?"
      options={[
        { label: "Normal", value: "normal" },
        { label: "Reversable Defect", value: "reversable defect" },
        { label: "Fixed Defect", value: "fixed defect" },
      ]}
      register={form.register}
    />,
    <SelctBox
      placeholderImg={ExercisePlc}
      transition={transitions[direction || "forward"]}
      img={ExerciseImg}
      name="exercise_angina"
      placeholder=" Does the patient suffer from Exercise Angina?"
      options={[
        { label: "Yes", value: 1 },
        { label: "No", value: 0 },
      ]}
      register={form.register}
    />,
  ];
  function onSubmit(data: z.infer<typeof formSchema>) {
    const myToast = toast.loading("Creating Diagnosis...");
    mutate(data, {
      onSuccess: (data) => {
        toast.success("Diagnosis added Successfully.", { id: myToast });
        setOpen(false);
        queryClient.invalidateQueries({ queryKey: ["patients"] });
        queryClient.invalidateQueries({ queryKey: ["records", patientID] });
        queryClient.invalidateQueries({ queryKey: ["patient", patientID] });
        if (data?.data?.id) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { patient, ...recData } = data.data;
          console.log(recData);
          queryClient.setQueryData(
            ["record", `${recData?.id}`],

            data?.data
          );
          navigate(`/patient/${patientID}/${data?.data?.id}`);
        }
      },
      onError: (error) => {
        toast.error(error.message, { id: myToast });
      },
    });
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex flex-col justify-between overflow-x-hidden overflow-y-auto min-h-[600px] max-h-[600px] py-1 "
      >
        <div className="flex w-full justify-center">
          <AnimatePresence mode="wait" initial={false}>
            {nodes.map((node, index) =>
              current === index ? cloneElement(node, { key: index }) : null
            )}
            {current === stages.length && (
              <motion.div
                className="flex flex-col gap-3"
                transition={{ duration: 0.5 }}
                {...transitions[direction || "forward"]}
              >
                <FormField
                  control={form.control}
                  name="ecg"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        What are the resting electrocardiographic results?
                      </FormLabel>
                      <CustomSelect
                        disabled={isPending}
                        className="focus:ring-0 focus:ring-offset-0 bg-[#FAFAFA] border-transparent rounded-b-none border-b-black"
                        // @ts-expect-error - null is a valid value
                        field={field}
                        placeholder="ECG Results"
                        values={[
                          { label: "Normal", value: "normal" },
                          {
                            label: "ST-T Abnormality",
                            value: "st-t abnormality",
                          },
                          { label: "LV Hypertrophy", value: "lv hypertrophy" },
                          // @ts-expect-error - null is a valid value
                          { label: "None", value: null },
                        ]}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="blood_pressure"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What is the resting blood pressure?</FormLabel>
                      <FormControl>
                        <label htmlFor="rbp">
                          <div className="relative">
                            <Input
                              min={0}
                              max={200}
                              disabled={isPending}
                              type="number"
                              className="focus-visible:ring-0 focus-visible:ring-offset-0 bg-[#FAFAFA] border-transparent rounded-b-none border-b-black"
                              id="rbp"
                              placeholder="RBP"
                              {...field}
                            />
                            <span className="absolute top-1/2 -translate-y-1/2 right-3">
                              mm Hg
                            </span>
                          </div>
                        </label>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cholesterol"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What is the cholesterol measure?</FormLabel>
                      <FormControl>
                        <label htmlFor="chol">
                          <div className="relative">
                            <Input
                              disabled={isPending}
                              type="number"
                              min={0}
                              max={603}
                              className="focus-visible:ring-0 focus-visible:ring-offset-0 bg-[#FAFAFA] border-transparent rounded-b-none border-b-black"
                              id="chol"
                              placeholder="Cholestrol"
                              {...field}
                            />
                            <span className="absolute top-1/2 -translate-y-1/2 right-3">
                              mg/dl
                            </span>
                          </div>
                        </label>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="max_thal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        What is the maximum heart rate achieved? *
                      </FormLabel>
                      <FormControl>
                        <label htmlFor="maxthal">
                          <div className="relative">
                            <Input
                              min={60}
                              max={202}
                              disabled={isPending}
                              type="number"
                              className="focus-visible:ring-0 focus-visible:ring-offset-0 bg-[#FAFAFA] border-transparent rounded-b-none border-b-black"
                              id="maxthal"
                              placeholder="thal"
                              {...field}
                            />
                          </div>
                        </label>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="coronary_artery"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        What is the number of major vessels {"("}0-3{")"}{" "}
                        colored by fluoroscopy? *
                      </FormLabel>
                      <FormControl>
                        <label htmlFor="cor">
                          <div className="relative">
                            <Input
                              min={0}
                              max={3}
                              disabled={isPending}
                              type="number"
                              className="focus-visible:ring-0 focus-visible:ring-offset-0 bg-[#FAFAFA] border-transparent rounded-b-none border-b-black"
                              id="cor"
                              placeholder="Coronary Artery"
                              {...field}
                            />
                          </div>
                        </label>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="blood_sugar"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What is the fasting blood sugar? *</FormLabel>
                      <FormControl>
                        <label htmlFor="sug">
                          <div className="relative">
                            <Input
                              min={0}
                              type="number"
                              className="focus-visible:ring-0 focus-visible:ring-offset-0 bg-[#FAFAFA] border-transparent rounded-b-none border-b-black"
                              id="sug"
                              placeholder="FBS"
                              {...field}
                            />
                            <span className="absolute top-1/2 -translate-y-1/2 right-3">
                              mg/dl
                            </span>
                          </div>
                        </label>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="old_peak"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        What is the ST depression induced by exercise relative
                        to rest? *
                      </FormLabel>
                      <FormControl>
                        <label htmlFor="peak">
                          <div className="relative">
                            <Input
                              min={-2.6}
                              max={6.2}
                              step={0.01}
                              type="number"
                              disabled={isPending}
                              className="focus-visible:ring-0 focus-visible:ring-offset-0 bg-[#FAFAFA] border-transparent rounded-b-none border-b-black"
                              id="peak"
                              placeholder="Old Peak"
                              {...field}
                            />
                          </div>
                        </label>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  disabled={isPending}
                  type="submit"
                  className="bg-primary-blue text-white hover:bg-secondary-blue hover:text-primary-blue"
                >
                  Confirm
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex justify-between">
          <Button
            // prettier-ignore
            disabled={(current === 0) || isPending}
            size={"icon"}
            onClick={() => {
              if (current === 0) return;
              setDirection("backward");
              startTransition(() => setCurrent((prev) => prev - 1));
            }}
            type="button"
            className="bg-primary-blue text-white hover:bg-secondary-blue hover:text-primary-blue"
          >
            {"<<"}
          </Button>
          <Button
            size={"icon"}
            onClick={async () => {
              if (current === stages.length) return;

              const val = await trigger(stages[current]);
              if (!val) return;
              setDirection("forward");
              startTransition(() => setCurrent((prev) => prev + 1));
            }}
            type="button"
            disabled={current === stages.length}
            className="bg-primary-blue text-white hover:bg-secondary-blue hover:text-primary-blue"
          >
            {">>"}
          </Button>
        </div>
        <div hidden>
          <img src={HeartImg} alt="" />
          <img src={ExerciseImg} alt="" />
          <img src={SlopeImg} alt="" />
          <img src={ThalImg} alt="" />
        </div>
      </form>
    </Form>
  );
}

export default AddDiagnosisForm;
