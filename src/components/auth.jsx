import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Sun,
  Moon,
  Sparkles,
  Shield,
  Zap,
  CheckCircle2,
  AlertCircle,
  X,
} from "lucide-react";

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [notifications, setNotifications] = useState([]);

  // Toggle dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Add notification
  const addNotification = (message, type = "error") => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type }]);

    // Auto remove after 5 seconds
    setTimeout(() => {
      setNotifications((prev) => prev.filter((notif) => notif.id !== id));
    }, 5000);
  };

  // Remove notification
  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!isLogin && !formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      // Add notifications for each error
      Object.values(errors).forEach((error) => {
        addNotification(error, "error");
      });
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Simulate random error for demo
      if (Math.random() > 0.7 && !isLogin) {
        throw new Error("Email already exists");
      }

      setIsLoading(false);
      setSuccess(true);
      setShowSuccess(true);

      // Reset after success
      setTimeout(() => {
        setShowSuccess(false);
        setTimeout(() => {
          setSuccess(false);
          if (!isLogin) setIsLogin(true);
        }, 300);
      }, 2000);
    } catch (error) {
      setIsLoading(false);
      addNotification(error.message, "error");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div
      className={`min-h-screen w-full flex items-center justify-center p-4 transition-colors duration-300 relative ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 to-gray-800"
          : "bg-gradient-to-br from-indigo-50 to-purple-100"
      }`}
    >
      {/* Notifications Container */}
      <div className="fixed top-4 right-4 z-50 w-full max-w-xs space-y-3">
        <AnimatePresence>
          {notifications.map((notification) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={`p-4 rounded-xl shadow-lg flex items-start ${
                notification.type === "error"
                  ? "bg-gradient-to-r from-red-500 to-orange-500 text-white"
                  : "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
              }`}
            >
              <AlertCircle className="flex-shrink-0 mr-3 mt-0.5" size={20} />
              <div className="flex-1">
                <p className="text-sm font-medium">{notification.message}</p>
              </div>
              <button
                onClick={() => removeNotification(notification.id)}
                className="ml-2 flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
              >
                <X size={18} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Dark mode toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`fixed top-6 right-6 p-3 rounded-full ${
          darkMode
            ? "bg-gray-700 text-yellow-300 hover:bg-gray-600"
            : "bg-white text-gray-700 hover:bg-gray-100"
        } shadow-lg transition-all duration-300 hover:scale-105 z-40`}
        aria-label="Toggle dark mode"
      >
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className="w-full max-w-md"
      >
        <div
          className={`rounded-3xl shadow-2xl overflow-hidden ${
            darkMode
              ? "bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700"
              : "bg-white"
          }`}
        >
          <div className="p-8">
            <div className="text-center mb-8 relative">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.2,
                }}
                className="mx-auto mb-4 relative"
              >
                {/* Glowing background effect */}
                <div
                  className={`absolute -inset-2 rounded-full ${
                    darkMode
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 blur-md opacity-75"
                      : "bg-gradient-to-r from-purple-400 to-indigo-400 blur-md opacity-50"
                  }`}
                ></div>

                {/* Main icon container */}
                <div
                  className={`relative rounded-full p-4 ${
                    darkMode ? "bg-gray-800" : "bg-white"
                  }`}
                >
                  {isLogin ? (
                    <Shield
                      className={`${
                        darkMode ? "text-purple-400" : "text-indigo-600"
                      }`}
                      size={32}
                    />
                  ) : (
                    <Sparkles
                      className={`${
                        darkMode ? "text-purple-400" : "text-indigo-600"
                      }`}
                      size={32}
                    />
                  )}
                </div>

                {/* Brand badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className={`absolute -bottom-2 -right-2 px-2 py-1 rounded-full text-xs font-bold ${
                    darkMode
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                      : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                  } shadow-md`}
                >
                  YZ
                </motion.div>
              </motion.div>

              {/* Brand name below the icon */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-center mb-6"
              >
                <h1
                  className={`text-xl font-bold tracking-tight ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-indigo-500">
                    Yuozarseiph
                  </span>
                </h1>
                <div className="flex items-center justify-center mt-1">
                  <div
                    className={`h-0.5 w-8 ${
                      darkMode ? "bg-purple-500" : "bg-indigo-300"
                    }`}
                  ></div>
                  <span
                    className={`mx-2 text-xs ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Secure Authentication
                  </span>
                  <div
                    className={`h-0.5 w-8 ${
                      darkMode ? "bg-purple-500" : "bg-indigo-300"
                    }`}
                  ></div>
                </div>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className={`text-3xl font-bold ${
                  darkMode ? "text-white" : "text-gray-800"
                }`}
              >
                {isLogin ? "Welcome Back" : "Join Us"}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className={`mt-2 ${
                  darkMode ? "text-gray-300" : "text-gray-500"
                }`}
              >
                {isLogin
                  ? "Sign in to continue your journey"
                  : "Create your account today"}
              </motion.p>
            </div>

            <AnimatePresence mode="wait">
              {showSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="text-center py-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 15,
                    }}
                    className="inline-block mb-4"
                  >
                    <CheckCircle2
                      className="text-green-500 mx-auto"
                      size={64}
                    />
                  </motion.div>
                  <h3
                    className={`text-xl font-semibold ${
                      darkMode ? "text-white" : "text-gray-800"
                    } mb-2`}
                  >
                    {isLogin ? "Login Successful!" : "Account Created!"}
                  </h3>
                  <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                    {isLogin
                      ? "Redirecting to dashboard..."
                      : "Your account has been created successfully"}
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  {!isLogin && (
                    <motion.div variants={itemVariants} className="space-y-2">
                      <label
                        className={`block text-sm font-medium ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                        htmlFor="name"
                      >
                        Full Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User
                            className={
                              darkMode ? "text-gray-400" : "text-gray-500"
                            }
                            size={20}
                          />
                        </div>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                            errors.name
                              ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                              : darkMode
                              ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-purple-500 focus:border-purple-500"
                              : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500"
                          } focus:outline-none focus:ring-2 transition`}
                          placeholder="John Doe"
                        />
                        {errors.name && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                          >
                            <AlertCircle className="text-red-500" size={20} />
                          </motion.div>
                        )}
                      </div>
                      {errors.name && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="text-red-500 text-sm flex items-center"
                        >
                          <AlertCircle size={16} className="mr-1" />
                          {errors.name}
                        </motion.p>
                      )}
                    </motion.div>
                  )}

                  <motion.div variants={itemVariants} className="space-y-2">
                    <label
                      className={`block text-sm font-medium ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                      htmlFor="email"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail
                          className={
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }
                          size={20}
                        />
                      </div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                          errors.email
                            ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                            : darkMode
                            ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-purple-500 focus:border-purple-500"
                            : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500"
                        } focus:outline-none focus:ring-2 transition`}
                        placeholder="you@example.com"
                      />
                      {errors.email && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        >
                          <AlertCircle className="text-red-500" size={20} />
                        </motion.div>
                      )}
                    </div>
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="text-red-500 text-sm flex items-center"
                      >
                        <AlertCircle size={16} className="mr-1" />
                        {errors.email}
                      </motion.p>
                    )}
                  </motion.div>

                  <motion.div variants={itemVariants} className="space-y-2">
                    <label
                      className={`block text-sm font-medium ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock
                          className={
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }
                          size={20}
                        />
                      </div>
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-12 py-3 rounded-xl border ${
                          errors.password
                            ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                            : darkMode
                            ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-purple-500 focus:border-purple-500"
                            : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500"
                        } focus:outline-none focus:ring-2 transition`}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? (
                          <EyeOff
                            className={`${
                              darkMode
                                ? "text-gray-400 hover:text-gray-200"
                                : "text-gray-500 hover:text-gray-700"
                            } transition-colors`}
                            size={20}
                          />
                        ) : (
                          <Eye
                            className={`${
                              darkMode
                                ? "text-gray-400 hover:text-gray-200"
                                : "text-gray-500 hover:text-gray-700"
                            } transition-colors`}
                            size={20}
                          />
                        )}
                      </button>
                      {errors.password && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="absolute right-10 top-1/2 transform -translate-y-1/2"
                        >
                          <AlertCircle className="text-red-500" size={20} />
                        </motion.div>
                      )}
                    </div>
                    {errors.password && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="text-red-500 text-sm flex items-center"
                      >
                        <AlertCircle size={16} className="mr-1" />
                        {errors.password}
                      </motion.p>
                    )}
                  </motion.div>

                  {isLogin && (
                    <motion.div
                      variants={itemVariants}
                      className="flex justify-between items-center"
                    >
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className={`form-checkbox h-4 w-4 rounded ${
                            darkMode
                              ? "text-purple-500 bg-gray-700 border-gray-600"
                              : "text-indigo-600"
                          }`}
                        />
                        <span
                          className={`ml-2 text-sm ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          Remember me
                        </span>
                      </label>
                      <a
                        href="#"
                        className={`text-sm font-medium ${
                          darkMode
                            ? "text-purple-400 hover:text-purple-300"
                            : "text-indigo-600 hover:text-indigo-500"
                        } transition-colors`}
                      >
                        Forgot password?
                      </a>
                    </motion.div>
                  )}

                  <motion.div variants={itemVariants} className="pt-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isLoading}
                      className={`w-full py-3 px-4 rounded-xl font-medium flex items-center justify-center transition-all duration-300 ${
                        darkMode
                          ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg shadow-purple-900/20"
                          : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/20"
                      }`}
                    >
                      {isLoading ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="w-5 h-5 border-t-2 border-r-2 border-white rounded-full"
                        />
                      ) : (
                        <>
                          <Zap className="mr-2" size={18} />
                          {isLogin ? "Sign In" : "Create Account"}
                        </>
                      )}
                    </motion.button>
                  </motion.div>
                </motion.form>
              )}
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-8 text-center"
            >
              <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}
                <button
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setSuccess(false);
                    setShowSuccess(false);
                    setErrors({});
                  }}
                  className={`ml-1 font-semibold ${
                    darkMode
                      ? "text-purple-400 hover:text-purple-300"
                      : "text-indigo-600 hover:text-indigo-500"
                  } transition-colors focus:outline-none`}
                >
                  {isLogin ? "Sign up" : "Sign in"}
                </button>
              </p>
            </motion.div>
          </div>

          <div
            className={`px-8 py-6 text-center ${
              darkMode ? "bg-gray-800/50" : "bg-gray-50"
            }`}
          >
            <p
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              By continuing, you agree to our{" "}
              <a
                href="#"
                className={`font-medium ${
                  darkMode
                    ? "text-purple-400 hover:text-purple-300"
                    : "text-indigo-600 hover:text-indigo-500"
                } transition-colors`}
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#"
                className={`font-medium ${
                  darkMode
                    ? "text-purple-400 hover:text-purple-300"
                    : "text-indigo-600 hover:text-indigo-500"
                } transition-colors`}
              >
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginSignup;
