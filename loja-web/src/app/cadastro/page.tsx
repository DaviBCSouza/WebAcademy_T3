"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface SignUpForm {
  name: string;
  email: string;
  emailConfirm: string;
  password: string;
}

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignUpForm>();
  const router = useRouter();

  const onSubmit = (data: SignUpForm) => {
    localStorage.setItem("userData", JSON.stringify(data));
    // Definindo o tempo de expiração para 20 minutos
    setTimeout(() => {
      localStorage.removeItem("userData");
    }, 1200000);
    router.push("/login");
  };

  const emailValue = watch("email");

  return (
    <main>
      <div className="container-fluid d-flex min-vh-100">
        <div className="row min-vw-100">
          <div className="col-12 col-md-4 bg-light d-flex justify-content-center align-items-center">
            <h2>Bem vindo à WA Loja!</h2>
          </div>
          <div className="col-12 col-md-8 d-flex justify-content-center align-items-center">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Nome
                </label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="name"
                  aria-describedby="name"
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <span className="text-danger">Nome é obrigatório</span>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control form-control-lg"
                  id="email"
                  aria-describedby="email"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-danger">Email é obrigatório.</span>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="emailConfirm" className="form-label">
                  Confirmar email
                </label>
                <input
                  type="email"
                  className="form-control form-control-lg"
                  id="emailConfirm"
                  aria-describedby="emailConfirm"
                  {...register("emailConfirm", {
                    required: true,
                    validate: (value) => value === emailValue,
                  })}
                />
                {errors.emailConfirm && (
                  <span className="text-danger">
                    {errors.emailConfirm.type === "required"
                      ? "Confirmação de email é obrigatória."
                      : "O email está diferente! Tente novamente."}
                  </span>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Senha
                </label>
                <input
                  type="password"
                  className="form-control form-control-lg"
                  id="password"
                  {...register("password", { required: true, minLength: 6 })}
                />
                {errors.password && errors.password.type === "required" && (
                  <span className="text-danger">Senha é obrigatória.</span>
                )}
                {errors.password && errors.password.type === "minLength" && (
                  <span className="text-danger">
                    A Senha deve ter no mínimo 6 caracteres.
                  </span>
                )}
              </div>

              <div className="d-grid col-12">
                <button type="submit" className="btn btn-success">
                  Confirmar cadastro
                </button>
              </div>

              <div className="text-center mt-3">
                <Link href="/login" className="btn btn-link">
                  Já possuo cadastro
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
