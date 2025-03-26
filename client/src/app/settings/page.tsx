"use client";
import { Header } from "@/components/header";
import { useState } from "react";

type Props = {
    label: string;
    value: string | boolean;
    type: "text" | "toggle";
}

const mockSettings: Props[] = [
    { label: "Username", value: "john_doe", type: "text" },
    { label: "Email", value: "john.dev@exampl.com", type: "text" },
    { label: "Notification", value: true, type: "toggle" },
    { label: "Dark Mode", value: false, type: "toggle" },
    { label: "Language", value: "English", type: "text" },
]

const SettingPage = () => {
    const [userSettings, setUserSettings] = useState<Props[]>(mockSettings);

    const handleToggleChange = (index: number) => {
        setUserSettings((prevSettings) =>
            prevSettings.map((setting, i) =>
                i === index ? { ...setting, value: !(setting.value as boolean) } : setting
            )
        );
    };

    const handleTextChange = (index: number, newValue: string) => {
        setUserSettings((prevSettings) =>
            prevSettings.map((setting, i) =>
                i === index ? { ...setting, value: newValue } : setting
            )
        );
    };

    return (
        <div className="w-full">
            <Header name="Settings" />
            <div className="overflow-x-auto mt-5 shadow-md">
                <table className="min-w-full bg-white rounded-lg">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                                Setting
                            </th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                                Value
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {userSettings.map((setting, index) => (
                            <tr className="hover:bg-blue-50" key={setting.label}>
                                <td className="py-3 px-4 font-medium text-gray-700">{setting.label}</td>
                                <td className="py-3 px-4">
                                    {setting.type === "toggle" ? (
                                        <label className="inline-flex relative items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" checked={setting.value as boolean} onChange={() => handleToggleChange(index)} />
                                            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-blue-400 peer-focus:ring-4 
                        transition peer-checked:after:translate-x-full peer-checked:after:border-white 
                        after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white 
                        after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all
                        peer-checked:bg-blue-600"
                                            ></div>
                                        </label>
                                    ) : (
                                        <input type="text" className="px-4 py-2 border rounded-lg text-gray-500 focus:outline-none focus-within:border-blue-500"
                                            value={setting.value as string}
                                            onChange={(e) => handleTextChange(index, e.target.value)}
                                        />
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SettingPage;