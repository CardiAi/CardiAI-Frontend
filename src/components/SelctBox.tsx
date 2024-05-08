import { CircleCheck } from "lucide-react";
import { motion } from "framer-motion";
interface IValues {
  value: string | number;
  label: string;
}
import { LazyLoadImage } from "react-lazy-load-image-component";
interface IProps {
  name: string;
  img: string;
  placeholder: string;
  options: IValues[];
  transition: {
    [key: string]: {
      [key: string]: string | number;
    };
  };
  placeholderImg: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: (name: any) => any;
}
function SelctBox({
  transition,
  img,
  register,
  name,
  options,
  placeholder,
  placeholderImg,
}: IProps) {
  return (
    <motion.div
      transition={{ duration: 0.5 }}
      {...transition}
      className="min-h-96 flex flex-col items-center gap-3 "
    >
      <div className="h-[163px] w-[168px]">
        <LazyLoadImage
          className="w-full h-full"
          PlaceholderSrc={placeholderImg}
          src={img}
          alt="image"
        />
      </div>
      <div className="w-full flex flex-col items-center gap-3">
        <h2 className="text-lg font-semibold ">{placeholder}</h2>
        {options.map((option) => {
          const id = Math.random();
          return (
            <label
              key={option.label}
              htmlFor={`${id}`}
              className="bg-[#FBF7EE] w-full py-3 px-3 md:px-6 rounded-lg cursor-pointer shadow-lg font-semibold text-lg hover:bg-secondary-blue has-[:checked]:bg-secondary-blue flex items-center justify-between"
            >
              {option.label}
              <input
                value={option.value}
                className="peer"
                type="radio"
                hidden
                {...register(name)}
                id={`${id}`}
              />
              <CircleCheck className="peer-checked:block hidden" size={24} />
            </label>
          );
        })}
      </div>
    </motion.div>
  );
}

export default SelctBox;
