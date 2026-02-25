import React from 'react';
import Button from '../components/ui/Button';
import Card, { CardHeader, CardContent, CardFooter } from '../components/ui/Card';
import Input from '../components/ui/Input';

const UIDemo = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-12 space-y-12 bg-slate-50 min-h-screen">
            <header className="space-y-2">
                <h1 className="text-4xl font-extrabold text-slate-900">UI Component System</h1>
                <p className="text-lg text-slate-600">Modern components for the Happy Flowers store.</p>
            </header>

            {/* Buttons Section */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-800 border-b border-slate-200 pb-2">Buttons</h2>
                <div className="flex flex-wrap gap-4">
                    <Button variant="primary">Primary Button</Button>
                    <Button variant="secondary">Secondary Button</Button>
                    <Button variant="destructive">Destructive Button</Button>
                    <Button disabled>Disabled Button</Button>
                </div>
                <div className="flex flex-wrap gap-4 items-end">
                    <Button size="sm">Small</Button>
                    <Button size="md">Medium</Button>
                    <Button size="lg">Large</Button>
                </div>
            </section>

            {/* Inputs Section */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-800 border-b border-slate-200 pb-2">Inputs</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Input
                        label="Default Input"
                        placeholder="Enter some text..."
                    />
                    <Input
                        label="Password Input"
                        type="password"
                        placeholder="••••••••"
                    />
                    <Input
                        label="Input with Error"
                        error="This field is required"
                        placeholder="Errors look like this"
                    />
                    <Input
                        label="Email Input"
                        defaultValue="test@example.com"
                    />
                </div>
            </section>

            {/* Cards Section */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-800 border-b border-slate-200 pb-2">Cards</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Card>
                        <CardHeader>
                            <h3 className="text-lg font-semibold">Standard Card</h3>
                        </CardHeader>
                        <CardContent>
                            <p className="text-slate-600">This is a standard card with a header, content, and footer.</p>
                        </CardContent>
                        <CardFooter>
                            <Button variant="secondary" size="sm">Action</Button>
                        </CardFooter>
                    </Card>

                    <Card className="flex flex-col">
                        <div className="h-48 bg-emerald-100 flex items-center justify-center">
                            <span className="text-emerald-500 font-bold">Image Placeholder</span>
                        </div>
                        <CardContent className="flex-1">
                            <h3 className="text-lg font-semibold mb-2">Red Anthurium</h3>
                            <p className="text-emerald-600 font-bold text-xl">$25.00</p>
                            <p className="text-slate-500 text-sm mt-2">Beautiful blooming plant for your home.</p>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full">Add to Cart</Button>
                        </CardFooter>
                    </Card>

                    <Card className="bg-emerald-600 text-white shadow-emerald-200">
                        <CardContent className="space-y-4">
                            <h3 className="text-xl font-bold">Promotion Card</h3>
                            <p className="opacity-90">Get 20% off all plants this weekend with coupon <strong>FLOWER20</strong>.</p>
                            <Button variant="secondary" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                                Learn More
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </div>
    );
};

export default UIDemo;
